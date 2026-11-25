import React, { useState } from 'react'
import { useSocialStore } from '../store/socialStore'

export const ReelsPage: React.FC = () => {
  const {
    reels,
    toggleLikeReel,
    toggleSaveReel,
    addCommentToReel,
    toggleFollowUser,
  } = useSocialStore()

  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const [commentInput, setCommentInput] = useState('')
  const [isPlaying, setIsPlaying] = useState(true)

  const activeReel = reels[currentReelIndex] || reels[0]

  const handleNext = () => {
    if (currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1)
    } else {
      setCurrentReelIndex(0)
    }
  }

  const handlePrev = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1)
    } else {
      setCurrentReelIndex(reels.length - 1)
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return
    addCommentToReel(activeReel.id, commentInput.trim())
    setCommentInput('')
  }

  return (
    <div className="relative w-full flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] p-2 sm:p-4 overflow-hidden select-none">
      {/* Ambient background bloom from current reel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[750px] bg-gradient-to-tr from-[#FD1D1D]/15 via-[#833AB4]/15 to-[#0095F6]/15 rounded-full blur-[140px] pointer-events-none opacity-70" />

      {/* Reel Center Stage */}
      <div className="relative z-10 flex items-center gap-4 max-w-full">
        {/* Main Vertical Player Viewport */}
        <div className="relative w-[340px] sm:w-[380px] h-[600px] sm:h-[680px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/60 flex flex-col justify-between">
          {/* Media / Video Poster */}
          <div
            className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <img
              src={activeReel.posterUrl}
              alt={activeReel.caption}
              className="w-full h-full object-cover"
            />
            {/* Play/Pause indicator */}
            {!isPlaying && (
              <div className="absolute p-4 rounded-full bg-black/60 backdrop-blur-md text-white pointer-events-none animate-in zoom-in-75">
                <span className="material-symbols-outlined text-4xl">play_arrow</span>
              </div>
            )}
          </div>

          {/* Top Bar (Audio badge & Next/Prev count) */}
          <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-label-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 drop-shadow">
              <span className="material-symbols-outlined text-[18px]">movie</span>
              Reels
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                aria-label="Previous Reel"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                aria-label="Next Reel"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </button>
            </div>
          </div>

          {/* Bottom Left Creator Overlay */}
          <div className="relative z-20 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col gap-2.5">
            {/* Creator Row */}
            <div className="flex items-center gap-2.5">
              <img
                src={activeReel.creator.avatar}
                alt={activeReel.creator.username}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
              />
              <span className="font-bold text-body-md text-white drop-shadow">
                {activeReel.creator.username}
              </span>
              {activeReel.creator.isVerified && (
                <span className="material-symbols-outlined text-[16px] text-primary-container fill-1">
                  verified
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleFollowUser(activeReel.creator.username)}
                className={`ml-1 px-3 py-0.5 rounded-full text-label-sm font-semibold transition-all ${
                  activeReel.creator.isFollowing
                    ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                    : 'bg-primary-container hover:bg-primary-container/90 text-white shadow'
                }`}
              >
                {activeReel.creator.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Caption */}
            <p className="text-body-sm text-white/95 line-clamp-2 leading-snug drop-shadow">
              {activeReel.caption}
            </p>

            {/* Audio track ticker */}
            <div className="flex items-center gap-2 text-white/90 text-[12px] bg-black/40 backdrop-blur-md rounded-full px-3 py-1 w-fit border border-white/10">
              <span className="material-symbols-outlined text-[16px]">music_note</span>
              <span className="truncate max-w-[200px]">
                {activeReel.audioTrack.title}
              </span>
            </div>
          </div>

          {/* Right Floating Interaction Rail */}
          <div className="absolute right-3 bottom-6 z-20 flex flex-col items-center gap-4 text-white">
            {/* Like */}
            <button
              type="button"
              onClick={() => toggleLikeReel(activeReel.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-transform group-active:scale-125 ${
                  activeReel.isLiked ? 'text-[#FD1D1D]' : 'text-white'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    activeReel.isLiked ? 'fill-1' : ''
                  }`}
                >
                  favorite
                </span>
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {activeReel.likesCount.toLocaleString()}
              </span>
            </button>

            {/* Comments button */}
            <button
              type="button"
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-transform group-active:scale-125">
                <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {activeReel.commentsCount.toLocaleString()}
              </span>
            </button>

            {/* Share */}
            <button
              type="button"
              className="flex flex-col items-center gap-1 group"
            >
              <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-transform group-active:scale-125">
                <span className="material-symbols-outlined text-[24px]">send</span>
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {activeReel.sharesCount.toLocaleString()}
              </span>
            </button>

            {/* Bookmark / Save */}
            <button
              type="button"
              onClick={() => toggleSaveReel(activeReel.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-transform group-active:scale-125 ${
                  activeReel.isSaved ? 'text-white' : 'text-white/80'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    activeReel.isSaved ? 'fill-1' : ''
                  }`}
                >
                  bookmark
                </span>
              </div>
            </button>

            {/* Spinning Vinyl Audio Disc */}
            <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-white/80 p-0.5 animate-spin duration-3000">
              <img
                src={activeReel.creator.avatar}
                alt="Audio art"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Slide-over Comments Drawer (Desktop / Tablet) */}
        {isCommentsOpen && (
          <div className="w-[320px] h-[600px] sm:h-[680px] bg-surface-container rounded-2xl border border-outline-variant shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-outline-variant bg-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary-container">
                  forum
                </span>
                <span className="font-bold text-body-md text-on-surface">Comments</span>
                <span className="text-outline text-body-sm">
                  ({activeReel.comments.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCommentsOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
              {activeReel.comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-outline text-body-sm gap-2">
                  <span className="material-symbols-outlined text-3xl">chat</span>
                  <span>No comments yet. Start the conversation!</span>
                </div>
              ) : (
                activeReel.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2.5 text-body-sm">
                    <img
                      src={comment.userAvatar}
                      alt={comment.username}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-outline-variant mt-0.5 shrink-0"
                    />
                    <div className="flex-1">
                      <div className="leading-snug">
                        <span className="font-bold text-on-surface mr-1.5">
                          {comment.username}
                        </span>
                        <span className="text-on-surface-variant">{comment.text}</span>
                      </div>
                      <span className="text-[11px] text-outline">{comment.createdAt}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleAddComment}
              className="p-3 border-t border-outline-variant bg-surface-container-high flex items-center gap-2"
            >
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-surface-container-low rounded-full px-3 py-1.5 text-body-sm text-on-surface placeholder:text-outline border border-outline-variant focus:outline-none focus:border-primary-container"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="text-label-sm font-bold text-primary-container disabled:opacity-40"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
