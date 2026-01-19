import React from 'react'
import type { TwitterPost } from '../types/twitter'

interface TwitterCardProps {
  post: TwitterPost
  onClick?: () => void
}

const TwitterCard: React.FC<TwitterCardProps> = ({ post, onClick }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const renderHashtags = () => {
    if (!post.hashtags || post.hashtags.length === 0) return null
    return (
      <div className="twitter-hashtags">
        {post.hashtags.map((tag, index) => (
          <span key={index} className="twitter-hashtag">#{tag}</span>
        ))}
      </div>
    )
  }

  return (
    <div className="twitter-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="twitter-card-header">
        <div className="twitter-avatar">
          <img
            src={post.authorAvatar || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'}
            alt={post.authorName}
          />
        </div>
        <div className="twitter-user-info">
          <span className="twitter-author-name">{post.authorName}</span>
          <span className="twitter-author-username">@{post.authorUsername}</span>
        </div>
        <a
          href={post.tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter-link"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>

      <div className="twitter-content">
        <p>{post.content}</p>
        {renderHashtags()}
      </div>

      <div className="twitter-card-footer">
        <span className="twitter-date">{formatDate(post.date)}</span>
        <div className="twitter-stats">
          <span className="twitter-stat">
            <i className="far fa-comment"></i>
            {formatNumber(post.replies)}
          </span>
          <span className="twitter-stat">
            <i className="fas fa-retweet"></i>
            {formatNumber(post.retweets)}
          </span>
          <span className="twitter-stat">
            <i className="far fa-heart"></i>
            {formatNumber(post.likes)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TwitterCard
