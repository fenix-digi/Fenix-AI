import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  ExternalLink,
  Flame,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types/assistant';

interface ReelsScrollerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface ReelItem {
  id: string;
  title: string;
  creator: string;
  category: string;
  videoUrl?: string;
  thumbnail: string;
  likes: number;
  tags: string[];
  externalShortUrl: string;
}

const SAMPLE_REELS: ReelItem[] = [
  {
    id: '1',
    title: 'छत्रपती शिवाजी महाराज रायगड किल्ला - अप्रतिम ड्रोन व्ह्यू आणि इतिहास 🚩',
    creator: 'सह्याद्री ट्रॅकर्स',
    category: 'इतिहास व संस्कृती',
    thumbnail: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=600&auto=format&fit=crop&q=80',
    likes: 12400,
    tags: ['#ShivajiMaharaj', '#Raigad', '#Maharashtra', '#Sahyadri'],
    externalShortUrl: 'https://www.youtube.com/hashtag/shorts',
  },
  {
    id: '2',
    title: 'Redmi Note 14 Pro 5G - टॉप 5 हिडन ट्रिक्स आणि कॅमेरा सेटिंग्स 📱',
    creator: 'मराठी टेक गुरु',
    category: 'टेक्नॉलॉजी',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    likes: 8900,
    tags: ['#RedmiNote14', '#Android16', '#TechMarathi', '#SmartPhone'],
    externalShortUrl: 'https://www.youtube.com/hashtag/techshorts',
  },
  {
    id: '3',
    title: 'कांद्यावरील करपा व डाऊनी रोगावर रामबाण उपाय - बळीराजा शेती सल्ला 🌾',
    creator: 'कृषी क्रांती',
    category: 'शेती व बळीराजा',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    likes: 15300,
    tags: ['#Kisan', '#Shetkari', '#AgriTech', '#MaharashtraFarming'],
    externalShortUrl: 'https://www.youtube.com/hashtag/farming',
  },
  {
    id: '4',
    title: 'सकाळची सुरुवात करा या ३ सकारात्मक विचारांनी - प्रेरणादायी सुविचार ✨',
    creator: 'जीवन संजीवनी',
    category: 'प्रेरणादायी',
    thumbnail: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=600&auto=format&fit=crop&q=80',
    likes: 21000,
    tags: ['#Suvichar', '#Motivation', '#MarathiQuotes'],
    externalShortUrl: 'https://www.instagram.com/reels/',
  },
];

export const ReelsScrollerModal: React.FC<ReelsScrollerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentReel = SAMPLE_REELS[currentIndex];
  const isLiked = likedReels[currentReel.id];

  const handleNext = () => {
    if (currentIndex < SAMPLE_REELS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(SAMPLE_REELS.length - 1);
    }
  };

  const toggleLike = (id: string) => {
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenInstagram = () => {
    window.open('https://www.instagram.com/reels/', '_blank');
  };

  const handleOpenYouTubeShorts = () => {
    window.open('https://www.youtube.com/shorts', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm h-[88vh] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between text-white drop-shadow-md">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-400">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>ट्रेन्डिंग रील्स ({currentIndex + 1}/{SAMPLE_REELS.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Reel Card */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          <img
            src={currentReel.thumbnail}
            alt={currentReel.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

          {/* Right Floating Actions (Like, Share, YouTube, Instagram) */}
          <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center space-y-4">
            {/* Like */}
            <button
              onClick={() => toggleLike(currentReel.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`p-3 rounded-full backdrop-blur-md transition ${
                  isLiked
                    ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">
                {currentReel.likes + (isLiked ? 1 : 0)}
              </span>
            </button>

            {/* Open in YouTube Shorts */}
            <button
              onClick={handleOpenYouTubeShorts}
              className="flex flex-col items-center cursor-pointer"
              title="YouTube Shorts मध्ये उघडा"
            >
              <div className="p-3 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white shadow-md">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">Shorts</span>
            </button>

            {/* Open in Instagram Reels */}
            <button
              onClick={handleOpenInstagram}
              className="flex flex-col items-center cursor-pointer"
              title="Instagram Reels मध्ये उघडा"
            >
              <div className="p-3 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white shadow-md">
                <ExternalLink className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">Instagram</span>
            </button>
          </div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-4 left-4 right-16 z-20 text-white space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                @{currentReel.creator}
              </span>
              <span className="text-[10px] text-slate-300">{currentReel.category}</span>
            </div>
            <h4 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
              {currentReel.title}
            </h4>
            <div className="flex flex-wrap gap-1 text-[11px] text-amber-300">
              {currentReel.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Nav Buttons */}
        <div className="h-12 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-4 shrink-0">
          <button
            onClick={handlePrev}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer active:scale-95"
          >
            <ChevronUp className="w-4 h-4" />
            <span>मागील रील</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold cursor-pointer active:scale-95 shadow-md shadow-amber-500/20"
          >
            <span>पुढील रील</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
