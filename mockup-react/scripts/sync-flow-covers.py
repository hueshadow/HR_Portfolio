#!/usr/bin/env python3
"""Fill public/assets/flow-og from source og:image. Never overwrite existing overlay files.

Grok Bot may keep writing briefings.ts `image:` fields; the product UI ignores them.
"""
from __future__ import annotations

import json
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRIEFINGS = ROOT / "src" / "data" / "briefings.ts"
OVERRIDES = ROOT / "src" / "data" / "coverOverrides.ts"
OUT_DIR = ROOT / "public" / "assets" / "flow-og"
LEGACY_DIR = ROOT / "public" / "assets" / "flow"
LEGACY_DATES = {"2026-09-04", "2026-09-07"}
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)
CTX = ssl.create_default_context()
TIMEOUT = 18
MIN_BYTES = 2000

STR = r"(?:'((?:\\'|[^'])*)'|\"((?:\\\"|[^\"])*)\")"
DATE_RE = re.compile(r"date:\s*" + STR)
SECTION_RE = re.compile(r"^\s*(intel|taste|interviews|todos):\s*\[")
TITLE_RE = re.compile(r"title:\s*" + STR)
URL_RE = re.compile(r"url:\s*" + STR)
IMAGE_RE = re.compile(r"image:\s*" + STR)
YT_RE = re.compile(r"(?:youtube\.com/watch\?v=|youtu\.be/)([A-Za-z0-9_-]{6,})")


def str_val(m: re.Match) -> str:
    raw = m.group(1) if m.group(1) is not None else m.group(2)
    return unescape(raw or "")


class MetaParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.og: str | None = None
        self.tw: str | None = None
        self.icons: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "meta":
            return
        ad = {k.lower(): (v or "") for k, v in attrs}
        key = ad.get("property") or ad.get("name") or ""
        content = ad.get("content") or ""
        if not content:
            return
        key = key.lower()
        if key in {"og:image", "og:image:url", "og:image:secure_url"} and not self.og:
            self.og = content
        elif key in {"twitter:image", "twitter:image:src"} and not self.tw:
            self.tw = content


def unescape(s: str) -> str:
    return s.replace("\\'", "'").replace('\\"', '"')


def parse_items(text: str) -> list[dict]:
    items: list[dict] = []
    date = None
    section = None
    cur: dict | None = None

    def flush() -> None:
        nonlocal cur
        if cur and cur.get("title") and cur.get("section") != "todos":
            items.append(cur)
        cur = None

    for raw in text.splitlines():
        if m := DATE_RE.search(raw):
            flush()
            value = str_val(m)
            date = value if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value) else date
            section = None
            continue
        if m := SECTION_RE.search(raw):
            flush()
            section = m.group(1)
            continue
        if date and section and (m := TITLE_RE.search(raw)):
            flush()
            cur = {
                "date": date,
                "section": section,
                "title": str_val(m),
                "urls": [],
                "image": None,
            }
            continue
        if cur and (m := URL_RE.search(raw)):
            cur["urls"].append(str_val(m))
            continue
        if cur and (m := IMAGE_RE.search(raw)):
            cur["image"] = str_val(m)
            continue
    flush()
    return items


def slug(title: str, index: int) -> str:
    ascii_part = re.sub(r"[^a-z0-9]+", "-", title.lower())
    ascii_part = re.sub(r"-+", "-", ascii_part).strip("-")[:40]
    return ascii_part or f"item-{index:02d}"


def request(url: str, dest: Path | None = None) -> bytes | None:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=CTX) as res:
            data = res.read()
            ctype = (res.headers.get("Content-Type") or "").lower()
            if dest is not None:
                dest.write_bytes(data)
            return data if data else None
    except Exception as exc:
        print(f"  fetch fail {url[:80]} ({exc.__class__.__name__})", flush=True)
        return None


def youtube_id(url: str) -> str | None:
    m = YT_RE.search(url)
    return m.group(1) if m else None


def abs_url(src: str, page: str) -> str:
    return urllib.parse.urljoin(page, src.strip().strip("'\""))


def discover_og(page_url: str) -> str | None:
    yt = youtube_id(page_url)
    if yt:
        return f"https://i.ytimg.com/vi/{yt}/hqdefault.jpg"
    if "x.com/" in page_url or "twitter.com/" in page_url:
        # fx/vx often expose og when x.com does not
        alt = page_url.replace("https://x.com/", "https://api.fxtwitter.com/").replace(
            "https://twitter.com/", "https://api.fxtwitter.com/"
        )
        raw = request(alt)
        if raw:
            try:
                data = json.loads(raw.decode("utf-8", "replace"))
                tweet = data.get("tweet") or data
                media = (tweet.get("media") or {}).get("photos") or []
                if media:
                    return media[0].get("url")
                return (tweet.get("author") or {}).get("avatar_url")
            except Exception:
                pass
    html = request(page_url)
    if not html:
        html = request("https://web.archive.org/web/2026/" + page_url)
    if not html:
        return None
    try:
        text = html.decode("utf-8", "replace")
    except Exception:
        return None
    parser = MetaParser()
    try:
        parser.feed(text)
    except Exception:
        pass
    cand = parser.og or parser.tw
    if cand:
        return abs_url(cand, page_url)
    m = re.search(
        r'<meta[^>]+(?:property|name)=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        text,
        re.I,
    )
    if m:
        return abs_url(m.group(1), page_url)
    m = re.search(
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']og:image["\']',
        text,
        re.I,
    )
    if m:
        return abs_url(m.group(1), page_url)
    return None


def sniff_ext(path: Path) -> str:
    head = path.read_bytes()[:16]
    if head.startswith(b"\x89PNG"):
        return ".png"
    if head[:3] == b"GIF":
        return ".gif"
    if head[:2] == b"\xff\xd8":
        return ".jpg"
    if head[:4] == b"RIFF" and b"WEBP" in head:
        return ".webp"
    return ".jpg"


def download_image(url: str, dest_no_ext: Path) -> Path | None:
    tmp = dest_no_ext.with_suffix(".tmp")
    data = request(url)
    if not data or len(data) < MIN_BYTES:
        return None
    if data.lstrip()[:1] in (b"<", b"{"):
        return None
    tmp.write_bytes(data)
    ext = sniff_ext(tmp)
    final = dest_no_ext.with_suffix(ext)
    if final.exists():
        tmp.unlink(missing_ok=True)
        return final
    tmp.replace(final)
    return final


def write_overrides(mapping: dict[str, str]) -> None:
    lines = [
        "/** Generated by scripts/sync-flow-covers.py. Grok Bot must not edit this file. */",
        "export const coverOverrides: Record<string, string> = {",
    ]
    for key in sorted(mapping):
        path = mapping[key]
        k = json.dumps(key, ensure_ascii=False)
        v = json.dumps(path, ensure_ascii=False)
        lines.append(f"  {k}: {v},")
    lines.append("}")
    lines.append("")
    OVERRIDES.write_text("\n".join(lines), encoding="utf-8")


def load_overrides() -> dict[str, str]:
    if not OVERRIDES.exists():
        return {}
    text = OVERRIDES.read_text(encoding="utf-8")
    out: dict[str, str] = {}
    for m in re.finditer(r'  "(.*)": "(.*)",', text):
        out[json.loads(f'"{m.group(1)}"')] = json.loads(f'"{m.group(2)}"')
    # The regex above breaks on escaped quotes. Use a safer scan:
    out = {}
    for m in re.finditer(r"  (\"(?:\\.|[^\"])*\"): (\"(?:\\.|[^\"])*\"),", text):
        out[json.loads(m.group(1))] = json.loads(m.group(2))
    return out


def public_path(file: Path) -> str:
    rel = file.relative_to(ROOT / "public")
    return "/" + rel.as_posix()


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    items = parse_items(BRIEFINGS.read_text(encoding="utf-8"))
    mapping = load_overrides()
    added = 0
    skipped = 0
    failed = 0
    counts: dict[tuple[str, str], int] = {}
    pending: list[tuple[dict, int, Path]] = []

    for item in items:
        key = f"{item['date']}::{item['title']}"
        slot = (item["date"], item["section"])
        counts[slot] = counts.get(slot, 0) + 1
        idx = counts[slot]
        stem = f"{item['date']}-{item['section']}-{idx:02d}-{slug(item['title'], idx)}"
        dest_no_ext = OUT_DIR / stem

        if key in mapping:
            dest = ROOT / "public" / mapping[key].lstrip("/")
            if dest.exists():
                skipped += 1
                continue
            mapping.pop(key, None)

        existing = next(
            (
                p
                for p in OUT_DIR.glob(stem + ".*")
                if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
            ),
            None,
        )
        if existing:
            mapping[key] = public_path(existing)
            skipped += 1
            continue
        pending.append((item, idx, dest_no_ext))

    write_overrides(mapping)
    print(f"mapped existing={skipped} pending={len(pending)}", flush=True)

    for item, idx, dest_no_ext in pending:
        key = f"{item['date']}::{item['title']}"
        got: Path | None = None
        legacy = item.get("image")
        if item["date"] in LEGACY_DATES and legacy:
            src = ROOT / "public" / legacy.lstrip("/")
            if src.exists():
                dest = dest_no_ext.with_suffix(src.suffix)
                dest.write_bytes(src.read_bytes())
                got = dest

        if got is None:
            urls = item.get("urls") or []
            og = None
            for u in urls:
                og = discover_og(u)
                if og:
                    break
                time.sleep(0.15)
            if og:
                got = download_image(og, dest_no_ext)

        if got is None:
            failed += 1
            print(f"MISS {item['date']} {item['section']} {item['title'][:60]}", flush=True)
            continue

        mapping[key] = public_path(got)
        added += 1
        print(f"OK   {mapping[key]} ← {item['title'][:50]}", flush=True)
        if added % 8 == 0:
            write_overrides(mapping)

    write_overrides(mapping)
    print(
        f"done added={added} kept={skipped} miss={failed} overlay={len(mapping)}",
        flush=True,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
