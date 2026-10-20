import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Youtube,
  MessageCircle,
  Phone,
  Share2,
  Image as ImageIcon,
  Sliders,
  FileText,
  FolderOpen,
  Play,
  ExternalLink,
  Sparkles,
  Search,
  Check,
  Send,
  MapPin,
  Mail,
  Grid,
  Flame,
  Zap,
} from 'lucide-react';
import { Language } from '../types/assistant';
import { BRAND_CONFIG } from '../data/translations';

interface DeviceControlHubProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenPhotoEnhancer: () => void;
  onOpenImageGenerator: () => void;
  onOpenReels: () => void;
  onOpenSmartTyping: () => void;
}

type TabType = 'apps' | 'youtube' | 'whatsapp' | 'facebook' | 'photosort' | 'contact';

export const DeviceControlHub: React.FC<DeviceControlHubProps> = ({
  isOpen,
  onClose,
  language,
  onOpenPhotoEnhancer,
  onOpenImageGenerator,
  onOpenReels,
  onOpenSmartTyping,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('apps');

  // YouTube state
  const [youtubeQuery, setYoutubeQuery] = useState('मराठी गाणी सुपरहीट');

  // WhatsApp state
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('नमस्कार! Fenix AI कडून संदेश.');

  // Facebook state
  const [fbPostTopic, setFbPostTopic] = useState('Fenix Digital Services & Thar Mobile');
  const [fbPostContent, setFbPostContent] = useState(
    '🚀 "तंत्रज्ञानाची नवी झेप - Fenix Digital Services & Thar Mobile! सर्व स्मार्टफोन, कॉम्प्युटर आणि डिजिटल सोल्यूशन्स एकाच ठिकाणी." संपर्क: 8806767378 / 7719981695. #FenixAI #TharMobile #FenixDigitalServices #MaharashtraTech 📱🔥'
  );
  const [copiedFb, setCopiedFb] = useState(false);

  // Photo Sort state
  const [photoTag, setPhotoTag] = useState<'all' | 'docs' | 'family' | 'bills' | 'farming'>('all');
  const [samplePhotos] = useState([
    { id: '1', title: 'आधार कार्ड व पॅन कार्ड स्कॅन', tag: 'docs', date: '2026-10-18', size: '1.2 MB' },
    { id: '2', title: 'दिवाळी कौटुंबिक स्नेहसंमेलन', tag: 'family', date: '2026-10-15', size: '3.4 MB' },
    { id: '3', title: 'महावितरण वीज बिल पावती', tag: 'bills', date: '2026-10-12', size: '850 KB' },
    { id: '4', title: 'सोयाबीन पीक व ठिबक सिंचन', tag: 'farming', date: '2026-10-10', size: '2.8 MB' },
    { id: '5', title: '7/12 उतारा व फेरफार नोंद', tag: 'docs', date: '2026-10-05', size: '1.5 MB' },
  ]);

  if (!isOpen) return null;

  // YouTube launcher
  const handleLaunchYouTube = (customQuery?: string) => {
    const q = encodeURIComponent(customQuery || youtubeQuery);
    window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank');
  };

  // WhatsApp launcher
  const handleLaunchWhatsApp = () => {
    let cleanPhone = whatsappPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;
    const text = encodeURIComponent(whatsappMessage);
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  };

  // Direct Phone Call
  const handleDirectCall = (phoneNum?: string) => {
    const target = phoneNum || whatsappPhone;
    const cleanPhone = target.replace(/\D/g, '');
    if (!cleanPhone) {
      alert('कृपया कॉलिंगसाठी फोन नंबर टाका.');
      return;
    }
    window.location.href = `tel:${cleanPhone}`;
  };

  // Facebook Sharer
  const handleShareFacebook = () => {
    navigator.clipboard.writeText(fbPostContent);
    setCopiedFb(true);
    setTimeout(() => setCopiedFb(false), 2000);
    window.open('https://www.facebook.com/', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-slate-950 border-2 border-cyan-500/40 p-5 sm:p-6 text-white shadow-2xl flex flex-col overflow-hidden cyber-grid">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-cyan-500 text-white shadow-md ring-2 ring-cyan-400/40">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-wider bg-gradient-to-r from-white via-cyan-200 to-amber-300 bg-clip-text text-transparent">
                  {BRAND_CONFIG.aiName} • सायबर कंट्रोल डेक
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Android 16 & Windows
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {BRAND_CONFIG.company} • {BRAND_CONFIG.storeName} (📞 {BRAND_CONFIG.phoneDisplay})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 py-3 border-b border-cyan-500/20 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'apps', label: '⚡ सर्व ॲप्स', icon: Grid },
            { id: 'contact', label: '📞 Thar Mobile संपर्क', icon: Phone },
            { id: 'youtube', label: '▶️ YouTube गाणी', icon: Youtube },
            { id: 'whatsapp', label: '💬 WhatsApp व कॉल', icon: MessageCircle },
            { id: 'facebook', label: '📘 Facebook पोस्ट', icon: Share2 },
            { id: 'photosort', label: '🗂️ फोटो सॉर्टर', icon: FolderOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* 1. All Apps Launcher Grid */}
          {activeTab === 'apps' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Thar Mobile Contact */}
                <button
                  onClick={() => setActiveTab('contact')}
                  className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 hover:to-cyan-900/60 border border-cyan-500/40 transition flex flex-col items-center text-center cursor-pointer group shadow-md"
                >
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition mb-2">
                    <Phone className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-amber-300">Thar Mobile</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">8806767378 / 7719981695</span>
                </button>

                {/* YouTube */}
                <button
                  onClick={() => setActiveTab('youtube')}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-500 group-hover:scale-110 transition mb-2">
                    <Youtube className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-white">YouTube गाणी</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">सर्च व डायरेक्ट प्ले</span>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition mb-2">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-white">WhatsApp & कॉल</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">मेसेज व थेट डायल</span>
                </button>

                {/* Reels */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenReels();
                  }}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-pink-500/10 border border-slate-800 hover:border-pink-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white group-hover:scale-110 transition mb-2">
                    <Play className="w-7 h-7 fill-white" />
                  </div>
                  <span className="font-bold text-xs text-white">रील्स स्क्रोलर</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Shorts व Reels प्लेयर</span>
                </button>

                {/* Photo Enhancer */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenPhotoEnhancer();
                  }}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition mb-2">
                    <Sliders className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-white">फोटो एन्हान्सर</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">एचडी क्लॅरिटी व फिल्टर्स</span>
                </button>

                {/* AI Image Creator */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenImageGenerator();
                  }}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-purple-500/10 border border-slate-800 hover:border-purple-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition mb-2">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-white">इमेज निर्मिती</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">AI आर्ट व पोस्टर्स</span>
                </button>

                {/* Smart Voice Typing */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenSmartTyping();
                  }}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-sky-500/10 border border-slate-800 hover:border-sky-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 group-hover:scale-110 transition mb-2">
                    <FileText className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-white">स्मार्ट टायपिंग</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">बोलून ऑटो-टाईप करा</span>
                </button>

                {/* Facebook Post */}
                <button
                  onClick={() => setActiveTab('facebook')}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-blue-500/10 border border-slate-800 hover:border-blue-500/50 transition flex flex-col items-center text-center cursor-pointer group shadow-sm"
                >
                  <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition mb-2">
                    <Share2 className="w-7 h-7" />
                  </div>
                  <span className="font-bold text-xs text-white">फेसबुक पोस्ट</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">AI मसुदा व शेअर</span>
                </button>
              </div>

              {/* Direct Quick Launch Bar */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30">
                <div className="text-xs font-bold text-cyan-300 mb-2">
                  ⚡ १-क्लिक डायरेक्ट मोबाईल ॲप लाँचर्स (Redmi Note 14 व Windows):
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-400 border border-slate-700"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube उघडा</span>
                  </a>
                  <a
                    href="https://web.whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp उघडा</span>
                  </a>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-blue-400 border border-slate-700"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>गुगल मॅप्स</span>
                  </a>
                  <a
                    href="mailto:"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 border border-slate-700"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>ईमेल (Gmail)</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 2. Thar Mobile & Fenix Digital Services Contact Center */}
          {activeTab === 'contact' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border-2 border-cyan-500/40 text-center relative overflow-hidden">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/20 text-amber-400 mb-2">
                  <Flame className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-lg font-extrabold text-white">
                  {BRAND_CONFIG.company}
                </h4>
                <p className="text-xs font-bold text-cyan-300 mb-1">
                  {BRAND_CONFIG.storeName} • अधिकृत संपर्क केंद्र
                </p>
                <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                  स्मार्टफोन विक्री, सर्व्हिसिंग, कॉम्प्युटर सोल्यूशन्स, सॉफ्टवेअर व AI डिजिटल सेवा
                </p>
              </div>

              <div className="space-y-3">
                {BRAND_CONFIG.phones.map((phone, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-semibold">
                          मोबाईल नंबर {idx + 1} ({BRAND_CONFIG.storeName})
                        </div>
                        <div className="text-sm font-mono font-bold text-white tracking-wider">
                          +91 {phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDirectCall(phone)}
                        className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer transition active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>कॉल करा</span>
                      </button>
                      <a
                        href={`https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(
                          'नमस्कार Fenix Digital Services / Thar Mobile, मला आपल्या सेवांविषयी माहिती हवी आहे.'
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. YouTube Songs & Player */}
          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={youtubeQuery}
                    onChange={(e) => setYoutubeQuery(e.target.value)}
                    placeholder="गाण्याचे नाव किंवा गायक... उदा. 'अजय अतुल गाणी', 'शिवराय पोवाडे'"
                    className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <button
                  onClick={() => handleLaunchYouTube()}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>YouTube वर चालवा</span>
                </button>
              </div>

              {/* Popular Song Categories */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  🎶 Fenix लोकप्रिय गाण्यांची प्लेलिस्ट (१-क्लिक प्ले):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { title: '🚩 छत्रपती शिवाजी महाराज पोवाडे व शौर्यगीते', q: 'छत्रपती शिवाजी महाराज पोवाडा' },
                    { title: '🎼 अजय-अतुल मराठी ब्लॉकबस्टर हिट्स', q: 'Ajay Atul Superhit Marathi Songs' },
                    { title: '🪕 विठ्ठल भक्तीगीते व अभंग (प्रल्हाद शिंदे)', q: 'Vitthal Bhaktigeet Marathi' },
                    { title: '☕ शांत मराठी लो-फाय म्युझिक (अभ्यास व विश्रांती)', q: 'Marathi Lofi Songs Chill Beats' },
                    { title: '🔥 नवीन गाजलेली मराठी गाणी 2026', q: 'Latest Trending Marathi Songs' },
                    { title: '📻 जुनी अजरामर मराठी गाणी (बाबुजी, लतादीदी)', q: 'Old Classic Marathi Songs' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setYoutubeQuery(item.q);
                        handleLaunchYouTube(item.q);
                      }}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/50 text-left transition flex items-center justify-between cursor-pointer group"
                    >
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {item.title}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. WhatsApp & Direct Phone Call */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  मोबाईल क्रमांक (Phone Number):
                </label>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-bold text-cyan-400">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="उदा. 8806767378 किंवा संपर्क नंबर..."
                    className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleDirectCall()}
                    className="flex items-center space-x-1 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-md"
                    title="Redmi Note 14 किंवा PC वरून थेट कॉल करा"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल करा</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  WhatsApp मेसेज मजकूर:
                </label>
                <textarea
                  rows={3}
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Quick Preset Messages */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  'मी मिटिंगमध्ये आहे, थोड्या वेळाने कॉल करतो.',
                  'नमस्कार! कृपया आवश्यक कागदपत्रे पाठवा.',
                  'वाढदिवसाच्या हार्दिक शुभेच्छा! 🎂💐',
                  'Fenix Digital Services / Thar Mobile संपर्क.',
                ].map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => setWhatsappMessage(msg)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-slate-800"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLaunchWhatsApp}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp उघडा आणि मेसेज पाठवा</span>
              </button>
            </div>
          )}

          {/* 5. Facebook Post Generator & Sharer */}
          {activeTab === 'facebook' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  पोस्टचा विषय (Topic):
                </label>
                <input
                  type="text"
                  value={fbPostTopic}
                  onChange={(e) => setFbPostTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  तयार झालेली Facebook पोस्ट:
                </label>
                <textarea
                  rows={4}
                  value={fbPostContent}
                  onChange={(e) => setFbPostContent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white leading-relaxed"
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setFbPostContent(
                      `🚀 Fenix Digital Services & Thar Mobile - मोबाईल विक्री, रिपेअरिंग आणि आधुनिक AI सेवांसाठी आजच संपर्क साधा! मोबाईल: 8806767378 / 7719981695. #TharMobile #FenixDigitalServices`
                    );
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-[11px] text-cyan-300 hover:text-white border border-slate-800"
                >
                  🏢 Thar Mobile प्रोमो
                </button>
                <button
                  onClick={() => {
                    setFbPostContent(
                      `🚩 "जगाला हेवा वाटेल असा इतिहास घडवणारे आमचे राजे छत्रपती शिवाजी महाराज!" मानाचा मुजरा! 🚩 #ShivajiMaharaj #JayShivray #Maharashtra`
                    );
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-[11px] text-amber-300 hover:text-white border border-slate-800"
                >
                  🚩 शिवजयंती पोस्ट
                </button>
              </div>

              <button
                onClick={handleShareFacebook}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                {copiedFb ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedFb ? 'मजकूर कॉपी झाला! Facebook उघडत आहे...' : 'Facebook उघडा व पोस्ट करा'}</span>
              </button>
            </div>
          )}

          {/* 6. Photo Sorter & Organizer */}
          {activeTab === 'photosort' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300">
                  📁 गॅलरी फोटो वर्गीकरण (Photo Sort Categories):
                </div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  {samplePhotos.length} फोटो वर्गीकृत
                </div>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'सर्व फोटो' },
                  { id: 'docs', label: '📄 कागदपत्रे / ID' },
                  { id: 'family', label: '👨‍👩‍👧 कौटुंबिक' },
                  { id: 'bills', label: '🧾 बिले व पावत्या' },
                  { id: 'farming', label: '🌾 शेती व पिके' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPhotoTag(cat.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      photoTag === cat.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {samplePhotos
                  .filter((p) => photoTag === 'all' || p.tag === photoTag)
                  .map((photo) => (
                    <div
                      key={photo.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{photo.title}</div>
                          <div className="text-[10px] text-slate-400">
                            तारीख: {photo.date} • आकार: {photo.size}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenPhotoEnhancer();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-[11px] font-semibold transition"
                      >
                        एन्हान्स करा
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer border border-slate-800"
          >
            बंद करा
          </button>
        </div>
      </div>
    </div>
  );
};
