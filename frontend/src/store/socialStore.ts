import { create } from 'zustand'
import type {
  SocialUser,
  SocialPost,
  SocialReel,
  StoryItem,
  Conversation,
  UserNote,
  SocialNotification,
} from '../types/social'

interface SocialState {
  currentUser: SocialUser
  posts: SocialPost[]
  stories: StoryItem[]
  reels: SocialReel[]
  conversations: Conversation[]
  notes: UserNote[]
  notifications: SocialNotification[]
  activeExploreTag: string
  searchQuery: string
  isCreatePostOpen: boolean
  isNotificationsOpen: boolean

  // Actions
  toggleLikePost: (postId: string) => void
  toggleSavePost: (postId: string) => void
  addCommentToPost: (postId: string, text: string) => void
  toggleLikeReel: (reelId: string) => void
  toggleSaveReel: (reelId: string) => void
  addCommentToReel: (reelId: string, text: string) => void
  toggleFollowUser: (username: string) => void
  createPost: (newPost: Omit<SocialPost, 'id' | 'createdAt' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'isLiked' | 'isSaved' | 'comments'>) => void
  sendMessage: (conversationId: string, text: string) => void
  setActiveExploreTag: (tag: string) => void
  setSearchQuery: (query: string) => void
  setCreatePostOpen: (open: boolean) => void
  setNotificationsOpen: (open: boolean) => void
}

export const useSocialStore = create<SocialState>((set) => ({
  currentUser: {
    id: 'user_current',
    username: 'elena_rostova',
    name: 'Elena Rostova',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWnDTQDBgElX1-PMmkq84PaH6X13UFiiwusWO8WwspaxJpYtAXoHUOB2KvOgia9rBFDubveN6szCGn-S2uHqoq24oJS5Jcs_zJqvt9sie3SsPY-BDm4bLUXtWo7daHekGFcN6hcg51rGgLNTyRZ857bQxGDdPwgXRDMJ3XrSzNPbbkBudY9UxxR7rnMetvyoWB9LHicfoCpUa6XOo8n2nRwzWl-Ft4VZ-w9etoR4',
    bio: 'Architectural research & visual minimalism. Exploring brutalism and light in Berlin & Tokyo. 📐 35mm film.',
    category: 'Visual Artist / Architecture',
    website: 'https://elenarostova.design',
    followersCount: 14280,
    followingCount: 489,
    postsCount: 128,
    isVerified: true,
  },

  stories: [
    {
      id: 's_0',
      userId: 'user_current',
      username: 'Your Story',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWnDTQDBgElX1-PMmkq84PaH6X13UFiiwusWO8WwspaxJpYtAXoHUOB2KvOgia9rBFDubveN6szCGn-S2uHqoq24oJS5Jcs_zJqvt9sie3SsPY-BDm4bLUXtWo7daHekGFcN6hcg51rGgLNTyRZ857bQxGDdPwgXRDMJ3XrSzNPbbkBudY9UxxR7rnMetvyoWB9LHicfoCpUa6XOo8n2nRwzWl-Ft4VZ-w9etoR4',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
      hasUnseen: false,
      timestamp: '2h ago',
    },
    {
      id: 's_1',
      userId: 'u_kai',
      username: 'kai_zenith',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4',
      hasUnseen: true,
      timestamp: '15m ago',
    },
    {
      id: 's_2',
      userId: 'u_marcus',
      username: 'marcus.v',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpAdWc1JJK5dduBOMcFjQzT6iPdsfuO0cvEGKN1nCauf6dFmHKrHG8Tc4rN17J9d9FFB_OLv_INgvui15p0WK7qqRbZdxt5yp6M44yoyQjav6FcLKfWfSN5tFl20UvDwGLd41ZD4gQ6ishgrdLBI-2sd-3HLBFBd-IpzaYYuIqd6_9_OEBp5k463AmBrWuLJcZhnQjyeYM8uCAw5QtnUTmULFY5OdWvxOJrxhaspg',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsay4t-LbMzdbGsYWl_6YWo6Du7WrZivK5kXn9GROJ872IcTZQvHY03RZkkS9H_Nc9kvwjPHH02BWVBpTSdNo0KzCkZR1xvTk5GJtppYSig4n9n_LM3LfLm-Zn0FLeLj3zRuI52u4HhAXj983hBQk3g0Qhqe8U5PPsprlahRSO3RGP8dARX44TUVsO8WIEY3Bp57msnYr3TIsH8HHppRVNLb9uB59-a2NDo1ilm9U',
      hasUnseen: true,
      timestamp: '42m ago',
    },
    {
      id: 's_3',
      userId: 'u_studio_nord',
      username: 'studio_nord',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ntGTvVSce9CsFZLT8tdVunTWY8M_TDgpi7HB_nbPZj0GOcD4qBzdLw2BtHpFLR88_3tGznclsVIIhrd3hh3tAg7JzFydtSdDpxpRSQ5qtexkLougKCUzZttUVdxgTZnR4L-Jfg1aWq922fIqlbzhOgfnIoS2oGxUzjdsfJyqtN2_peaYBuFDHd-GX0DHG0zns_99r77Z6CalBJ0Tr693N_23bY5DkEqpUnGKjnQ',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
      hasUnseen: true,
      timestamp: '1h ago',
    },
    {
      id: 's_4',
      userId: 'u_chloe',
      username: 'chloe.archives',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCEb60VYWDQXo0ZEQgSRseRkeS_RV4FiG3-Lq2E6kzRBMuVLmA5GDB4cCaKWeVnRDBG5SSmj4Ml7_5w8ZTQ7FrHd1_4nB3kAmzfDljIViyZrra5PDpRe8RY4wccxdfSPfaRUCs55ZwWi1yCJUuUD5l1vsFElRC4adyAw_uHuFDOp4L4K2KsaB0oANhBEQnqMUhn-KDjukOGszZj-0m_i2nERNsygxkBlLvNbI1Ts',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChBqshW_TS0a1VEdtfvydhl0JsBh3EgrfSjMAXSeQgyPlOO6Ac6_T7JopAmvytNXA_vbjIqqnk9kJtXzPw5sbQoqnB-XnoC_oUb3ZTZF5VXPWjzEA1wdjlb1ccMANLYsYMjTHyU6KiXCxcFfsoTN9KvzasNffAv9Tlm8DGAazm-7sRcZyUwNi0YVT_c4WtFLPzhDkVvzJyfYNZ92LL3RSEsYrw1ZOyvRDz9CZ3340',
      hasUnseen: true,
      timestamp: '3h ago',
    },
    {
      id: 's_5',
      userId: 'u_sora',
      username: 'sora_visuals',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxRNiOzBfFzhNJXj7Q03vFdZPoe4Mbz9Wvx5na7QylkFLVH7ZpCHnEAQdzLQNuCAsSI5B0hdTVkrgu7UczIM0PepRfd8rYouEO5Rwer7HlBfjRzGZRHR8zf3ZovJ7ea2aTktIFkzJuslwOoK_Wf566SxfJkZl6FG63kzoUC7fMbBBsBbecj8kcTWbaNUeWo0enYNYvaTn8pNkCET-NhuDX1h2tvfnXG8LV0-Wv6Pw',
      media: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTO3sp-p-885cXEbE9g9fdA6A_c-xsKrQVGkhM6weqao3LjtDVAx5u6QkpeaivjWGp-DW8I53eL-pWb9kz1ssvOhBGcEIN3ojHuNwG0johJ97k6UVd4wliM5AG-qHZYDepmG44htyU4Mwx0E8ulqVSl4DWJRm2Dr-26a1SFyGcN1pie3NrkActKt9afD12UjnglGuPf8bXcrhbnYGCo78HLT4sVe-kR1OoEuNmABY',
      hasUnseen: false,
      timestamp: '5h ago',
    },
  ],

  posts: [
    {
      id: 'post_1',
      userId: 'u_kai',
      username: 'kai_zenith',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
      isVerified: true,
      location: 'Neue Nationalgalerie, Berlin',
      mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4',
      mediaType: 'image',
      caption: 'The geometry of twilight. Concrete monolithic slabs framing the evening overcast. Captured on Hasselblad 500C/M with Kodak Tri-X 400. Minimal post-processing to preserve the natural grain density.',
      likesCount: 1420,
      commentsCount: 86,
      sharesCount: 34,
      isLiked: false,
      isSaved: false,
      createdAt: '2 HOURS AGO',
      comments: [
        {
          id: 'c_1',
          username: 'marcus.v',
          userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpAdWc1JJK5dduBOMcFjQzT6iPdsfuO0cvEGKN1nCauf6dFmHKrHG8Tc4rN17J9d9FFB_OLv_INgvui15p0WK7qqRbZdxt5yp6M44yoyQjav6FcLKfWfSN5tFl20UvDwGLd41ZD4gQ6ishgrdLBI-2sd-3HLBFBd-IpzaYYuIqd6_9_OEBp5k463AmBrWuLJcZhnQjyeYM8uCAw5QtnUTmULFY5OdWvxOJrxhaspg',
          text: 'The tonal range on this Tri-X negative is remarkable. Incredible framing Kai!',
          createdAt: '1h ago',
          likesCount: 12,
          isLiked: true,
        },
        {
          id: 'c_2',
          username: 'chloe.archives',
          userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCEb60VYWDQXo0ZEQgSRseRkeS_RV4FiG3-Lq2E6kzRBMuVLmA5GDB4cCaKWeVnRDBG5SSmj4Ml7_5w8ZTQ7FrHd1_4nB3kAmzfDljIViyZrra5PDpRe8RY4wccxdfSPfaRUCs55ZwWi1yCJUuUD5l1vsFElRC4adyAw_uHuFDOp4L4K2KsaB0oANhBEQnqMUhn-KDjukOGszZj-0m_i2nERNsygxkBlLvNbI1Ts',
          text: 'The negative space at the top anchors the weight so well. Need to visit this spot.',
          createdAt: '45m ago',
          likesCount: 5,
          isLiked: false,
        },
      ],
    },
    {
      id: 'post_2',
      userId: 'u_studio_nord',
      username: 'studio_nord',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ntGTvVSce9CsFZLT8tdVunTWY8M_TDgpi7HB_nbPZj0GOcD4qBzdLw2BtHpFLR88_3tGznclsVIIhrd3hh3tAg7JzFydtSdDpxpRSQ5qtexkLougKCUzZttUVdxgTZnR4L-Jfg1aWq922fIqlbzhOgfnIoS2oGxUzjdsfJyqtN2_peaYBuFDHd-GX0DHG0zns_99r77Z6CalBJ0Tr693N_23bY5DkEqpUnGKjnQ',
      isVerified: true,
      location: 'Kyoto Design Studio, Japan',
      mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
      mediaType: 'image',
      caption: 'Ceramic tactile studies: Autumn edition. Raw unglazed stoneware exploring tension between organic imperfections and precise architectural silhouettes.',
      likesCount: 3840,
      commentsCount: 114,
      sharesCount: 78,
      isLiked: true,
      isSaved: true,
      createdAt: '5 HOURS AGO',
      comments: [
        {
          id: 'c_3',
          username: 'elena_rostova',
          userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWnDTQDBgElX1-PMmkq84PaH6X13UFiiwusWO8WwspaxJpYtAXoHUOB2KvOgia9rBFDubveN6szCGn-S2uHqoq24oJS5Jcs_zJqvt9sie3SsPY-BDm4bLUXtWo7daHekGFcN6hcg51rGgLNTyRZ857bQxGDdPwgXRDMJ3XrSzNPbbkBudY9UxxR7rnMetvyoWB9LHicfoCpUa6XOo8n2nRwzWl-Ft4VZ-w9etoR4',
          text: 'These silhouettes are pure poetry. When will the limited edition drop be available?',
          createdAt: '3h ago',
          likesCount: 19,
          isLiked: true,
        },
      ],
    },
    {
      id: 'post_3',
      userId: 'u_marcus',
      username: 'marcus.v',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpAdWc1JJK5dduBOMcFjQzT6iPdsfuO0cvEGKN1nCauf6dFmHKrHG8Tc4rN17J9d9FFB_OLv_INgvui15p0WK7qqRbZdxt5yp6M44yoyQjav6FcLKfWfSN5tFl20UvDwGLd41ZD4gQ6ishgrdLBI-2sd-3HLBFBd-IpzaYYuIqd6_9_OEBp5k463AmBrWuLJcZhnQjyeYM8uCAw5QtnUTmULFY5OdWvxOJrxhaspg',
      isVerified: false,
      location: 'Oshima Island, Shimanami Kaido',
      mediaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsay4t-LbMzdbGsYWl_6YWo6Du7WrZivK5kXn9GROJ872IcTZQvHY03RZkkS9H_Nc9kvwjPHH02BWVBpTSdNo0KzCkZR1xvTk5GJtppYSig4n9n_LM3LfLm-Zn0FLeLj3zRuI52u4HhAXj983hBQk3g0Qhqe8U5PPsprlahRSO3RGP8dARX44TUVsO8WIEY3Bp57msnYr3TIsH8HHppRVNLb9uB59-a2NDo1ilm9U',
      mediaType: 'image',
      caption: 'Sea fog breaking over the suspension cables at 06:14. Leica M11-P with 35mm Summilux f/1.4. The silence across the strait was absolute.',
      likesCount: 954,
      commentsCount: 42,
      sharesCount: 15,
      isLiked: false,
      isSaved: false,
      createdAt: '9 HOURS AGO',
      comments: [],
    },
  ],

  reels: [
    {
      id: 'reel_1',
      creator: {
        username: 'sora_visuals',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxRNiOzBfFzhNJXj7Q03vFdZPoe4Mbz9Wvx5na7QylkFLVH7ZpCHnEAQdzLQNuCAsSI5B0hdTVkrgu7UczIM0PepRfd8rYouEO5Rwer7HlBfjRzGZRHR8zf3ZovJ7ea2aTktIFkzJuslwOoK_Wf566SxfJkZl6FG63kzoUC7fMbBBsBbecj8kcTWbaNUeWo0enYNYvaTn8pNkCET-NhuDX1h2tvfnXG8LV0-Wv6Pw',
        isVerified: true,
        isFollowing: false,
      },
      caption: 'Tokyo rain acoustics & neon reflection studies in Shibuya backalleys 🌧️ Recorded with binaural hydrophones. Sound on for the complete atmospheric experience.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tokyo-night-rain-streets-and-reflections-41527-large.mp4',
      posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTO3sp-p-885cXEbE9g9fdA6A_c-xsKrQVGkhM6weqao3LjtDVAx5u6QkpeaivjWGp-DW8I53eL-pWb9kz1ssvOhBGcEIN3ojHuNwG0johJ97k6UVd4wliM5AG-qHZYDepmG44htyU4Mwx0E8ulqVSl4DWJRm2Dr-26a1SFyGcN1pie3NrkActKt9afD12UjnglGuPf8bXcrhbnYGCo78HLT4sVe-kR1OoEuNmABY',
      audioTrack: {
        title: 'Shibuya Night Rain (Binaural Cut)',
        artist: 'Sora Visuals • Original Audio',
      },
      likesCount: 48200,
      commentsCount: 1240,
      sharesCount: 8900,
      isLiked: true,
      isSaved: true,
      tags: ['#tokyo', '#ambient', '#streetphotography', '#cinematic'],
      comments: [
        {
          id: 'rc_1',
          username: 'kai_zenith',
          userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
          text: 'The color grading on that puddle reflection is insane!',
          createdAt: '2h ago',
          likesCount: 142,
          isLiked: true,
        },
      ],
    },
    {
      id: 'reel_2',
      creator: {
        username: 'studio_nord',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ntGTvVSce9CsFZLT8tdVunTWY8M_TDgpi7HB_nbPZj0GOcD4qBzdLw2BtHpFLR88_3tGznclsVIIhrd3hh3tAg7JzFydtSdDpxpRSQ5qtexkLougKCUzZttUVdxgTZnR4L-Jfg1aWq922fIqlbzhOgfnIoS2oGxUzjdsfJyqtN2_peaYBuFDHd-GX0DHG0zns_99r77Z6CalBJ0Tr693N_23bY5DkEqpUnGKjnQ',
        isVerified: true,
        isFollowing: true,
      },
      caption: 'Pouring liquid bronze into hand-carved sand molds. A 48-hour casting process condensed into 30 hypnotic seconds. 🔥',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-molten-metal-in-a-foundry-40436-large.mp4',
      posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
      audioTrack: {
        title: 'Industrial Rhythm 04',
        artist: 'Nordic Foundry Works',
      },
      likesCount: 29500,
      commentsCount: 480,
      sharesCount: 3200,
      isLiked: false,
      isSaved: false,
      tags: ['#craftsmanship', '#foundry', '#bronze', '#sculpture'],
      comments: [],
    },
  ],

  notes: [
    {
      id: 'n_0',
      userId: 'user_current',
      username: 'Your note',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxWnDTQDBgElX1-PMmkq84PaH6X13UFiiwusWO8WwspaxJpYtAXoHUOB2KvOgia9rBFDubveN6szCGn-S2uHqoq24oJS5Jcs_zJqvt9sie3SsPY-BDm4bLUXtWo7daHekGFcN6hcg51rGgLNTyRZ857bQxGDdPwgXRDMJ3XrSzNPbbkBudY9UxxR7rnMetvyoWB9LHicfoCpUa6XOo8n2nRwzWl-Ft4VZ-w9etoR4',
      note: 'Berlin darkroom today 🎞️',
    },
    {
      id: 'n_1',
      userId: 'u_kai',
      username: 'kai_zenith',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
      note: 'Listening to Brian Eno 🎧',
    },
    {
      id: 'n_2',
      userId: 'u_chloe',
      username: 'chloe.archives',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCEb60VYWDQXo0ZEQgSRseRkeS_RV4FiG3-Lq2E6kzRBMuVLmA5GDB4cCaKWeVnRDBG5SSmj4Ml7_5w8ZTQ7FrHd1_4nB3kAmzfDljIViyZrra5PDpRe8RY4wccxdfSPfaRUCs55ZwWi1yCJUuUD5l1vsFElRC4adyAw_uHuFDOp4L4K2KsaB0oANhBEQnqMUhn-KDjukOGszZj-0m_i2nERNsygxkBlLvNbI1Ts',
      note: 'New zine printed! 📖',
    },
  ],

  conversations: [
    {
      id: 'conv_1',
      user: {
        id: 'u_kai',
        username: 'kai_zenith',
        name: 'Kai Takahashi',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
        isOnline: true,
      },
      lastMessage: 'Let’s review the contact sheets tomorrow morning.',
      lastMessageTime: '12m ago',
      unreadCount: 1,
      isPinned: true,
      messages: [
        {
          id: 'm_1',
          senderId: 'u_kai',
          text: 'Hey Elena! Did you check out the scans from the Brutalist series?',
          timestamp: '10:42 AM',
          isRead: true,
          isMine: false,
        },
        {
          id: 'm_2',
          senderId: 'user_current',
          text: 'Yes! The shadows on negative #04 are extraordinary. The Tri-X grain really held up.',
          timestamp: '10:45 AM',
          isRead: true,
          isMine: true,
        },
        {
          id: 'm_3',
          senderId: 'u_kai',
          text: 'Let’s review the contact sheets tomorrow morning.',
          timestamp: '10:48 AM',
          isRead: false,
          isMine: false,
        },
      ],
    },
    {
      id: 'conv_2',
      user: {
        id: 'u_studio_nord',
        username: 'studio_nord',
        name: 'Studio Nord Copenhagen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ntGTvVSce9CsFZLT8tdVunTWY8M_TDgpi7HB_nbPZj0GOcD4qBzdLw2BtHpFLR88_3tGznclsVIIhrd3hh3tAg7JzFydtSdDpxpRSQ5qtexkLougKCUzZttUVdxgTZnR4L-Jfg1aWq922fIqlbzhOgfnIoS2oGxUzjdsfJyqtN2_peaYBuFDHd-GX0DHG0zns_99r77Z6CalBJ0Tr693N_23bY5DkEqpUnGKjnQ',
        isOnline: false,
        lastSeen: '1h ago',
      },
      lastMessage: 'The exhibition catalogue has shipped to Berlin.',
      lastMessageTime: '2h ago',
      unreadCount: 0,
      messages: [
        {
          id: 'm_4',
          senderId: 'u_studio_nord',
          text: 'The exhibition catalogue has shipped to Berlin.',
          timestamp: 'Yesterday',
          isRead: true,
          isMine: false,
        },
      ],
    },
    {
      id: 'conv_3',
      user: {
        id: 'u_chloe',
        username: 'chloe.archives',
        name: 'Chloé Laurent',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCEb60VYWDQXo0ZEQgSRseRkeS_RV4FiG3-Lq2E6kzRBMuVLmA5GDB4cCaKWeVnRDBG5SSmj4Ml7_5w8ZTQ7FrHd1_4nB3kAmzfDljIViyZrra5PDpRe8RY4wccxdfSPfaRUCs55ZwWi1yCJUuUD5l1vsFElRC4adyAw_uHuFDOp4L4K2KsaB0oANhBEQnqMUhn-KDjukOGszZj-0m_i2nERNsygxkBlLvNbI1Ts',
        isOnline: true,
      },
      lastMessage: 'Shared a reel by @sora_visuals',
      lastMessageTime: '4h ago',
      unreadCount: 0,
      messages: [
        {
          id: 'm_5',
          senderId: 'u_chloe',
          text: 'Shared a reel by @sora_visuals',
          timestamp: '4h ago',
          isRead: true,
          isMine: false,
        },
      ],
    },
  ],

  notifications: [
    {
      id: 'notif_1',
      type: 'like',
      user: {
        username: 'kai_zenith',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAktZ0WJql4659NS-Rtb9CZcBAoWFHtv1R4EAjKYkXOXeo_FO2aRLN2BGTbBPe6KEmKWDAO4JNzrNwh139Fns_n7li1A0Nr14K9emA0Po6v6b-_mPcscji2MSRuqWP_IwTwgTTFwcKthImjy-O8vjrKjqtCnHrPmCIedGIh0RjBWBFaa0ty1xLVK-zATTMFFEFGxMmUWWfNYupjxFD-Q0btpc6XafJPSEqL5dkeSHk',
      },
      content: 'liked your photo: "Monolithic concrete in Berlin".',
      targetMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4',
      createdAt: '10m ago',
      isRead: false,
    },
    {
      id: 'notif_2',
      type: 'comment',
      user: {
        username: 'studio_nord',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ntGTvVSce9CsFZLT8tdVunTWY8M_TDgpi7HB_nbPZj0GOcD4qBzdLw2BtHpFLR88_3tGznclsVIIhrd3hh3tAg7JzFydtSdDpxpRSQ5qtexkLougKCUzZttUVdxgTZnR4L-Jfg1aWq922fIqlbzhOgfnIoS2oGxUzjdsfJyqtN2_peaYBuFDHd-GX0DHG0zns_99r77Z6CalBJ0Tr693N_23bY5DkEqpUnGKjnQ',
      },
      content: 'commented: "These silhouettes are pure poetry."',
      targetMedia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA',
      createdAt: '1h ago',
      isRead: false,
    },
    {
      id: 'notif_3',
      type: 'follow',
      user: {
        username: 'sora_visuals',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxRNiOzBfFzhNJXj7Q03vFdZPoe4Mbz9Wvx5na7QylkFLVH7ZpCHnEAQdzLQNuCAsSI5B0hdTVkrgu7UczIM0PepRfd8rYouEO5Rwer7HlBfjRzGZRHR8zf3ZovJ7ea2aTktIFkzJuslwOoK_Wf566SxfJkZl6FG63kzoUC7fMbBBsBbecj8kcTWbaNUeWo0enYNYvaTn8pNkCET-NhuDX1h2tvfnXG8LV0-Wv6Pw',
      },
      content: 'started following you.',
      createdAt: '3h ago',
      isRead: true,
    },
  ],

  activeExploreTag: 'All',
  searchQuery: '',
  isCreatePostOpen: false,
  isNotificationsOpen: false,

  toggleLikePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post,
      ),
    })),

  toggleSavePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post,
      ),
    })),

  addCommentToPost: (postId, text) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id !== postId) return post
        const newComment = {
          id: `comment_${Date.now()}`,
          username: state.currentUser.username,
          userAvatar: state.currentUser.avatar,
          text,
          createdAt: 'Just now',
          likesCount: 0,
          isLiked: false,
        }
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...post.comments, newComment],
        }
      }),
    })),

  toggleLikeReel: (reelId) =>
    set((state) => ({
      reels: state.reels.map((reel) =>
        reel.id === reelId
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likesCount: reel.isLiked ? reel.likesCount - 1 : reel.likesCount + 1,
            }
          : reel,
      ),
    })),

  toggleSaveReel: (reelId) =>
    set((state) => ({
      reels: state.reels.map((reel) =>
        reel.id === reelId ? { ...reel, isSaved: !reel.isSaved } : reel,
      ),
    })),

  addCommentToReel: (reelId, text) =>
    set((state) => ({
      reels: state.reels.map((reel) => {
        if (reel.id !== reelId) return reel
        const newComment = {
          id: `reel_c_${Date.now()}`,
          username: state.currentUser.username,
          userAvatar: state.currentUser.avatar,
          text,
          createdAt: 'Just now',
          likesCount: 0,
          isLiked: false,
        }
        return {
          ...reel,
          commentsCount: reel.commentsCount + 1,
          comments: [...reel.comments, newComment],
        }
      }),
    })),

  toggleFollowUser: (username) =>
    set((state) => {
      // Toggle follow in reels
      const updatedReels = state.reels.map((reel) =>
        reel.creator.username === username
          ? {
              ...reel,
              creator: {
                ...reel.creator,
                isFollowing: !reel.creator.isFollowing,
              },
            }
          : reel,
      )
      return { reels: updatedReels }
    }),

  createPost: (postData) =>
    set((state) => {
      const newPost: SocialPost = {
        ...postData,
        id: `post_${Date.now()}`,
        createdAt: 'JUST NOW',
        likesCount: 0,
        commentsCount: 0,
        sharesCount: 0,
        isLiked: false,
        isSaved: false,
        comments: [],
      }
      return {
        posts: [newPost, ...state.posts],
        currentUser: {
          ...state.currentUser,
          postsCount: state.currentUser.postsCount + 1,
        },
        isCreatePostOpen: false,
      }
    }),

  sendMessage: (conversationId, text) =>
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id !== conversationId) return conv
        const newMsg = {
          id: `m_${Date.now()}`,
          senderId: state.currentUser.id,
          text,
          timestamp: 'Just now',
          isRead: true,
          isMine: true,
        }
        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...conv.messages, newMsg],
        }
      }),
    })),

  setActiveExploreTag: (tag) => set({ activeExploreTag: tag }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCreatePostOpen: (open) => set({ isCreatePostOpen: open }),
  setNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
}))
