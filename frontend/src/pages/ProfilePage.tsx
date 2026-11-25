import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocialStore } from '../store/socialStore'
import { useAuthStore } from '../store/authStore'

const HIGHLIGHTS = [
  {
    name: "Tokyo '24",
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTO3sp-p-885cXEbE9g9fdA6A_c-xsKrQVGkhM6weqao3LjtDVAx5u6QkpeaivjWGp-DW8I53eL-pWb9kz1ssvOhBGcEIN3ojHuNwG0johJ97k6UVd4wliM5AG-qHZYDepmG44htyU4Mwx0E8ulqVSl4DWJRm2Dr-26a1SFyGcN1pie3NrkActKt9afD12UjnglGuPf8bXcrhbnYGCo78HLT4sVe-kR1OoEuNmABY',
  },
  {
    name: 'Architecture',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4',
  },
  {
    name: 'Monolith',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
  },
  {
    name: '35mm',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsay4t-LbMzdbGsYWl_6YWo6Du7WrZivK5kXn9GROJ872IcTZQvHY03RZkkS9H_Nc9kvwjPHH02BWVBpTSdNo0KzCkZR1xvTk5GJtppYSig4n9n_LM3LfLm-Zn0FLeLj3zRuI52u4HhAXj983hBQk3g0Qhqe8U5PPsprlahRSO3RGP8dARX44TUVsO8WIEY3Bp57msnYr3TIsH8HHppRVNLb9uB59-a2NDo1ilm9U',
  },
]

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser, posts, reels } = useSocialStore()
  const { logout } = useAuthStore()

  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'tagged'>('posts')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false)

  const [nameInput, setNameInput] = useState(currentUser.name)
  const [bioInput, setBioInput] = useState(currentUser.bio || '')
  const [websiteInput, setWebsiteInput] = useState(currentUser.website || '')

  const savedPosts = posts.filter((p) => p.isSaved)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    currentUser.name = nameInput
    currentUser.bio = bioInput
    currentUser.website = websiteInput
    setIsEditModalOpen(false)
  }

  const handleConfirmLogout = () => {
    logout()
    setIsLogoutModalOpen(false)
    navigate('/login')
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[935px] px-3 sm:px-6 py-6 flex flex-col gap-8">
        {/* Profile Header Block */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 w-full">
          {/* Avatar with Story Ring */}
          <div className="relative shrink-0 cursor-pointer group">
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full p-1 bg-surface">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Meta Details */}
          <div className="flex-1 flex flex-col gap-4 text-center sm:text-left">
            {/* Username & Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="font-headline-lg text-headline-md sm:text-headline-lg font-bold text-on-surface">
                {currentUser.username}
              </h1>
              {currentUser.isVerified && (
                <span className="material-symbols-outlined text-[20px] text-primary-container fill-1">
                  verified
                </span>
              )}
              <div className="flex items-center gap-2 relative">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md font-semibold border border-outline-variant transition-colors"
                >
                  Edit profile
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md font-semibold border border-outline-variant transition-colors"
                >
                  Share profile
                </button>

                {/* Direct Logout Button */}
                <button
                  type="button"
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-error/15 text-error hover:text-error text-label-md font-semibold border border-outline-variant/60 hover:border-error/40 flex items-center gap-1.5 transition-colors"
                  title="Log out"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span className="hidden sm:inline">Log out</span>
                </button>

                {/* Settings Gear Popover */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}
                    className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                    aria-label="Settings"
                  >
                    <span className="material-symbols-outlined text-[22px]">settings</span>
                  </button>

                  {isSettingsMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-surface-container-high border border-outline-variant rounded-xl shadow-2xl p-2 z-40 flex flex-col gap-1 backdrop-blur-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSettingsMenuOpen(false)
                          setIsEditModalOpen(true)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm text-on-surface hover:bg-surface-container text-left"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        <span>Edit Profile</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSettingsMenuOpen(false)
                          setActiveTab('saved')
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm text-on-surface hover:bg-surface-container text-left"
                      >
                        <span className="material-symbols-outlined text-[18px]">bookmark</span>
                        <span>Saved Posts</span>
                      </button>
                      <div className="h-[1px] bg-outline-variant my-1" />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSettingsMenuOpen(false)
                          setIsLogoutModalOpen(true)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-body-sm text-error hover:bg-error/10 text-left font-semibold"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 text-body-md text-on-surface">
              <div>
                <span className="font-bold">{currentUser.postsCount}</span>{' '}
                <span className="text-on-surface-variant">posts</span>
              </div>
              <div>
                <span className="font-bold">
                  {(currentUser.followersCount / 1000).toFixed(1)}k
                </span>{' '}
                <span className="text-on-surface-variant">followers</span>
              </div>
              <div>
                <span className="font-bold">{currentUser.followingCount}</span>{' '}
                <span className="text-on-surface-variant">following</span>
              </div>
            </div>

            {/* Bio Details */}
            <div className="flex flex-col gap-1 text-body-sm leading-relaxed max-w-[500px]">
              <span className="font-bold text-on-surface">{currentUser.name}</span>
              {currentUser.category && (
                <span className="text-outline text-[12px] font-medium">
                  {currentUser.category}
                </span>
              )}
              <p className="text-on-surface-variant whitespace-pre-line">
                {currentUser.bio}
              </p>
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-primary-container font-semibold hover:underline w-fit mt-1 text-[13px]"
                >
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  <span>{currentUser.website.replace('https://', '')}</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Story Highlights Tray */}
        <section className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {HIGHLIGHTS.map((hl) => (
            <div
              key={hl.name}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full p-0.5 border border-outline-variant group-hover:border-primary-container transition-colors">
                <img
                  src={hl.cover}
                  alt={hl.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-[11px] font-medium text-on-surface-variant group-hover:text-on-surface max-w-[70px] truncate text-center">
                {hl.name}
              </span>
            </div>
          ))}

          {/* New highlight button */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-full border border-dashed border-outline-variant flex items-center justify-center text-outline group-hover:text-on-surface group-hover:border-on-surface transition-all">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <span className="text-[11px] font-medium text-outline">New</span>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 border-t border-outline-variant text-[12px] font-bold tracking-wider uppercase">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'posts'
                ? 'border-on-surface text-on-surface'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">grid_on</span>
            <span className="hidden sm:inline">Posts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reels')}
            className={`flex items-center gap-2 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'reels'
                ? 'border-on-surface text-on-surface'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">smart_display</span>
            <span className="hidden sm:inline">Reels</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'saved'
                ? 'border-on-surface text-on-surface'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
            <span className="hidden sm:inline">Saved</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tagged')}
            className={`flex items-center gap-2 py-3 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'tagged'
                ? 'border-on-surface text-on-surface'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
            <span className="hidden sm:inline">Tagged</span>
          </button>
        </div>

        {/* Content Grid */}
        <div>
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-1 sm:gap-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative group aspect-square bg-surface-container-low rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-body-sm select-none">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px] fill-1 text-[#FD1D1D]">
                        favorite
                      </span>
                      <span>{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px] fill-1">
                        chat_bubble
                      </span>
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reels' && (
            <div className="grid grid-cols-3 gap-1 sm:gap-3">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="relative group aspect-[9/16] bg-surface-container-low rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={reel.posterUrl}
                    alt={reel.caption}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 text-white">
                    <span className="material-symbols-outlined text-[18px]">
                      smart_display
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white font-bold text-body-sm">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px] fill-1 text-[#FD1D1D]">
                        favorite
                      </span>
                      <span>{(reel.likesCount / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="grid grid-cols-3 gap-1 sm:gap-3">
              {savedPosts.length === 0 ? (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 text-outline text-body-sm gap-2">
                  <span className="material-symbols-outlined text-4xl">bookmark_border</span>
                  <span>No saved posts yet</span>
                </div>
              ) : (
                savedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative group aspect-square bg-surface-container-low rounded-lg overflow-hidden cursor-pointer"
                  >
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-body-sm">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px] fill-1 text-[#FD1D1D]">
                          favorite
                        </span>
                        <span>{post.likesCount}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'tagged' && (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 text-outline text-body-sm gap-2">
              <span className="material-symbols-outlined text-4xl">assignment_ind</span>
              <span>No tagged posts yet</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-[480px] bg-surface-container rounded-2xl border border-outline-variant shadow-2xl overflow-hidden p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <h3 className="font-headline-sm text-body-lg font-bold text-on-surface">
                Edit profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm font-semibold text-outline">
                  Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3.5 py-2 text-body-sm text-on-surface border border-outline-variant focus:outline-none focus:border-primary-container"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm font-semibold text-outline">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3.5 py-2 text-body-sm text-on-surface border border-outline-variant focus:outline-none focus:border-primary-container resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm font-semibold text-outline">
                  Website
                </label>
                <input
                  type="text"
                  value={websiteInput}
                  onChange={(e) => setWebsiteInput(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3.5 py-2 text-body-sm text-on-surface border border-outline-variant focus:outline-none focus:border-primary-container"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-1.5 text-label-md font-semibold text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-primary-container hover:bg-primary-container/90 text-white rounded-full text-label-md font-semibold shadow"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-[380px] bg-surface-container rounded-2xl border border-outline-variant shadow-2xl overflow-hidden p-6 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-error/15 border border-error/30 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">logout</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Log out of @{currentUser.username}?
              </h3>
              <p className="text-body-sm text-on-surface-variant">
                You will need to sign in again to access your feed, messages, and profile.
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="w-full py-2.5 rounded-full bg-error hover:bg-error/90 text-white font-label-md font-bold tracking-wide transition-all shadow-md"
              >
                Log Out
              </button>
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md font-semibold border border-outline-variant transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
