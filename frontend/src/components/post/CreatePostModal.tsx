import React, { useState } from 'react'
import { useSocialStore } from '../../store/socialStore'

const SAMPLE_IMAGES = [
  {
    name: 'Brutalist Monolith',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4',
  },
  {
    name: 'Ceramic Studies',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
  },
  {
    name: 'Sea Strait Fog',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsay4t-LbMzdbGsYWl_6YWo6Du7WrZivK5kXn9GROJ872IcTZQvHY03RZkkS9H_Nc9kvwjPHH02BWVBpTSdNo0KzCkZR1xvTk5GJtppYSig4n9n_LM3LfLm-Zn0FLeLj3zRuI52u4HhAXj983hBQk3g0Qhqe8U5PPsprlahRSO3RGP8dARX44TUVsO8WIEY3Bp57msnYr3TIsH8HHppRVNLb9uB59-a2NDo1ilm9U',
  },
  {
    name: 'Tokyo Neon Rain',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTO3sp-p-885cXEbE9g9fdA6A_c-xsKrQVGkhM6weqao3LjtDVAx5u6QkpeaivjWGp-DW8I53eL-pWb9kz1ssvOhBGcEIN3ojHuNwG0johJ97k6UVd4wliM5AG-qHZYDepmG44htyU4Mwx0E8ulqVSl4DWJRm2Dr-26a1SFyGcN1pie3NrkActKt9afD12UjnglGuPf8bXcrhbnYGCo78HLT4sVe-kR1OoEuNmABY',
  },
]

const FILTERS = [
  { name: 'Normal', css: 'none' },
  { name: 'Clarendon', css: 'contrast(1.2) saturate(1.25)' },
  { name: 'Moon', css: 'grayscale(1) contrast(1.1) brightness(0.95)' },
  { name: 'Gingham', css: 'sepia(0.2) contrast(0.9) brightness(1.05)' },
  { name: 'Juno', css: 'contrast(1.15) saturate(1.4)' },
  { name: 'Slumber', css: 'saturate(0.7) brightness(1.05)' },
]

export const CreatePostModal: React.FC = () => {
  const { isCreatePostOpen, setCreatePostOpen, currentUser, createPost } =
    useSocialStore()

  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0].url)
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '16:9'>('4:5')
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0])
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isCreatePostOpen) return null

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage(url)
    }
  }

  const handleShare = () => {
    if (!selectedImage) return
    setIsSubmitting(true)
    setTimeout(() => {
      createPost({
        userId: currentUser.id,
        username: currentUser.username,
        userAvatar: currentUser.avatar,
        isVerified: currentUser.isVerified,
        location: location.trim() || undefined,
        mediaUrl: selectedImage,
        mediaType: 'image',
        aspectRatio,
        filter: selectedFilter.css,
        caption: caption.trim() || 'New post ✨',
      })
      setIsSubmitting(false)
      setCaption('')
      setLocation('')
      setSelectedFilter(FILTERS[0])
    }, 400)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-surface-container-lowest/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-[880px] bg-surface-container rounded-2xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-surface-container-high">
          <button
            type="button"
            onClick={() => setCreatePostOpen(false)}
            className="p-1 text-on-surface-variant hover:text-on-surface rounded-full"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
          <h3 className="font-headline-sm text-body-lg font-bold text-on-surface">
            Create new post
          </h3>
          <button
            type="button"
            onClick={handleShare}
            disabled={isSubmitting}
            className="px-3.5 py-1 text-label-md font-semibold text-primary-container hover:text-primary-container/80 disabled:opacity-50 transition-opacity"
          >
            {isSubmitting ? 'Sharing...' : 'Share'}
          </button>
        </div>

        {/* Body (Side-by-Side on larger screens) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
          {/* Media Preview Column */}
          <div className="flex-1 bg-black flex flex-col items-center justify-center p-4 relative min-h-[320px] md:min-h-[460px]">
            <div
              className="relative max-h-[420px] max-w-full overflow-hidden rounded-xl border border-outline-variant/40 flex items-center justify-center bg-surface-container-lowest"
              style={{
                aspectRatio:
                  aspectRatio === '1:1'
                    ? '1/1'
                    : aspectRatio === '4:5'
                    ? '4/5'
                    : '16/9',
              }}
            >
              <img
                src={selectedImage}
                alt="Upload preview"
                className="w-full h-full object-cover transition-all"
                style={{ filter: selectedFilter.css }}
              />
            </div>

            {/* Controls: Aspect Ratio & Filter Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 z-10">
              <div className="flex items-center bg-surface-container-high/90 backdrop-blur-md rounded-full px-2 py-1 gap-1 border border-outline-variant text-label-sm">
                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    aspectRatio === '1:1'
                      ? 'bg-on-surface text-surface'
                      : 'text-on-surface-variant'
                  }`}
                >
                  1:1
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('4:5')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    aspectRatio === '4:5'
                      ? 'bg-on-surface text-surface'
                      : 'text-on-surface-variant'
                  }`}
                >
                  4:5
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    aspectRatio === '16:9'
                      ? 'bg-on-surface text-surface'
                      : 'text-on-surface-variant'
                  }`}
                >
                  16:9
                </button>
              </div>

              {/* Upload custom file */}
              <label className="cursor-pointer px-3 py-1 bg-surface-container-high/90 hover:bg-surface-container-highest text-on-surface rounded-full text-label-sm border border-outline-variant flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-2 mt-2 no-scrollbar">
              {FILTERS.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setSelectedFilter(f)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all shrink-0 ${
                    selectedFilter.name === f.name
                      ? 'bg-primary-container text-white border-primary-container shadow-sm'
                      : 'bg-surface-container-high/80 text-on-surface-variant border-outline-variant hover:text-on-surface'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata & Caption Column */}
          <div className="w-full md:w-[340px] bg-surface-container p-4 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-outline-variant">
            {/* User row */}
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant"
              />
              <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                {currentUser.username}
              </span>
            </div>

            {/* Caption Input */}
            <div className="flex flex-col gap-1 flex-1">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption, mention @creators or add #hashtags..."
                rows={5}
                maxLength={2200}
                className="w-full bg-surface-container-low rounded-xl p-3 text-body-sm text-on-surface placeholder:text-outline border border-outline-variant focus:border-primary-container focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between text-[11px] text-outline px-1">
                <span>{caption.length}/2,200</span>
                <span className="text-primary cursor-pointer hover:underline">
                  #editorial #35mm
                </span>
              </div>
            </div>

            {/* Location Tag */}
            <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant">
              <span className="material-symbols-outlined text-[18px] text-outline">
                location_on
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location (e.g. Berlin, Tokyo)"
                className="bg-transparent text-body-sm text-on-surface placeholder:text-outline focus:outline-none flex-1"
              />
            </div>

            {/* Preset image picker */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                Select Photo Preset
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img.url
                        ? 'border-primary-container ring-2 ring-primary-container/40'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
