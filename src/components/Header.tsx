import React, { useState } from 'react';
import {
  Menu,
  Globe,
  Share2,
  Download,
  Printer,
  Sparkles,
  ChevronDown,
  Sun,
  Moon,
  Settings,
  Smartphone,
  Sliders,
  Wand2,
  Phone,
  Flame,
  Radio,
  MessageCircle,
} from 'lucide-react';
import { Conversation, Language, Persona } from '../types/assistant';
import { UI_STRINGS, BRAND_CONFIG } from '../data/translations';
import { PERSONAS } from '../data/personas';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onToggleSidebar: () => void;
  selectedPersona: Persona;
  onSelectPersona: (persona: Persona) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  enableSearch: boolean;
  onToggleSearch: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  activeConversation: Conversation | null;
  onOpenDeviceHub: () => void;
  onOpenPhotoEnhancer: () => void;
  onOpenImageGenerator: () => void;
  onOpenReels: () => void;
  onOpenSmartTyping: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  selectedPersona,
  onSelectPersona,
  language,
  onLanguageChange,
  enableSearch,
  onToggleSearch,
  theme,
  onToggleTheme,
  onOpenSettings,
  activeConversation,
  onOpenDeviceHub,
  onOpenPhotoEnhancer,
  onOpenImageGenerator,
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const t = UI_STRINGS[language];

  const handleExportMarkdown = () => {
    if (!activeConversation) return;
    const content = activeConversation.messages
      .map((m) => `### ${m.role === 'user' ? 'वापरकर्ता' : 'Fenix AI'} (${m.timestamp})\n\n${m.text}\n`)
      .join('\n---\n\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fenix-ai-${activeConversation.title || 'chat'}.md`;
    a.click();
    setShowExportMenu(false);
  };

  const handleExportText = () => {
    if (!activeConversation) return;
    const content = activeConversation.messages
      .map((m) => `[${m.timestamp}] ${m.role === 'user' ? 'User' : 'Fenix AI'}:\n${m.text}\n`)
      .join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fenix-ai-${activeConversation.title || 'chat'}.txt`;
    a.click();
    setShowExportMenu(false);
  };

  const handlePrint = () => {
    window.print();
    setShowExportMenu(false);
  };

  return (
    <header className="h-16 px-3 sm:px-5 border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-md flex items-center justify-between z-20 shrink-0 text-white relative shadow-lg shadow-cyan-950/30">
      {/* Top subtle futuristic glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-amber-400 opacity-80" />

      {/* Left section: Toggle & Persona */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 transition cursor-pointer border border-slate-700/60"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Fenix AI Futuristic Logo & Branding */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-cyan-500 shadow-md shadow-orange-500/30 ring-2 ring-cyan-400/40">
            <Flame className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-wider bg-gradient-to-r from-white via-cyan-200 to-amber-300 bg-clip-text text-transparent">
                {BRAND_CONFIG.aiName}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                v4.0 HUD
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium truncate max-w-[210px]">
              {BRAND_CONFIG.company} • {BRAND_CONFIG.storeName}
            </div>
          </div>
        </div>

        {/* Persona quick select button */}
        <div className="relative">
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 transition cursor-pointer text-left shadow-xs"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200 truncate max-w-[100px] sm:max-w-[140px]">
              {selectedPersona.name[language]}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Persona Dropdown */}
          {showPersonaMenu && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl p-2 z-50">
              <div className="px-2.5 py-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
                <span>{t.selectPersona}</span>
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                {PERSONAS.map((p) => {
                  const isSelected = p.id === selectedPersona.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPersona(p);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex flex-col cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-500/40'
                          : 'hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span>{p.name[language]}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                          {p.badge[language]}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {p.title[language]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right section: Contact Thar Mobile / Fenix Digital, Device Hub, PWA Install, Language, Theme */}
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        {/* Thar Mobile & Fenix Helpline Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setShowContactDropdown(!showContactDropdown)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-cyan-500/15 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer transition shadow-xs"
            title="Thar Mobile & Fenix Digital Services Contact"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span className="hidden md:inline">Thar Mobile</span>
            <span className="md:hidden">कॉल</span>
            <ChevronDown className="w-3 h-3 text-amber-400" />
          </button>

          {/* Contact Popover with Direct Call & WhatsApp to both numbers */}
          {showContactDropdown && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl p-3 z-50 animate-scale-up">
              <div className="pb-2 border-b border-slate-800 mb-2">
                <div className="text-xs font-extrabold text-amber-300 flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{BRAND_CONFIG.company}</span>
                </div>
                <div className="text-[11px] text-cyan-400 font-semibold">
                  {BRAND_CONFIG.storeName} • हेल्पलाईन
                </div>
              </div>

              <div className="space-y-2">
                {BRAND_CONFIG.phones.map((phone, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] text-slate-400">मोबाईल नंबर {idx + 1}</div>
                      <div className="text-xs font-mono font-bold text-white tracking-wider">
                        +91 {phone}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <a
                        href={`tel:${phone}`}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center"
                        title="थेट कॉल करा"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(
                          'नमस्कार Fenix Digital Services / Thar Mobile, मला आपल्या सेवांविषयी अधिक माहिती हवी आहे.'
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center"
                        title="WhatsApp वर बोला"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 text-[10px] text-center text-slate-400">
                मोबाईल विक्री, सर्व्हिसिंग, डिजिटल सेवा व AI सोल्यूशन्स
              </div>
            </div>
          )}
        </div>

        {/* Device Hub button */}
        <button
          onClick={onOpenDeviceHub}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold cursor-pointer transition shadow-xs"
          title="Open Device & Apps Hub"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden lg:inline">डिव्हाइस हब</span>
        </button>

        {/* PWA In-App Install Button */}
        <PWAInstallButton language={language} variant="header" />

        {/* Google Search status indicator */}
        <button
          onClick={onToggleSearch}
          className={`hidden xl:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
            enableSearch
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
          title={t.searchGroundingDesc}
        >
          <Globe className={`w-3.5 h-3.5 ${enableSearch ? 'text-emerald-400 animate-spin-slow' : ''}`} />
          <span>क्वांटम सर्च {enableSearch ? 'चालू' : 'बंद'}</span>
        </button>

        {/* Language selector toggle */}
        <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-cyan-500/30">
          {(['mr', 'en', 'hi'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => onLanguageChange(l)}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                language === l
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l === 'mr' ? 'मराठी' : l === 'hi' ? 'हिंदी' : 'Eng'}
            </button>
          ))}
        </div>

        {/* Export / Download Menu */}
        {activeConversation && activeConversation.messages.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition cursor-pointer border border-slate-700/60"
              title={t.exportChat}
            >
              <Download className="w-4 h-4" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-xl p-1.5 z-50">
                <button
                  onClick={handleExportMarkdown}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition flex items-center space-x-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.exportMarkdown}</span>
                </button>
                <button
                  onClick={handleExportText}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.exportText}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition flex items-center space-x-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.printChat}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition cursor-pointer border border-slate-700/60"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-400" />
          )}
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition cursor-pointer border border-slate-700/60"
          title={t.settings}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
