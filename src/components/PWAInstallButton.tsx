import React, { useState } from 'react';
import { Download, Monitor, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types/assistant';

interface PWAInstallButtonProps {
  language: Language;
  variant?: 'header' | 'sidebar' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language,
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  // If already running inside standalone app, show a badge or null
  if (isInstalled) {
    if (variant === 'sidebar') {
      return (
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
          <Check className="w-3.5 h-3.5" />
          <span>इन्स्टॉल केलेले ॲप</span>
        </div>
      );
    }
    return null;
  }

  const isMobile = typeof window !== 'undefined' && /android|iphone|ipad|mobile/i.test(navigator.userAgent);

  const buttonText =
    language === 'mr'
      ? isMobile
        ? 'मोबाईल ॲप इन्स्टॉल'
        : 'PC / ॲप इन्स्टॉल'
      : language === 'hi'
      ? isMobile
        ? 'मोबाइल ऐप इंस्टॉल'
        : 'PC / ऐप इंस्टॉल'
      : isMobile
      ? 'Install Mobile App'
      : 'Install on PC';

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success && isMobile) {
        setShowAndroidGuide(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowAndroidGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-sm ${
          variant === 'sidebar'
            ? 'w-full justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 active:scale-95'
        }`}
        title="Install Mitra AI on Windows 10/11 or Android (Redmi Note 14)"
      >
        {isMobile ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
        <span>{buttonText}</span>
      </button>

      {/* Android / Windows Chrome Installation Guide Modal */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl">
            <button
              onClick={() => setShowAndroidGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">ॲप इन्स्टॉल करा</h3>
                <p className="text-xs text-slate-400">Android (Redmi Note 14) व Windows PC</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
              <p className="font-semibold text-amber-400">मोबाईलवर (Redmi Note 14 / Chrome):</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                <li>ब्राउझरच्या वरील उजव्या कोपऱ्यातील <strong>तीन ठिपक्यांवर (⋮)</strong> क्लिक करा.</li>
                <li><strong>'Install app'</strong> किंवा <strong>'Add to Home screen'</strong> निवडा.</li>
                <li>ॲप तुमच्या मोबाईल स्क्रीनवर इतर ॲप्ससारखे थेट सुरू होईल!</li>
              </ol>

              <p className="font-semibold text-sky-400 pt-2 border-t border-slate-700">Windows PC / Laptop वर:</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                <li>ब्राउझरच्या ॲड्रेस बारमधील उजव्या बाजूला <strong>इन्स्टॉल आयकॉन (⊕)</strong> दाबा.</li>
                <li>'Install' वर क्लिक करा. डेस्कटॉपवर स्वतंत्र खिडकीत ॲप सुरू होईल.</li>
              </ol>
            </div>

            <button
              onClick={() => setShowAndroidGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer"
            >
              समजले
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Guide */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base mb-2">iPhone / iPad वर इन्स्टॉल करा</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              1. Safari मधील <strong>Share</strong> बटण दाबा.<br />
              2. खाली स्क्रोल करून <strong>'Add to Home Screen'</strong> निवडा.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs"
            >
              बंद करा
            </button>
          </div>
        </div>
      )}
    </>
  );
};
