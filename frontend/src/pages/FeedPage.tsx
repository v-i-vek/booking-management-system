import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSocialStore } from '../store/socialStore'

const SUGGESTIONS = [
  {
    username: 'oliver.bauhaus',
    name: 'Oliver Thorne',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiFrlsF8ivWLKhIwd7UO11rKoHIdbueL9y0eNqqXeWLUUuG9KShnLx9QEy0ExszC4hCQ9TIgddN2yzai-6dkPsmxbSF8gN15yYHiPZaw1O8tlas5ZQmlMHETaNI__3LZlF1Ofm6YvxEm6oAojrdiO8kQYFMyz7jPXcwDZKyXi1z0o_F29m08mxgtv-d7A9I3NiGwmvv5fyiPwMueqlpp3kEUTm3aaIkkgLxcb8PHw',
    relation: 'Followed by kai_zenith + 4 more',
    isFollowing: false,
  },
  {
    username: 'atelier_monolith',
    name: 'Atelier Monolith',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxRbacBnpmZeiJSoHUIojmgADxBC6JgNef96NMmuo6mt7QQfQB9jCxZW2SWRNYXTrZ3HJQxQdzfi5Xs4fcqlK7F5QReuJAXzFiZyFIpNGvQYwedY6ZyPiaxNM4hVOJXTtAyhSXkOzY7IK85nCjSwIJl2c_3fo4WGG60nJoE5cv-dRMFk3u0mWTLHugPyXX3WdD8bdHOF7_NbQQZbzFwwb6KPQnrKRrlZ3qOp6TAko',
    relation: 'Popular in Architecture',
    isFollowing: false,
  },
  {
    username: 'hannah.grain',
    name: 'Hannah Weber',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgp2fQm0eH7QI0_soKxBsNDImDCPXLekP8o3R8SOrBgoKBnvXQQAkZ5HTf1I7biu9YtPklcEzoNVf9Yc7S1GqXTT4_p33JdJAi52QAYV8DD41Bp4GBPsPQiMdiu0r78SmyWq0R-ERaemEFj3UthqcQeddD4TpCziKGXmq2QKVsmWOJ7I78Z8AmLlVlIatxyFBxjZZzH7PGTBRTAvEzl7Gkd_eu9xH03_tJV9poK1Q',
    relation: 'Followed by studio_nord',
    isFollowing: false,
  },
]

export const FeedPage: React.FC = () => {
  const {
    currentUser,
    stories,
    posts,
    toggleLikePost,
    toggleSavePost,
    addCommentToPost,
  } = useSocialStore()

  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({})
  const [heartAnimPostId, setHeartAnimPostId] = useState<string | null>(null)

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault()
    const text = commentInputs[postId]?.trim()
    if (!text) return
    addCommentToPost(postId, text)
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }))
  }

  const handleDoubleTap = (postId: string) => {
    toggleLikePost(postId)
    setHeartAnimPostId(postId)
    setTimeout(() => setHeartAnimPostId(null), 800)
  }

  const toggleFollowSuggestion = (username: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [username]: !prev[username],
    }))
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1020px] w-full px-2 sm:px-4 py-4 flex justify-center gap-8">
        {/* Central Feed Stream (Strict 630px max-width) */}
        <div className="w-full max-w-[630px] flex flex-col gap-6">
          {/* Stories Carousel */}
          <section
            aria-label="Stories"
            className="relative bg-surface-container-low rounded-2xl p-4 border border-outline-variant/60 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                >
                  <div
                    className={`p-[2.5px] rounded-full transition-transform group-hover:scale-105 ${
                      story.hasUnseen
                        ? 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'
                        : 'border-2 border-outline-variant'
                    }`}
                  >
                    <div className="p-0.5 bg-surface-container-low rounded-full">
                      <img
                        src={story.avatar}
                        alt={story.username}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-[12px] font-medium text-on-surface-variant group-hover:text-on-surface max-w-[68px] truncate text-center">
                    {story.username}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Posts Stream */}
          <div className="flex flex-col gap-6">
            {posts.map((post) => {
              const currentInput = commentInputs[post.id] || ''

              return (
                <article
                  key={post.id}
                  className="bg-surface-container-low rounded-2xl border border-outline-variant/60 overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-3.5 border-b border-outline-variant/40">
                    <div className="flex items-center gap-3">
                      <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                        <div className="p-0.5 bg-surface-container-low rounded-full">
                          <img
                            src={post.userAvatar}
                            alt={post.username}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-headline-sm text-body-md font-bold text-on-surface hover:underline cursor-pointer">
                            {post.username}
                          </span>
                          {post.isVerified && (
                            <span className="material-symbols-outlined text-[16px] text-primary-container fill-1">
                              verified
                            </span>
                          )}
                          <span className="text-outline text-body-sm">•</span>
                          <span className="text-outline text-[12px] font-medium">
                            {post.createdAt}
                          </span>
                        </div>
                        {post.location && (
                          <span className="text-outline text-[11px] font-normal">
                            {post.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="p-1 text-on-surface-variant hover:text-on-surface rounded-full"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        more_horiz
                      </span>
                    </button>
                  </div>

                  {/* Post Media (with double-tap like animation) */}
                  <div
                    className="relative w-full bg-black cursor-pointer select-none flex items-center justify-center overflow-hidden"
                    onDoubleClick={() => handleDoubleTap(post.id)}
                  >
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-auto max-h-[640px] object-cover"
                      style={post.filter ? { filter: post.filter } : undefined}
                    />

                    {/* Double-tap heart splash */}
                    {heartAnimPostId === post.id && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-50 fade-in duration-200">
                        <span className="material-symbols-outlined text-white text-[96px] fill-1 drop-shadow-2xl">
                          favorite
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => toggleLikePost(post.id)}
                          className={`flex items-center transition-transform active:scale-125 ${
                            post.isLiked
                              ? 'text-[#FD1D1D]'
                              : 'text-on-surface-variant hover:text-on-surface'
                          }`}
                          aria-label="Like post"
                        >
                          <span
                            className={`material-symbols-outlined text-[26px] ${
                              post.isLiked ? 'fill-1' : ''
                            }`}
                          >
                            favorite
                          </span>
                        </button>

                        <button
                          type="button"
                          className="text-on-surface-variant hover:text-on-surface"
                          aria-label="Comment"
                        >
                          <span className="material-symbols-outlined text-[26px]">
                            chat_bubble
                          </span>
                        </button>

                        <button
                          type="button"
                          className="text-on-surface-variant hover:text-on-surface"
                          aria-label="Share"
                        >
                          <span className="material-symbols-outlined text-[26px]">
                            send
                          </span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSavePost(post.id)}
                        className={`transition-colors ${
                          post.isSaved
                            ? 'text-on-surface'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        aria-label="Save post"
                      >
                        <span
                          className={`material-symbols-outlined text-[26px] ${
                            post.isSaved ? 'fill-1' : ''
                          }`}
                        >
                          bookmark
                        </span>
                      </button>
                    </div>

                    {/* Likes Count */}
                    <div className="text-body-sm font-semibold text-on-surface">
                      {post.likesCount.toLocaleString()} likes
                    </div>

                    {/* Caption */}
                    <div className="text-body-sm text-on-surface leading-snug">
                      <span className="font-bold mr-1.5">{post.username}</span>
                      <span>{post.caption}</span>
                    </div>

                    {/* Comments Preview */}
                    {post.comments.length > 0 && (
                      <div className="flex flex-col gap-1 mt-1 text-body-sm">
                        <span className="text-[12px] text-outline cursor-pointer hover:underline">
                          View all {post.commentsCount} comments
                        </span>
                        {post.comments.slice(-2).map((c) => (
                          <div key={c.id} className="text-body-sm">
                            <span className="font-semibold text-on-surface mr-1.5">
                              {c.username}
                            </span>
                            <span className="text-on-surface-variant">{c.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input */}
                    <form
                      onSubmit={(e) => handleCommentSubmit(post.id, e)}
                      className="flex items-center gap-2 pt-2 border-t border-outline-variant/30 mt-1"
                    >
                      <span className="material-symbols-outlined text-[20px] text-outline cursor-pointer hover:text-on-surface">
                        sentiment_satisfied
                      </span>
                      <input
                        type="text"
                        value={currentInput}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        placeholder="Add a comment..."
                        className="bg-transparent flex-1 text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                      />
                      {currentInput.trim() && (
                        <button
                          type="submit"
                          className="text-label-md font-bold text-primary-container hover:text-primary-container/80 transition-colors"
                        >
                          Post
                        </button>
                      )}
                    </form>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Right Rail: Suggestions & User card (Desktop only) */}
        <aside className="hidden lg:flex w-[320px] flex-col gap-6 shrink-0 py-2">
          {/* Current User Quick Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/60">
            <Link to="/profile" className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container/40"
              />
              <div className="flex flex-col">
                <span className="font-bold text-body-sm text-on-surface hover:underline">
                  {currentUser.username}
                </span>
                <span className="text-outline text-[12px]">{currentUser.name}</span>
              </div>
            </Link>
            <button
              type="button"
              className="text-primary-container text-label-sm font-semibold hover:underline"
            >
              Switch
            </button>
          </div>

          {/* Suggestions for you */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-label-sm font-bold text-outline uppercase tracking-wider">
                Suggested for you
              </span>
              <span className="text-[12px] font-semibold text-on-surface hover:underline cursor-pointer">
                See All
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {SUGGESTIONS.map((user) => {
                const isFollowing = followingMap[user.username]
                return (
                  <div
                    key={user.username}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant"
                      />
                      <div className="flex flex-col">
                        <span className="text-body-sm font-bold text-on-surface hover:underline cursor-pointer">
                          {user.username}
                        </span>
                        <span className="text-[11px] text-outline truncate max-w-[140px]">
                          {user.relation}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFollowSuggestion(user.username)}
                      className={`px-3 py-1 rounded-full text-label-sm font-bold transition-all ${
                        isFollowing
                          ? 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                          : 'bg-primary-container hover:bg-primary-container/90 text-white shadow-sm'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Editorial Footer Links */}
          <div className="flex flex-col gap-3 px-1 pt-4 text-[11px] text-outline">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <a href="#about" className="hover:underline">About</a>
              <span>•</span>
              <a href="#help" className="hover:underline">Help</a>
              <span>•</span>
              <a href="#press" className="hover:underline">Press</a>
              <span>•</span>
              <a href="#api" className="hover:underline">API</a>
              <span>•</span>
              <a href="#privacy" className="hover:underline">Privacy</a>
              <span>•</span>
              <a href="#terms" className="hover:underline">Terms</a>
            </div>
            <span>© 2026 LUMIGRAM • MIDNIGHT EDITORIAL</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
