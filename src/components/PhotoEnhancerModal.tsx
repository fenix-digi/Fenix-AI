import React, { useState, useRef } from 'react';
import {
  X,
  Sliders,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  Sun,
  Contrast,
  Palette,
  Eye,
  Check,
} from 'lucide-react';
import { Language } from '../types/assistant';

interface PhotoEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface FilterSettings {
  brightness: number; // 50 to 150
  contrast: number; // 50 to 150
  saturation: number; // 0 to 200
  sepia: number; // 0 to 100
  grayscale: number; // 0 to 100
  blur: number; // 0 to 10
  warmth: number; // -50 to 50
  sharpen: boolean;
}

const DEFAULT_SETTINGS: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sepia: 0,
  grayscale: 0,
  blur: 0,
  warmth: 0,
  sharpen: false,
};

export const PhotoEnhancerModal: React.FC<PhotoEnhancerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [settings, setSettings] = useState<FilterSettings>(DEFAULT_SETTINGS);
  const [showOriginal, setShowOriginal] = useState(false);
  const [appliedPreset, setAppliedPreset] = useState<string>('normal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setSettings(DEFAULT_SETTINGS);
        setAppliedPreset('normal');
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (preset: string) => {
    setAppliedPreset(preset);
    switch (preset) {
      case 'auto_enhance':
        setSettings({
          brightness: 112,
          contrast: 118,
          saturation: 125,
          sepia: 0,
          grayscale: 0,
          blur: 0,
          warmth: 5,
          sharpen: true,
        });
        break;
      case 'vivid':
        setSettings({
          brightness: 108,
          contrast: 125,
          saturation: 155,
          sepia: 0,
          grayscale: 0,
          blur: 0,
          warmth: 10,
          sharpen: true,
        });
        break;
      case 'warm_glow':
        setSettings({
          brightness: 105,
          contrast: 110,
          saturation: 115,
          sepia: 18,
          grayscale: 0,
          blur: 0,
          warmth: 25,
          sharpen: false,
        });
        break;
      case 'studio_portrait':
        setSettings({
          brightness: 110,
          contrast: 115,
          saturation: 105,
          sepia: 0,
          grayscale: 0,
          blur: 0,
          warmth: 0,
          sharpen: true,
        });
        break;
      case 'vintage_classic':
        setSettings({
          brightness: 95,
          contrast: 115,
          saturation: 80,
          sepia: 40,
          grayscale: 0,
          blur: 0,
          warmth: 15,
          sharpen: false,
        });
        break;
      case 'black_white':
        setSettings({
          brightness: 105,
          contrast: 140,
          saturation: 0,
          sepia: 0,
          grayscale: 100,
          blur: 0,
          warmth: 0,
          sharpen: true,
        });
        break;
      default:
        setSettings(DEFAULT_SETTINGS);
    }
  };

  const getCssFilter = () => {
    if (showOriginal) return 'none';
    return `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) sepia(${settings.sepia}%) grayscale(${settings.grayscale}%) blur(${settings.blur}px) hue-rotate(${settings.warmth}deg)`;
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) sepia(${settings.sepia}%) grayscale(${settings.grayscale}%) blur(${settings.blur}px) hue-rotate(${settings.warmth}deg)`;
      ctx.drawImage(img, 0, 0);

      const link = document.createElement('a');
      link.download = `enhanced-photo-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 text-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'mr' ? 'फोटो एन्हान्स व एडिटर' : 'Photo Enhancer & AI Studio'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'mr'
                  ? 'फोटोची स्पष्टता, रंग, प्रकाश वाढवा आणि एचडी डाऊनलोड करा'
                  : 'Enhance clarity, colors, contrast, and filters'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Image Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] max-h-[460px] bg-slate-950/80 rounded-2xl border border-slate-800 relative overflow-hidden p-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {imageSrc ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={imageSrc}
                  alt="Enhanced Preview"
                  style={{ filter: getCssFilter() }}
                  className="max-h-[420px] max-w-full object-contain rounded-xl shadow-lg transition-all duration-150"
                />

                {/* Compare / Hold button */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                  <button
                    onMouseDown={() => setShowOriginal(true)}
                    onMouseUp={() => setShowOriginal(false)}
                    onTouchStart={() => setShowOriginal(true)}
                    onTouchEnd={() => setShowOriginal(false)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-amber-400 hover:text-white cursor-pointer active:scale-95 shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showOriginal ? 'मूळ फोटो' : 'दाबून ठेवा (मूळ फोटो पहा)'}</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 hover:text-white"
                  >
                    फोटो बदला
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center cursor-pointer p-8 text-center hover:opacity-90 transition"
              >
                <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-400 mb-3 border border-amber-500/20">
                  <Upload className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm text-slate-200 mb-1">
                  गॅलरीतून फोटो निवडा
                </h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Redmi Note 14 मोबाईल किंवा लॅपटॉपमधून फोटो अपलोड करून एचडी एन्हान्स करा
                </p>
              </div>
            )}
          </div>

          {/* Right Column: AI Presets & Adjustment Sliders */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick 1-Click AI Presets */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                १-क्लिक AI फिल्टर्स (Presets)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'auto_enhance', name: '✨ ऑटो एचडी एन्हान्स', color: 'from-amber-500 to-orange-500' },
                  { id: 'vivid', name: '🌈 व्हायब्रंट कलर्स', color: 'from-emerald-500 to-teal-500' },
                  { id: 'studio_portrait', name: '📸 स्टुडिओ पोर्ट्रेट', color: 'from-blue-500 to-indigo-500' },
                  { id: 'warm_glow', name: '🌅 वॉर्म सनसेट ग्लो', color: 'from-orange-500 to-rose-500' },
                  { id: 'vintage_classic', name: '🎞️ विंटेज क्लासिक', color: 'from-purple-500 to-pink-500' },
                  { id: 'black_white', name: '🖤 क्लासिक B&W', color: 'from-slate-600 to-slate-800' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-left border transition cursor-pointer flex items-center justify-between ${
                      appliedPreset === p.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700/70'
                    }`}
                  >
                    <span>{p.name}</span>
                    {appliedPreset === p.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Sliders */}
            <div className="space-y-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/70">
              {/* Brightness */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center space-x-1.5 text-slate-300">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>ब्राइटनेस (प्रकाश)</span>
                  </span>
                  <span className="font-mono text-slate-400">{settings.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="160"
                  value={settings.brightness}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, brightness: parseInt(e.target.value) }))
                  }
                  className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
                />
              </div>

              {/* Contrast */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center space-x-1.5 text-slate-300">
                    <Contrast className="w-3.5 h-3.5 text-sky-400" />
                    <span>कॉन्ट्रास्ट (तपशील)</span>
                  </span>
                  <span className="font-mono text-slate-400">{settings.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="170"
                  value={settings.contrast}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, contrast: parseInt(e.target.value) }))
                  }
                  className="w-full accent-sky-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
                />
              </div>

              {/* Saturation */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center space-x-1.5 text-slate-300">
                    <Palette className="w-3.5 h-3.5 text-emerald-400" />
                    <span>सॅच्युरेशन (रंग गडदपणा)</span>
                  </span>
                  <span className="font-mono text-slate-400">{settings.saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={settings.saturation}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, saturation: parseInt(e.target.value) }))
                  }
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
                />
              </div>

              {/* Warmth */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">उष्णता / वॉर्मथ (Warmth)</span>
                  <span className="font-mono text-slate-400">{settings.warmth}°</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={settings.warmth}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, warmth: parseInt(e.target.value) }))
                  }
                  className="w-full accent-orange-500 cursor-pointer h-1.5 rounded-lg bg-slate-700"
                />
              </div>
            </div>

            {/* Reset button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSettings(DEFAULT_SETTINGS);
                  setAppliedPreset('normal');
                }}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>मूळ स्थितीत आणा (Reset)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            बंद करा
          </button>

          <button
            onClick={handleDownload}
            disabled={!imageSrc}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition cursor-pointer ${
              imageSrc
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>एन्हान्स केलेला फोटो सेव्ह करा</span>
          </button>
        </div>
      </div>
    </div>
  );
};
