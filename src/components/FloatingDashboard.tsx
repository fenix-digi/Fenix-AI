import React, { useState } from 'react';
import {
  Flame,
  Mail,
  Settings,
  Sparkles,
  Smartphone,
  Phone,
  MessageCircle,
  Sliders,
  Wand2,
  Youtube,
  ChevronDown,
  ChevronUp,
  FileText,
  X,
  Zap,
  Globe,
  Radio,
} from 'lucide-react';
import { Language, Persona } from '../types/assistant';
import { BRAND_CONFIG, UI_STRINGS } from '../data/translations';

interface FloatingDashboardProps {
  language: Language;
  onOpenSettings: () => void;
  onOpenDeviceHub: () => void;
  onOpenPhotoEnhancer: () => void;
  onOpenImageGenerator: () => void;
  onOpenSmartTyping: () => void;
  onSelectPersona: (personaId: string) => void;
  onSendMessage: (text: string) => void;
}

export const FloatingDashboard: React.FC<FloatingDashboardProps> = ({
  language,
  onOpenSettings,
  onOpenDeviceHub,
  onOpenPhotoEnhancer,
  onOpenImageGenerator,
  onOpenSmartTyping,
  onSelectPersona,
  onSendMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'triggers' | 'contacts'>('triggers');

  const t = UI_STRINGS[language];

  const handleFenixAICore = () => {
    onSelectPersona('general');
    onSendMessage('नमस्कार Fenix AI! Fenix Digital Services आणि Thar Mobile कडून मला आज काय मदत मिळू शकते?');
    setIsOpen(false);
  };

  const handleComposeEmail = () => {
    onOpenSmartTyping();
    setIsOpen(false);
  };

  const handleComposeEmailPrompt = () => {
    onSendMessage('मला एका अधिकृत कामासाठी व्यावसायिक ईमेलचा मसुदा तयार करून द्या. विषय आणि प्रमुख मुद्दे विचारून घ्या.');
    setIsOpen(false);
  };

  const handleDraftOfficialLetter = () => {
    onSendMessage('शासकीय कार्यालयासाठी किंवा नगरपरिषदेसाठी अधिकृत अर्जाचा अचूक मराठी मसुदा लिहून द्या.');
    setIsOpen(false);
  };

  return (
    <div className="absolute right-4 bottom-24 z-30 flex flex-col items-end pointer-events-auto select-none">
      {/* Expanded Holographic Quick-Action Dashboard */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-3xl bg-slate-950/95 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl p-4 mb-3 text-white animate-scale-up border-glow relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Futuristic Header with Fenix Digital Services Branding */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-cyan-500 shadow-md ring-1 ring-cyan-400">
                <Flame className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-extrabold text-xs tracking-wider bg-gradient-to-r from-white via-cyan-200 to-amber-300 bg-clip-text text-transparent">
                    {BRAND_CONFIG.company}
                  </h4>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    HUD
                  </span>
                </div>
                <p className="text-[10px] text-amber-400 font-semibold truncate">
                  {BRAND_CONFIG.storeName} • {BRAND_CONFIG.phoneDisplay}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Minimize Dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick-Action Grid of One-Tap Triggers */}
          <div className="py-3 space-y-3 relative z-10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 flex items-center justify-between">
              <span>वन-टॅप ॲक्शन्स (One-Tap Triggers)</span>
              <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Trigger 1: Fenix AI Core */}
              <button
                onClick={handleFenixAICore}
                className="p-2.5 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 hover:to-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 transition flex flex-col items-center text-center cursor-pointer group shadow-sm active:scale-95"
              >
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition mb-1">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-white">Fenix AI</span>
                <span className="text-[9px] text-cyan-300">कोर असिस्टंट</span>
              </button>

              {/* Trigger 2: Compose Email */}
              <button
                onClick={handleComposeEmail}
                className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm active:scale-95"
              >
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition mb-1">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-white">Compose Email</span>
                <span className="text-[9px] text-slate-400">टायपिंग व ड्राफ्ट</span>
              </button>

              {/* Trigger 3: Open Settings */}
              <button
                onClick={() => {
                  onOpenSettings();
                  setIsOpen(false);
                }}
                className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-600 transition flex flex-col items-center text-center cursor-pointer group shadow-sm active:scale-95"
              >
                <div className="p-2 rounded-xl bg-slate-800 text-slate-300 group-hover:scale-110 transition mb-1">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-white">Settings</span>
                <span className="text-[9px] text-slate-400">प्रणाली सेटिंग्स</span>
              </button>

              {/* Trigger 4: YouTube Songs */}
              <button
                onClick={() => {
                  onOpenDeviceHub();
                  setIsOpen(false);
                }}
                className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-rose-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm active:scale-95"
              >
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 group-hover:scale-110 transition mb-1">
                  <Youtube className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">YouTube गाणी</span>
                <span className="text-[9px] text-slate-400">ऑटो-प्लेअर</span>
              </button>

              {/* Trigger 5: Photo Enhancer */}
              <button
                onClick={() => {
                  onOpenPhotoEnhancer();
                  setIsOpen(false);
                }}
                className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm active:scale-95"
              >
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition mb-1">
                  <Sliders className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">फोटो एन्हान्स</span>
                <span className="text-[9px] text-slate-400">एचडी फिल्टर्स</span>
              </button>

              {/* Trigger 6: AI Image Creator */}
              <button
                onClick={() => {
                  onOpenImageGenerator();
                  setIsOpen(false);
                }}
                className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm active:scale-95"
              >
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition mb-1">
                  <Wand2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">इमेज निर्मिती</span>
                <span className="text-[9px] text-slate-400">AI डिझाईन</span>
              </button>
            </div>

            {/* Quick 1-Tap Text Prompts */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>त्वरित चॅट कमांड्स (1-Tap Send):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={handleComposeEmailPrompt}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-[10px] font-medium text-cyan-300 border border-cyan-500/30 transition text-left cursor-pointer"
                >
                  ✉️ ईमेल ड्राफ्ट लिहा
                </button>
                <button
                  onClick={handleDraftOfficialLetter}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-[10px] font-medium text-amber-300 border border-amber-500/30 transition text-left cursor-pointer"
                >
                  📄 शासकीय अर्ज मसुदा
                </button>
                <button
                  onClick={() => {
                    onSendMessage('माझ्या मोबाईलमधील फोटो व स्टोरेज सुरक्षित ठेवण्यासाठी सर्वोत्तम उपाय काय आहेत?');
                    setIsOpen(false);
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-emerald-500/20 text-[10px] font-medium text-emerald-300 border border-emerald-500/30 transition text-left cursor-pointer"
                >
                  📱 मोबाईल सुरक्षा टिप्स
                </button>
              </div>
            </div>

            {/* Helpline Call & WhatsApp Action Bar */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs">
              <div>
                <div className="text-[9px] font-mono text-cyan-400">
                  {BRAND_CONFIG.storeName} हेल्पलाईन
                </div>
                <div className="font-mono font-bold text-white text-[11px]">
                  📞 8806767378
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <a
                  href={`tel:${BRAND_CONFIG.phones[0]}`}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center space-x-1 transition shadow-sm"
                >
                  <Phone className="w-3 h-3" />
                  <span>कॉल</span>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=91${BRAND_CONFIG.phones[0]}&text=${encodeURIComponent(
                    'नमस्कार Fenix Digital Services / Thar Mobile, मला आपल्या सेवांविषयी अधिक माहिती हवी आहे.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center space-x-1 transition shadow-sm"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button (Always visible inside chat area) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 py-2.5 px-3.5 rounded-full bg-slate-950 hover:bg-slate-900 border-2 border-cyan-400 text-white shadow-xl shadow-cyan-950/60 transition-all duration-200 cursor-pointer active:scale-95 ring-2 ring-cyan-500/20"
        title="Fenix AI Quick Action Dashboard"
      >
        <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 via-orange-600 to-cyan-500 shadow-md">
          <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
        </div>

        <div className="flex flex-col text-left">
          <span className="font-extrabold text-xs tracking-wider bg-gradient-to-r from-white via-cyan-200 to-amber-300 bg-clip-text text-transparent flex items-center space-x-1">
            <span>Fenix Dashboard</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-1" />
          </span>
          <span className="text-[9px] text-slate-400 font-mono hidden sm:inline">
            Fenix Digital Services
          </span>
        </div>

        <div className="p-1 rounded-full bg-slate-800 text-cyan-300 group-hover:text-white transition">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </div>
      </button>
    </div>
  );
};
