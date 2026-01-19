// Twitter 推文数据类型定义

export interface TwitterPost {
  id: string
  content: string
  date: string
  authorName: string
  authorUsername: string
  authorAvatar: string
  tweetUrl: string
  likes: number
  retweets: number
  replies: number
  images?: string[]
  hashtags?: string[]
}

// 示例推文数据
export const sampleTwitterPosts: TwitterPost[] = [
  {
    id: '1',
    content: '真正出色的体验，从来不是把信息塞进页面，而是把焦虑从脑海里拿走。',
    date: '2025-01-15',
    authorName: 'HueShadow',
    authorUsername: 'hueshadow',
    authorAvatar: 'https://pbs.twimg.com/profile_images/xxxxx/avatar.jpg',
    tweetUrl: 'https://twitter.com/hueshadow/status/1',
    likes: 128,
    retweets: 45,
    replies: 12,
    hashtags: ['UX', 'Design']
  },
  {
    id: '2',
    content: 'React 19 带来了很多激动人心的新特性，Suspense 的改进让异步渲染更加流畅。',
    date: '2025-01-10',
    authorName: 'HueShadow',
    authorUsername: 'hueshadow',
    authorAvatar: 'https://pbs.twimg.com/profile_images/xxxxx/avatar.jpg',
    tweetUrl: 'https://twitter.com/hueshadow/status/2',
    likes: 256,
    retweets: 89,
    replies: 34,
    hashtags: ['React', 'WebDev']
  },
  {
    id: '3',
    content: 'TypeScript 5.8 发布了！新版本带来了更好的类型推断和性能优化。',
    date: '2025-01-05',
    authorName: 'HueShadow',
    authorUsername: 'hueshadow',
    authorAvatar: 'https://pbs.twimg.com/profile_images/xxxxx/avatar.jpg',
    tweetUrl: 'https://twitter.com/hueshadow/status/3',
    likes: 189,
    retweets: 67,
    replies: 23,
    hashtags: ['TypeScript', 'Programming']
  }
]
