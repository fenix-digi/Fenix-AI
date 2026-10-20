import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Pin,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Sparkles,
  Settings,
  Sun,
  Moon,
  ChevronRight,
  PenTool,
  GraduationCap,
  Sprout,
  Code2,
  HeartHandshake,
  Smartphone,
  Sliders,
  Wand2,
  Play,
  FileText,
  Phone,
  Flame,
  MessageCircle,
  Shield,
  Zap,
} from 'lucide-react';
import { Conversation, Language, Persona } from '../types/assistant';
import { UI_STRINGS, BRAND_CONFIG } from '../data/translations';
import { PERSONAS } from '../data/personas';
import { PWAInstallButton } from './PWAInstallButton';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: (personaId?: string) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onTogglePin: (id: string) => void;
  selectedPersona: Persona;
  onSelectPersona: (persona: Persona) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onOpenDeviceHub: () => void;
  onOpenPhotoEnhancer: () => void;
  onOpenImageGenerator: () => void;
  onOpenReels: () => void;
  onOpenSmartTyping: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onTogglePin,
  selectedPersona,
  onSelectPersona,
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  onOpenSettings,
  isOpen,
  onCloseMobile,
  onOpenDeviceHub,
  onOpenPhotoEnhancer,
  onOpenImageGenerator,
  onOpenReels,
  onOpenSmartTyping,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showPersonasModal, setShowPersonasModal] = useState(false);

  const t = UI_STRINGS[language];

  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'PenTool':
        return <PenTool className="w-4 h-4 text-emerald-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'Sprout':
        return <Sprout className="w-4 h-4 text-lime-400" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-cyan-300" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedConversations = filteredConversations.filter((c) => c.isPinned);
  const recentConversations = filteredConversations.filter((c) => !c.isPinned);

  const startEditing = (conv: Conversation) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const saveEditing = (id: string) => {
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 sm:w-80 flex flex-col bg-slate-950 border-r border-cyan-500/20 text-slate-100 transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-slate-900/40 relative">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-cyan-500 shadow-lg shadow-orange-500/25 ring-2 ring-cyan-400/50">
              <Flame className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-slate-950"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="font-extrabold text-base tracking-wider bg-gradient-to-r from-white via-cyan-200 to-amber-300 bg-clip-text text-transparent">
                  {BRAND_CONFIG.aiName}
                </h1>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  CYBER AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold truncate max-w-[160px]">
                {BRAND_CONFIG.company}
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fenix Digital & Thar Mobile Official Info Card */}
        <div className="p-3">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 p-3 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{BRAND_CONFIG.storeName}</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                ऑफिशियल
              </span>
            </div>

            <div className="text-xs font-bold text-slate-100 mb-2">
              {BRAND_CONFIG.company}
            </div>

            {/* Helpline Buttons */}
            <div className="space-y-1.5">
              {BRAND_CONFIG.phones.map((phone, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-slate-950/70 px-2.5 py-1.5 rounded-xl border border-slate-800">
                  <span className="font-mono text-slate-300 text-[11px]">📞 {phone}</span>
                  <div className="flex items-center space-x-1">
                    <a
                      href={`tel:${phone}`}
                      className="p-1 rounded bg-blue-600/80 hover:bg-blue-500 text-white transition"
                      title="Call"
                    >
                      <Phone className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=91${phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded bg-emerald-600/80 hover:bg-emerald-500 text-white transition"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: New Chat */}
        <div className="px-3 pb-2 space-y-2">
          <button
            onClick={() => onNewConversation(selectedPersona.id)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.newChat}</span>
          </button>

          {/* Quick Hub Trigger in Sidebar */}
          <button
            onClick={() => {
              onOpenDeviceHub();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>डिव्हाइस व मोबाईल हब</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              ऑटोमेशन
            </span>
          </button>
        </div>

        {/* Futuristic Quick Tools Strip */}
        <div className="px-3 pb-2 grid grid-cols-2 gap-1.5">
          <button
            onClick={() => {
              onOpenPhotoEnhancer();
              onCloseMobile();
            }}
            className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition cursor-pointer"
          >
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-300">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>फोटो एन्हान्स</span>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenImageGenerator();
              onCloseMobile();
            }}
            className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition cursor-pointer"
          >
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-purple-300">
              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
              <span>इमेज निर्मिती</span>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenReels();
              onCloseMobile();
            }}
            className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition cursor-pointer"
          >
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-pink-300">
              <Play className="w-3.5 h-3.5 text-pink-400" />
              <span>रील्स स्क्रोलर</span>
            </div>
          </button>

          <button
            onClick={() => {
              onOpenSmartTyping();
              onCloseMobile();
            }}
            className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition cursor-pointer"
          >
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-cyan-300">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>स्मार्ट टायपिंग</span>
            </div>
          </button>
        </div>

        {/* Active Persona Banner / Selector */}
        <div className="px-3 pb-2">
          <button
            onClick={() => setShowPersonasModal(!showPersonasModal)}
            className="w-full text-left p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="p-2 rounded-lg bg-slate-800">
                {getPersonaIcon(selectedPersona.icon)}
              </div>
              <div className="truncate">
                <div className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                  {selectedPersona.badge[language]}
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {selectedPersona.name[language]}
                </div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-white transition-transform ${showPersonasModal ? 'rotate-90' : ''}`} />
          </button>

          {/* Quick Persona Dropdown List */}
          {showPersonasModal && (
            <div className="mt-2 space-y-1 p-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-2xl max-h-56 overflow-y-auto">
              {PERSONAS.map((p) => {
                const isSelected = p.id === selectedPersona.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPersona(p);
                      setShowPersonasModal(false);
                    }}
                    className={`w-full text-left flex items-center space-x-2.5 p-2 rounded-lg transition text-xs ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {getPersonaIcon(p.icon)}
                    <div className="truncate">
                      <div className="truncate">{p.name[language]}</div>
                      <div className="text-[10px] text-slate-400 truncate">{p.title[language]}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Conversations */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchChats}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-4 py-1">
          {pinnedConversations.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                <Pin className="w-3 h-3 text-cyan-400" />
                <span>{t.pinChat}</span>
              </div>
              <div className="space-y-1 mt-1">
                {pinnedConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={conv.id === activeConversationId}
                    isEditing={editingId === conv.id}
                    editTitle={editTitle}
                    onSelect={() => onSelectConversation(conv.id)}
                    onStartEdit={() => startEditing(conv)}
                    onSaveEdit={() => saveEditing(conv.id)}
                    onCancelEdit={() => setEditingId(null)}
                    onChangeEditTitle={setEditTitle}
                    onTogglePin={() => onTogglePin(conv.id)}
                    onDelete={() => onDeleteConversation(conv.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <MessageSquare className="w-3 h-3 text-slate-400" />
              <span>संभाषण इतिहास</span>
            </div>
            <div className="space-y-1 mt-1">
              {recentConversations.length === 0 && pinnedConversations.length === 0 ? (
                <div className="px-3 py-6 text-center text-xs text-slate-500">
                  {t.emptyHistory}
                </div>
              ) : (
                recentConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={conv.id === activeConversationId}
                    isEditing={editingId === conv.id}
                    editTitle={editTitle}
                    onSelect={() => onSelectConversation(conv.id)}
                    onStartEdit={() => startEditing(conv)}
                    onSaveEdit={() => saveEditing(conv.id)}
                    onCancelEdit={() => setEditingId(null)}
                    onChangeEditTitle={setEditTitle}
                    onTogglePin={() => onTogglePin(conv.id)}
                    onDelete={() => onDeleteConversation(conv.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer controls: In-app PWA install, Language Switcher, Theme, Settings */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 space-y-2">
          {/* PWA install button in Sidebar */}
          <PWAInstallButton language={language} variant="sidebar" />

          {/* Language selector chips */}
          <div className="flex items-center justify-between bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(['mr', 'en', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  language === lang
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onToggleTheme}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-900 transition cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{t.light}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span>{t.dark}</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-900 transition cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>{t.settings}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  isEditing: boolean;
  editTitle: string;
  onSelect: () => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onChangeEditTitle: (val: string) => void;
  onTogglePin: () => void;
  onDelete: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  isEditing,
  editTitle,
  onSelect,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onChangeEditTitle,
  onTogglePin,
  onDelete,
}) => {
  if (isEditing) {
    return (
      <div className="flex items-center space-x-1 p-1.5 bg-slate-900 rounded-lg border border-cyan-500/60">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => onChangeEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSaveEdit();
            if (e.key === 'Escape') onCancelEdit();
          }}
          autoFocus
          className="flex-1 bg-transparent text-xs text-white px-1.5 py-0.5 focus:outline-none"
        />
        <button
          onClick={onSaveEdit}
          className="p-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onCancelEdit}
          className="p-1 text-slate-400 hover:text-slate-300 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between p-2 rounded-xl text-xs transition cursor-pointer ${
        isActive
          ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-medium'
          : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
      }`}
    >
      <div className="flex items-center space-x-2 truncate pr-2">
        {conversation.isPinned ? (
          <Pin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        ) : (
          <MessageSquare className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 shrink-0" />
        )}
        <span className="truncate">{conversation.title || 'नवीन संभाषण'}</span>
      </div>

      <div className="hidden group-hover:flex items-center space-x-1 shrink-0 bg-slate-900/90 rounded-md px-1 py-0.5 shadow-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          title={conversation.isPinned ? 'Unpin' : 'Pin'}
          className="p-1 text-slate-400 hover:text-cyan-400 transition"
        >
          <Pin className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartEdit();
          }}
          title="Rename"
          className="p-1 text-slate-400 hover:text-white transition"
        >
          <Edit2 className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('हे संभाषण हटवायचे आहे का?')) {
              onDelete();
            }
          }}
          title="Delete"
          className="p-1 text-slate-400 hover:text-rose-400 transition"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
