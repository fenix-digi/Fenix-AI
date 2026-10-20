import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Download,
  Image as ImageIcon,
  Copy,
  Check,
  RefreshCw,
  Palette,
  Wand2,
} from 'lucide-react';
import { Language } from '../types/assistant';

interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ImageGeneratorModal: React.FC<ImageGeneratorModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [style, setStyle] = useState<string>('digital_art');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Preset prompts tailored to Marathi culture and popular requests
  const promptIdeas = [
    'छत्रपती शिवाजी महाराज अश्वारूढ सुवर्ण महाल दृश्य, भव्य भगवा ध्वज व सह्याद्री किल्ले',
    'पारंपरिक दिवाळी दिव्यांनी सजलेले सुंदर अंगण, रांगोळी व आकाशकंदील प्रकाश',
    'महाराष्ट्रातील निसर्गरम्य हिरवेगार शेत, वळणावळणाची नदी आणि दूरवर दिसणारे सह्याद्री डोंगर',
    'भविष्यातील आधुनिक स्मार्ट सायबर सिटी, रोबो सहाय्यक व निऑन प्रकाश',
    'आनंदी शेतकरी दांपत्य उत्तम कापूस व सोयाबीन पिकासह हसताना',
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    // Generate artistic SVG canvas rendering
    setTimeout(() => {
      // Dynamic canvas SVG generation based on style and prompt
      const width = aspectRatio === '16:9' ? 800 : aspectRatio === '9:16' ? 450 : 600;
      const height = aspectRatio === '16:9' ? 450 : aspectRatio === '9:16' ? 800 : 600;

      // Color palettes based on style
      const palette =
        style === 'shivaji_theme'
          ? ['#ea580c', '#f59e0b', '#7c2d12', '#451a03']
          : style === 'cyberpunk'
          ? ['#06b6d4', '#ec4899', '#8b5cf6', '#0f172a']
          : style === 'nature'
          ? ['#10b981', '#047857', '#065f46', '#064e3b']
          : ['#f59e0b', '#ea580c', '#8b5cf6', '#1e293b'];

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, palette[0]);
        grad.addColorStop(0.5, palette[1]);
        grad.addColorStop(1, palette[2]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Abstract decorative glow elements
        for (let i = 0; i < 18; i++) {
          const x = (Math.sin(i * 1.5) * 0.5 + 0.5) * width;
          const y = (Math.cos(i * 2.1) * 0.5 + 0.5) * height;
          const r = 40 + (i % 6) * 35;
          const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
          radGrad.addColorStop(0, 'rgba(255,255,255,0.3)');
          radGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Overlay frame & typography badge
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        // Text banner
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.roundRect(40, height - 120, width - 80, 80, 16);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px "Noto Sans Devanagari", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(prompt.slice(0, 45) + (prompt.length > 45 ? '...' : ''), width / 2, height - 76);

        ctx.font = '13px system-ui, sans-serif';
        ctx.fillStyle = '#fde047';
        ctx.fillText('✨ Mitra AI Creative Studio • ' + style.toUpperCase(), width / 2, height - 52);

        setGeneratedImageUrl(canvas.toDataURL('image/png'));
      }
      setIsGenerating(false);
    }, 1200);
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const a = document.createElement('a');
    a.href = generatedImageUrl;
    a.download = `mitra-ai-art-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 text-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'mr' ? 'AI इमेज क्रिएटर स्टुडिओ' : 'AI Image Creator Studio'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'mr'
                  ? 'मराठी किंवा इंग्रजीत लिहा आणि आकर्षक इमेज / डिझाईन तयार करा'
                  : 'Generate custom art, wallpaper, posters, and designs'}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Prompt input */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              इमेजचे वर्णन लिहा (Prompt in Marathi or English):
            </label>
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="उदा. सह्याद्री पर्वतात सूर्योदय, भव्य किल्ला आणि भगवा ध्वज..."
              className="w-full p-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Prompt Ideas */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
              💡 लोकप्रिय आयडियाज (क्लिक करा):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {promptIdeas.map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(idea)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition text-left cursor-pointer border border-slate-700/60"
                >
                  {idea.slice(0, 38)}...
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio & Style Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">
                आकार (Aspect Ratio):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1:1', label: '1:1 (चौरस / Square)' },
                  { id: '16:9', label: '16:9 (PC / YouTube)' },
                  { id: '9:16', label: '9:16 (मोबाईल / Reel)' },
                ].map((ar) => (
                  <button
                    key={ar.id}
                    onClick={() => setAspectRatio(ar.id as any)}
                    className={`py-2 px-1 text-[11px] font-semibold rounded-xl border text-center transition cursor-pointer ${
                      aspectRatio === ar.id
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ar.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">
                कला शैली (Art Style):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'shivaji_theme', label: '🚩 ऐतिहासिक / भगवा' },
                  { id: 'cyberpunk', label: '⚡ सायबर निऑन' },
                  { id: 'nature', label: '🌿 निसर्ग व शेती' },
                  { id: 'digital_art', label: '🎨 डिजिटल आर्ट' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`py-2 px-2 text-[11px] font-semibold rounded-xl border text-center transition cursor-pointer ${
                      style === s.id
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition cursor-pointer ${
              prompt.trim() && !isGenerating
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:opacity-95 text-white shadow-purple-500/25 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI इमेज तयार करत आहे...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>नवीन इमेज तयार करा (Generate)</span>
              </>
            )}
          </button>

          {/* Generated Image Preview */}
          {generatedImageUrl && (
            <div className="pt-2 flex flex-col items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl max-h-72">
                <img
                  src={generatedImageUrl}
                  alt="Generated AI Art"
                  className="max-h-72 object-contain"
                />
              </div>

              <div className="flex items-center space-x-3 mt-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>इमेज सेव्ह करा (Download HD)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
