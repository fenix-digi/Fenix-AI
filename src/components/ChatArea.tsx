import React, { useRef, useEffect, useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCw,
  ExternalLink,
  ChevronDown,
  User,
  ArrowRight,
  Loader2,
  Flame,
  Phone,
  MessageCircle,
  Zap,
  Cpu,
  Radio,
} from 'lucide-react';
import { Conversation, Language, Message, Persona } from '../types/assistant';
import { MarkdownRenderer } from '../utils/markdownRenderer';
import { UI_STRINGS, BRAND_CONFIG } from '../data/translations';

interface ChatAreaProps {
  conversation: Conversation | null;
  selectedPersona: Persona;
  onSelectPrompt: (promptText: string) => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  language: Language;
  onSpeakMessage: (messageId: string, text: string) => void;
  activeAudioMessageId: string | null;
  isPlayingAudio: boolean;
  onStopAudio: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  conversation,
  selectedPersona,
  onSelectPrompt,
  onRegenerate,
  isGenerating,
  language,
  onSpeakMessage,
  activeAudioMessageId,
  isPlayingAudio,
  onStopAudio,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = UI_STRINGS[language];
  const messages = conversation?.messages || [];

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    scrollToBottom(isGenerating ? 'auto' : 'smooth');
  }, [messages, isGenerating]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 150;
    setShowScrollBottom(isUp);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth relative cyber-grid"
    >
      {/* Empty State / Futuristic Welcome Screen */}
      {messages.length === 0 ? (
        <div className="max-w-3xl mx-auto my-auto flex flex-col items-center justify-center min-h-[72vh] text-center px-4 relative z-10">
          {/* Futuristic Glowing Phoenix Cyber-Avatar */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 via-amber-500 to-orange-600 opacity-40 blur-xl animate-pulse-glow" />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center text-white shadow-2xl border-2 border-cyan-400/60 ring-4 ring-cyan-500/20">
              <Flame className="w-12 h-12 text-amber-400 animate-pulse drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
              <Cpu className="w-6 h-6 text-cyan-400 absolute bottom-2 right-2 opacity-80" />
            </div>

            {/* Futuristic Tech Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950 border border-cyan-400/60 text-[10px] font-mono font-bold text-cyan-300 flex items-center space-x-1.5 shadow-lg whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>FENIX AI • QUANTUM CORE</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 mt-4 text-white">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-amber-300 bg-clip-text text-transparent">
              {BRAND_CONFIG.aiName}
            </span>
          </h2>

          {/* Fenix Digital Services & Thar Mobile Official Banner */}
          <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-xs shadow-md">
            <span className="font-bold text-amber-400 flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{BRAND_CONFIG.company}</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="font-bold text-cyan-300 flex items-center space-x-1">
              <span>{BRAND_CONFIG.storeName}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
            {selectedPersona.description[language]}
          </p>

          {/* Helpline Quick Contact Bar */}
          <div className="mb-8 w-full max-w-md p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between text-xs">
            <div className="text-left">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                हेल्पलाईन / संपर्क
              </div>
              <div className="font-mono font-bold text-white tracking-wide">
                📞 {BRAND_CONFIG.phoneDisplay}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`tel:${BRAND_CONFIG.phones[0]}`}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1 transition shadow-md"
              >
                <Phone className="w-3 h-3" />
                <span>कॉल</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=91${BRAND_CONFIG.phones[0]}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 transition shadow-md"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Starter Prompts Grid */}
          <div className="w-full text-left">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.quickPrompts}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {selectedPersona.name[language]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedPersona.starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(prompt.text[language])}
                  className="group relative p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-cyan-500/25 hover:border-cyan-400 shadow-md transition text-left cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      {prompt.category[language]}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                    {prompt.text[language]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Conversation Message Feed */
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isStreamingThis = msg.isStreaming && isGenerating;
            const isAudioActive = activeAudioMessageId === msg.id && isPlayingAudio;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-900 border border-cyan-400/50 flex items-center justify-center text-amber-400 shadow-md shadow-cyan-500/20 ring-2 ring-cyan-500/30">
                      <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Message Body Bubble */}
                <div
                  className={`relative group max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 transition shadow-md ${
                    isUser
                      ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 text-white rounded-tr-xs border border-cyan-400/30'
                      : 'bg-slate-900/95 border border-cyan-500/25 text-slate-100 rounded-tl-xs shadow-cyan-950/20'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between mb-1.5 text-[11px] opacity-80">
                    <span className="font-bold flex items-center space-x-1">
                      {isUser ? (
                        <span>तुम्ही (User)</span>
                      ) : (
                        <span className="text-cyan-300 font-mono flex items-center space-x-1">
                          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                          <span>FENIX AI</span>
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  {/* Attached images preview */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {msg.attachments.map((att, attIdx) => (
                        <div
                          key={attIdx}
                          className="rounded-xl overflow-hidden border border-cyan-500/30 max-w-xs shadow-md"
                        >
                          {att.previewUrl ? (
                            <img
                              src={att.previewUrl}
                              alt={att.name}
                              className="max-h-56 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="px-3 py-2 bg-slate-950 text-xs font-mono">
                              {att.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Content */}
                  {isUser ? (
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                      {msg.text}
                    </p>
                  ) : (
                    <div>
                      <MarkdownRenderer content={msg.text || (isStreamingThis ? '...' : '')} />

                      {/* Live Streaming Indicator */}
                      {isStreamingThis && (
                        <div className="inline-flex items-center space-x-1.5 mt-2 text-xs font-medium text-cyan-400 font-mono">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Fenix AI प्रक्रिया करत आहे...</span>
                        </div>
                      )}

                      {/* Google Search Sources & Grounding */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-800">
                          <div className="text-xs font-bold text-cyan-400 mb-2 flex items-center space-x-1.5 font-mono">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span>{t.sources}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {msg.sources.map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-cyan-500/10 text-cyan-200 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition"
                              >
                                <span className="truncate max-w-[200px]">{src.title}</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Assistant Actions Toolbar */}
                      {!isStreamingThis && msg.text && (
                        <div className="flex items-center space-x-1 sm:space-x-2 mt-4 pt-2.5 border-t border-slate-800 text-slate-400">
                          {/* TTS / Voice Readout */}
                          <button
                            onClick={() => {
                              if (isAudioActive) {
                                onStopAudio();
                              } else {
                                onSpeakMessage(msg.id, msg.text);
                              }
                            }}
                            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                              isAudioActive
                                ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                                : 'hover:bg-slate-800 hover:text-cyan-300'
                            }`}
                            title={isAudioActive ? 'Stop audio' : t.voiceOutput}
                          >
                            {msg.isAudioLoading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                                <span>ऑडिओ तयार होत आहे...</span>
                              </>
                            ) : isAudioActive ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" />
                                <span>थांबवा</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{t.voiceOutput}</span>
                              </>
                            )}
                          </button>

                          {/* Copy Text */}
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-slate-800 hover:text-cyan-300 transition cursor-pointer"
                            title={t.copyText}
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">{t.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>{t.copyText}</span>
                              </>
                            )}
                          </button>

                          {/* Regenerate Answer */}
                          {index === messages.length - 1 && (
                            <button
                              onClick={onRegenerate}
                              disabled={isGenerating}
                              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-slate-800 hover:text-cyan-300 transition cursor-pointer"
                              title={t.regenerate}
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t.regenerate}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="shrink-0 flex items-start pt-1">
                    <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-300 font-bold text-sm shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Scroll to Bottom button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom('smooth')}
          className="fixed bottom-24 right-8 p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/30 active:scale-95 transition cursor-pointer z-20 flex items-center justify-center"
          title="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
