import React from 'react';
import {
  X,
  Settings,
  Volume2,
  Globe,
  Sliders,
  Trash2,
  Check,
  Languages,
} from 'lucide-react';
import { AppSettings, AssistantTone, Language } from '../types/assistant';
import { UI_STRINGS } from '../data/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onClearAllHistory: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onClearAllHistory,
}) => {
  if (!isOpen) return null;

  const t = UI_STRINGS[settings.language];

  const toneOptions: Array<{ id: AssistantTone; label: string; desc: string }> = [
    {
      id: 'friendly',
      label: t.friendly,
      desc: 'सहज, आपुलकीची आणि मैत्रीपूर्ण भाषाशैली',
    },
    {
      id: 'formal',
      label: t.formal,
      desc: 'अधिकृत, शासकीय अर्ज व व्यावसायिक पत्रव्यवहारासाठी',
    },
    {
      id: 'academic',
      label: t.academic,
      desc: 'सविस्तर स्पष्टीकरण, संदर्भ आणि अभ्यास सराव',
    },
    {
      id: 'simple',
      label: t.simple,
      desc: 'कमी शब्दात, थेट आणि सोपे उत्तर',
    },
  ];

  const voiceOptions = [
    { id: 'Kore', label: 'Kore (स्पष्ट व शांत महिला आवाज)' },
    { id: 'Puck', label: 'Puck (उत्साही व स्पष्ट पुरुष आवाज)' },
    { id: 'Zephyr', label: 'Zephyr (मृदू व नैसर्गिक आवाज)' },
    { id: 'Fenrir', label: 'Fenrir (गंभीर व ठाम आवाज)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.settings}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                मित्रा AI ची कार्यपद्धती आणि प्राधान्ये बदला
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-6">
          {/* Language Preference */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              <Languages className="w-4 h-4 text-amber-500" />
              <span>{t.language} (Language)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mr', name: 'मराठी' },
                { id: 'en', name: 'English' },
                { id: 'hi', name: 'हिंदी' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => onUpdateSettings({ language: l.id as Language })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    settings.language === l.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Assistant Tone */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              <span>{t.tone}</span>
            </label>
            <div className="space-y-2">
              {toneOptions.map((opt) => {
                const isSelected = settings.tone === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateSettings({ tone: opt.id })}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 dark:border-amber-400/60'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {opt.desc}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TTS Voice selector */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              <Volume2 className="w-4 h-4 text-amber-500" />
              <span>{t.voiceName} (Gemini 3.8 Flash Lite TTS)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {voiceOptions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => onUpdateSettings({ ttsVoice: v.id as any })}
                  className={`p-2.5 rounded-xl text-left border text-xs transition cursor-pointer ${
                    settings.ttsVoice === v.id
                      ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Grounding Default */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {t.searchGrounding}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.searchGroundingDesc}
                </div>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ enableSearch: !settings.enableSearch })}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.enableSearch ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  settings.enableSearch ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                सर्जनशीलता (Creativity / Temperature)
              </label>
              <span className="text-xs font-mono font-bold text-amber-500">
                {settings.temperature}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => onUpdateSettings({ temperature: parseFloat(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>तथ्यपूर्ण / नेमके (0.1)</span>
              <span>संतुलित (0.7)</span>
              <span>सर्जनशील / रंजक (1.0)</span>
            </div>
          </div>

          {/* Clear History Danger Zone */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                if (window.confirm('सर्व संभाषण इतिहास कायमचा हटवायचा आहे का? ही क्रिया पूर्ववत करता येणार नाही.')) {
                  onClearAllHistory();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.clearAll}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
