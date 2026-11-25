import React, { useState } from 'react'
import { useSocialStore } from '../store/socialStore'

const EXPLORE_TAGS = [
  'All',
  'Architecture',
  'Editorial',
  'Film & 35mm',
  'Fashion',
  'Sound Design',
  'Exhibitions',
  'Minimalism',
]

const EXPLORE_MEDIA = [
  {
    id: 'exp_1',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4',
    likes: 1840,
    comments: 92,
    tag: 'Architecture',
    caption: 'Concrete geometries in twilight',
  },
  {
    id: 'exp_2',
    type: 'reel',
    span: 'col-span-1 sm:col-span-2 row-span-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTO3sp-p-885cXEbE9g9fdA6A_c-xsKrQVGkhM6weqao3LjtDVAx5u6QkpeaivjWGp-DW8I53eL-pWb9kz1ssvOhBGcEIN3ojHuNwG0johJ97k6UVd4wliM5AG-qHZYDepmG44htyU4Mwx0E8ulqVSl4DWJRm2Dr-26a1SFyGcN1pie3NrkActKt9afD12UjnglGuPf8bXcrhbnYGCo78HLT4sVe-kR1OoEuNmABY',
    likes: 42100,
    comments: 1102,
    tag: 'Editorial',
    caption: 'Tokyo rain reflections 🌧️',
  },
  {
    id: 'exp_3',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsay4t-LbMzdbGsYWl_6YWo6Du7WrZivK5kXn9GROJ872IcTZQvHY03RZkkS9H_Nc9kvwjPHH02BWVBpTSdNo0KzCkZR1xvTk5GJtppYSig4n9n_LM3LfLm-Zn0FLeLj3zRuI52u4HhAXj983hBQk3g0Qhqe8U5PPsprlahRSO3RGP8dARX44TUVsO8WIEY3Bp57msnYr3TIsH8HHppRVNLb9uB59-a2NDo1ilm9U',
    likes: 2940,
    comments: 64,
    tag: 'Film & 35mm',
    caption: 'Sea fog breaking over suspension cables',
  },
  {
    id: 'exp_4',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
    likes: 5820,
    comments: 198,
    tag: 'Exhibitions',
    caption: 'Raw ceramic studies: Autumn stoneware',
  },
  {
    id: 'exp_5',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChBqshW_TS0a1VEdtfvydhl0JsBh3EgrfSjMAXSeQgyPlOO6Ac6_T7JopAmvytNXA_vbjIqqnk9kJtXzPw5sbQoqnB-XnoC_oUb3ZTZF5VXPWjzEA1wdjlb1ccMANLYsYMjTHyU6KiXCxcFfsoTN9KvzasNffAv9Tlm8DGAazm-7sRcZyUwNi0YVT_c4WtFLPzhDkVvzJyfYNZ92LL3RSEsYrw1ZOyvRDz9CZ3340',
    likes: 3120,
    comments: 73,
    tag: 'Fashion',
    caption: 'Textile drapery and soft studio lighting',
  },
  {
    id: 'exp_6',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJRjQgfWLCwSqoSPx6jD_Dp6VUHSAtBMFNBK3Qxq-vzSjsSie6WzhpOI8DFPvPoFgAzuvwlnPMl7C3tp4oH9PR7q6q7iYFzaWQudlywrD9G2oBCAD1CXRGFOEna3X288z-XjGN4MLbW6yfOBnA3mkSl944Vsn9T7kKj5kDZmfGQKXfpYYGYe4vZeZ7Jlqz4zkHyIAhXB6PvTpQaZpccC_glN01bFuJsDIgevp7Quk',
    likes: 1450,
    comments: 31,
    tag: 'Minimalism',
    caption: 'Monochrome spatial shadows',
  },
  {
    id: 'exp_7',
    type: 'reel',
    span: 'col-span-1 sm:col-span-2 row-span-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALh91Ukls29ASrRd78oncieE3uX7770X5DPRjZi_ACSMiud6854uQbxUDs3FX8Hh62lTg4V7QKlowFHPjwTgFw8314jcdR_NDQqHojlvcWEgFpxc0TvhlW-Xdu752ud76LjVvv1aD5EPdWZZiGGy5rGHQCGxeRLPZMKvu490BArJWeHEm6EcKPx0nTZG5OFwUpodkjSVYH1pikFS_ecqEHRFn46g5mWzsJ1VaflMI',
    likes: 38400,
    comments: 920,
    tag: 'Sound Design',
    caption: 'Analog synthesizer modular sessions',
  },
  {
    id: 'exp_8',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_jIAWnHL9QdM60iw5YuuOZ02JbnZjxwhnZ5u_hg1sRU08okitq2Qwannj5Yr1O1sNR8oEiuZpOyymwt56CGFLF5HEsmQviPVJ-TiSz7-FldRdvoJPpR0-suyA6Bzk01vIxHbrig0tJwz6fDH4E-JjDTvzppwzt6BvE55Uc7TXdRnB7e2HLn9lOriKGFhZudxLq8udUX-rhUWPel0mn6Lw_PfgcMmtBZCpgDXFg34',
    likes: 2190,
    comments: 55,
    tag: 'Architecture',
    caption: 'Spiral staircase acoustics',
  },
  {
    id: 'exp_9',
    type: 'image',
    span: 'col-span-1 row-span-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-VJ5U_YOyYrWAbM_uJY804sHkKKqECdQ_gwx-Vvnwm9oYh95bypQFwWCliF_TlxER36gc_7R4yoVzx6tRo_Dj6bGlMH14IWQX68ddr7sKF94Iz_cw2wmMRYJwrPSfMV5xvuKo9k8ioPWEHZcMER_0m_g2GD5oLFR6hU6R3UU9QQ2Inl-fjij6KHORwWUSOgxhU5YS6YM1dyHT09e4yWoDKz3adCKLYMfMgZTWRFE',
    likes: 4100,
    comments: 88,
    tag: 'Editorial',
    caption: 'Vogue Scandinavia behind-the-scenes',
  },
]

export const ExplorePage: React.FC = () => {
  const { activeExploreTag, setActiveExploreTag, searchQuery, setSearchQuery } =
    useSocialStore()

  const [activeMediaModal, setActiveMediaModal] = useState<typeof EXPLORE_MEDIA[0] | null>(null)

  const filteredMedia = EXPLORE_MEDIA.filter((item) => {
    const matchesTag =
      activeExploreTag === 'All' || item.tag.toLowerCase() === activeExploreTag.toLowerCase()
    const matchesSearch =
      !searchQuery.trim() ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sticky Search & Tag Header */}
      <section className="w-full bg-surface-container-lowest/80 backdrop-blur-xl sticky top-16 z-30 px-4 py-3 border-b border-outline-variant/40">
        <div className="max-w-[960px] mx-auto flex flex-col gap-3">
          {/* Search bar */}
          <div className="relative w-full flex items-center">
            <span className="material-symbols-outlined text-[20px] text-outline absolute left-4 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architecture, film, editorial, or creators..."
              className="w-full bg-surface-container-low rounded-full pl-11 pr-10 py-2.5 text-body-sm text-on-surface placeholder:text-outline border border-outline-variant focus:border-primary-container focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>

          {/* Filter Pills Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {EXPLORE_TAGS.map((tag) => {
              const isActive = activeExploreTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveExploreTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-label-md font-semibold shrink-0 transition-all ${
                    isActive
                      ? 'bg-on-surface text-surface shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-outline-variant/60'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Discovery Masonry Grid */}
      <div className="max-w-[960px] w-full px-2 sm:px-4 py-6">
        {filteredMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-3">
            <span className="material-symbols-outlined text-5xl text-outline">
              travel_explore
            </span>
            <p className="font-headline-sm text-body-lg">No content found</p>
            <p className="text-body-sm text-outline">
              Try searching with another keyword or selecting "All".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 auto-rows-[160px] sm:auto-rows-[220px]">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMediaModal(item)}
                className={`relative group rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40 cursor-pointer ${item.span}`}
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Reel icon badge in top right */}
                {item.type === 'reel' && (
                  <div className="absolute top-2.5 right-2.5 p-1 rounded-md bg-black/60 backdrop-blur-md text-white z-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">
                      smart_display
                    </span>
                  </div>
                )}

                {/* Dark Hover Overlay with Stats */}
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 text-white z-20 p-3 select-none">
                  <div className="flex items-center gap-6 font-bold text-body-md">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] fill-1 text-[#FD1D1D]">
                        favorite
                      </span>
                      <span>{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] fill-1">
                        chat_bubble
                      </span>
                      <span>{item.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-[12px] text-center text-on-surface line-clamp-2 max-w-[200px]">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Lightbox Modal */}
      {activeMediaModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="relative max-w-[560px] w-full bg-surface-container rounded-2xl overflow-hidden border border-outline-variant shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[500px] bg-black flex items-center justify-center">
              <img
                src={activeMediaModal.url}
                alt={activeMediaModal.caption}
                className="w-full h-auto object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveMediaModal(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-body-sm text-on-surface font-semibold">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px]">
                  #{activeMediaModal.tag}
                </span>
                <span>{activeMediaModal.likes.toLocaleString()} likes</span>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {activeMediaModal.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
