import React, { useId } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import {
  Box,
  TextField,
  IconButton,
  Toolbar,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Link as LinkIcon,
  Undo,
  Redo,
} from '@mui/icons-material'

interface RichTextInputProps {
  source?: string
  label?: string
  value?: string
  onChange?: (value: string) => void
  helperText?: string
  required?: boolean
  fullWidth?: boolean
}

export const RichTextInput: React.FC<RichTextInputProps> = ({
  label,
  value = '',
  onChange,
  helperText,
  required = false,
}) => {
  const id = useId()
  const [linkUrl, setLinkUrl] = React.useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  const MenuBar = () => {
    const handleLinkAdd = () => {
      if (linkUrl) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
        setLinkUrl('')
      }
    }

    const handleLinkRemove = () => {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }

    return (
      <Toolbar variant="dense" sx={{ mb: 1, border: '1px solid #ccc', borderRadius: '4px 4px 0 0' }}>
        <ToggleButtonGroup size="small">
          <ToggleButton
            value="bold"
            selected={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="粗体"
          >
            <FormatBold />
          </ToggleButton>
          <ToggleButton
            value="italic"
            selected={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="斜体"
          >
            <FormatItalic />
          </ToggleButton>
          <ToggleButton
            value="underline"
            selected={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="下划线"
          >
            <FormatUnderlined />
          </ToggleButton>
          <Divider orientation="vertical" flexItem />
          <ToggleButton
            value="bulletList"
            selected={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="无序列表"
          >
            <FormatListBulleted />
          </ToggleButton>
          <ToggleButton
            value="orderedList"
            selected={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="有序列表"
          >
            <FormatListNumbered />
          </ToggleButton>
          <Divider orientation="vertical" flexItem />
          <ToggleButton
            value="undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="撤销"
          >
            <Undo />
          </ToggleButton>
          <ToggleButton
            value="redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="重做"
          >
            <Redo />
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
          <TextField
            size="small"
            placeholder="输入链接地址"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            sx={{ width: 200 }}
          />
          <IconButton size="small" onClick={handleLinkAdd} disabled={!linkUrl}>
            <LinkIcon />
          </IconButton>
          {editor.isActive('link') && (
            <IconButton size="small" onClick={handleLinkRemove}>
              <LinkIcon color="error" />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    )
  }

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: '8px' }}>
          {label}
          {required && ' *'}
        </label>
      )}
      <MenuBar />
      <EditorContent
        editor={editor}
        style={{
          border: '1px solid #ccc',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          padding: '16px',
          minHeight: '200px',
          backgroundColor: '#fff',
        }}
      />
      {helperText && (
        <Box component="span" sx={{ color: '#666', fontSize: '0.75rem', mt: 0.5 }}>
          {helperText}
        </Box>
      )}
    </Box>
  )
}