export interface SocialUser {
  id: string
  username: string
  name: string
  avatar: string
  bio?: string
  category?: string
  website?: string
  followersCount: number
  followingCount: number
  postsCount: number
  isVerified?: boolean
  isFollowing?: boolean
  hasStory?: boolean
  hasUnreadStory?: boolean
  isOnline?: boolean
}

export interface StoryItem {
  id: string
  userId: string
  username: string
  avatar: string
  media: string
  hasUnseen: boolean
  timestamp: string
}

export interface CommentItem {
  id: string
  username: string
  userAvatar: string
  text: string
  createdAt: string
  likesCount: number
  isLiked: boolean
}

export interface SocialPost {
  id: string
  userId: string
  username: string
  userAvatar: string
  isVerified?: boolean
  location?: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  aspectRatio?: '1:1' | '4:5' | '16:9'
  filter?: string
  caption: string
  likesCount: number
  commentsCount: number
  sharesCount: number
  isLiked: boolean
  isSaved: boolean
  createdAt: string
  comments: CommentItem[]
}

export interface SocialReel {
  id: string
  creator: {
    username: string
    avatar: string
    isVerified: boolean
    isFollowing: boolean
  }
  caption: string
  videoUrl: string
  posterUrl: string
  audioTrack: {
    title: string
    artist: string
    coverUrl?: string
  }
  likesCount: number
  commentsCount: number
  sharesCount: number
  isLiked: boolean
  isSaved: boolean
  tags: string[]
  comments: CommentItem[]
}

export interface DirectMessage {
  id: string
  senderId: string
  text?: string
  mediaUrl?: string
  timestamp: string
  isRead: boolean
  isMine: boolean
  reactions?: string[]
}

export interface Conversation {
  id: string
  user: {
    id: string
    username: string
    name: string
    avatar: string
    isOnline: boolean
    lastSeen?: string
  }
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isPinned?: boolean
  messages: DirectMessage[]
}

export interface UserNote {
  id: string
  userId: string
  username: string
  avatar: string
  note: string
}

export interface SocialNotification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'mention'
  user: {
    username: string
    avatar: string
  }
  content: string
  targetMedia?: string
  createdAt: string
  isRead: boolean
}
