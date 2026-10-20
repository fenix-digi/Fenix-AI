import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import { VoiceInputModal } from './components/VoiceInputModal';
import { SettingsModal } from './components/SettingsModal';
import { DeviceControlHub } from './components/DeviceControlHub';
import { PhotoEnhancerModal } from './components/PhotoEnhancerModal';
import { ImageGeneratorModal } from './components/ImageGeneratorModal';
import { ReelsScrollerModal } from './components/ReelsScrollerModal';
import { SmartTypingModal } from './components/SmartTypingModal';
import { FloatingDashboard } from './components/FloatingDashboard';
import { PERSONAS } from './data/personas';
import {
  AppSettings,
  Attachment,
  Conversation,
  GroundingSource,
  Language,
  Message,
  Persona,
} from './types/assistant';
import { speakTextNative, stopSpeaking } from './utils/speech';

const STORAGE_CONVERSATIONS_KEY = 'mitra_ai_conversations_v2';
const STORAGE_SETTINGS_KEY = 'mitra_ai_settings_v2';

const DEFAULT_SETTINGS: AppSettings = {
  language: 'mr',
  enableSearch: true,
  tone: 'friendly',
  ttsVoice: 'Kore',
  temperature: 0.7,
  theme: 'dark',
};

export default function App() {
  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Failed to parse settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Conversations State
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONVERSATIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse conversations:', e);
    }
    return [];
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_CONVERSATIONS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed[0].id;
        }
      } catch (e) {}
      return null;
    }
  );

  const [selectedPersona, setSelectedPersona] = useState<Persona>(() => PERSONAS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Deep Automation Modals State
  const [isDeviceHubOpen, setIsDeviceHubOpen] = useState(false);
  const [isPhotoEnhancerOpen, setIsPhotoEnhancerOpen] = useState(false);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [isReelsOpen, setIsReelsOpen] = useState(false);
  const [isSmartTypingOpen, setIsSmartTypingOpen] = useState(false);

  // Audio Playback State
  const [activeAudioMessageId, setActiveAudioMessageId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Streaming Abort Controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync theme with document element
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Persist conversations
  useEffect(() => {
    localStorage.setItem(STORAGE_CONVERSATIONS_KEY, JSON.stringify(conversations));
  }, [conversations]);

  // Sync selected persona with active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  useEffect(() => {
    if (activeConversation) {
      const match = PERSONAS.find((p) => p.id === activeConversation.personaId);
      if (match) setSelectedPersona(match);
    }
  }, [activeConversationId]);

  // Helper: Create new conversation
  const handleNewConversation = (personaId?: string) => {
    const persona = PERSONAS.find((p) => p.id === personaId) || selectedPersona;
    const newConv: Conversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: 'नवीन संभाषण',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      personaId: persona.id,
      messages: [],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setSelectedPersona(persona);
    setIsSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (activeConversationId === id) {
        setActiveConversationId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle, updatedAt: Date.now() } : c))
    );
  };

  const handleTogglePin = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  // Helper: Send message and stream Gemini response
  const handleSendMessage = async (text: string, attachments: Attachment[] = []) => {
    if (!text && attachments.length === 0) return;

    // Detect user automated intent commands
    const lower = text.toLowerCase();
    if (lower.includes('youtube') && (lower.includes('गाणे') || lower.includes('गाणी') || lower.includes('प्ले') || lower.includes('play'))) {
      setIsDeviceHubOpen(true);
    } else if (lower.includes('whatsapp') || lower.includes('व्हाट्सअॅप')) {
      setIsDeviceHubOpen(true);
    } else if (lower.includes('फोटो एन्हान्स') || lower.includes('enhance') || lower.includes('फोटो क्लिअर')) {
      setIsPhotoEnhancerOpen(true);
    } else if (lower.includes('इमेज तयार') || lower.includes('फोटो तयार') || lower.includes('generate image')) {
      setIsImageGeneratorOpen(true);
    } else if (lower.includes('रील') || lower.includes('reel') || lower.includes('shorts')) {
      setIsReelsOpen(true);
    } else if (lower.includes('टायपिंग') || lower.includes('टाइप कर') || lower.includes('typing')) {
      setIsSmartTypingOpen(true);
    }

    let targetConv = activeConversation;
    let convId = activeConversationId;

    // Create a conversation if none exists
    if (!targetConv || !convId) {
      const newConv: Conversation = {
        id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: text.slice(0, 30) || 'नवीन संभाषण',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        personaId: selectedPersona.id,
        messages: [],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      targetConv = newConv;
      convId = newConv.id;
    }

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      text,
      timestamp: timeString,
      attachments,
    };

    const modelMessageId = `msg_m_${Date.now() + 1}`;
    const initialModelMessage: Message = {
      id: modelMessageId,
      role: 'model',
      text: '',
      timestamp: timeString,
      isStreaming: true,
    };

    // Update conversation title if this is the first message
    const shouldUpdateTitle = targetConv.messages.length === 0;
    const newTitle = shouldUpdateTitle ? (text.slice(0, 36) || 'नवीन संभाषण') : targetConv.title;

    // Append user message & empty model message placeholder
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              title: newTitle,
              updatedAt: Date.now(),
              messages: [...c.messages, userMessage, initialModelMessage],
            }
          : c
      )
    );

    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      // Build conversation history for Gemini API
      const historyContents = (targetConv.messages || []).map((msg) => {
        const parts: any[] = [];
        if (msg.attachments && msg.attachments.length > 0) {
          msg.attachments.forEach((att) => {
            parts.push({
              inlineData: {
                mimeType: att.type,
                data: att.base64,
              },
            });
          });
        }
        if (msg.text) {
          parts.push({ text: msg.text });
        }
        return {
          role: msg.role === 'user' ? 'user' : 'model',
          parts,
        };
      });

      // Add current user message
      const currentParts: any[] = [];
      if (attachments && attachments.length > 0) {
        attachments.forEach((att) => {
          currentParts.push({
            inlineData: {
              mimeType: att.type,
              data: att.base64,
            },
          });
        });
      }
      if (text) {
        currentParts.push({ text });
      }

      historyContents.push({
        role: 'user',
        parts: currentParts,
      });

      // Construct system instruction tailored to selected persona and tone
      const toneGuideline =
        settings.tone === 'formal'
          ? 'Use formal, respectful, and official language (शासकीय व अधिकृत भाषाशैली).'
          : settings.tone === 'academic'
          ? 'Provide in-depth academic explanations with formulas, points, and relevant context.'
          : settings.tone === 'simple'
          ? 'Keep the answer concise, straightforward, and easy to understand for any layperson.'
          : 'Be warm, friendly, encouraging, and natural.';

      const systemInstruction = `${selectedPersona.systemInstruction}

[Device & Automation Capabilities]: You are 'Fenix AI' (फिनिक्स AI), created and powered by 'Fenix Digital Services' and 'Thar Mobile' (Helpline & Contacts: 8806767378 / 7719981695). You are connected to the user's mobile (Android 16 / Redmi Note 14) and PC (Windows 10/11) through Fenix AI's Cyber Device Hub. You can guide them to open YouTube and play songs, send WhatsApp messages, make phone calls, post to Facebook, generate AI images, enhance photos, scroll reels, and voice-type. Whenever appropriate, mention Fenix Digital Services and Thar Mobile (8806767378 / 7719981695).

[Language Preference]: The user preference is ${
        settings.language === 'mr'
          ? 'Marathi (मराठी). You must give your entire response in clear, elegant, grammatically sound Devanagari Marathi unless specifically asked for another language.'
          : settings.language === 'hi'
          ? 'Hindi (हिंदी).'
          : 'English.'
      }
[Tone]: ${toneGuideline}`;

      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: historyContents,
          systemInstruction,
          enableSearch: settings.enableSearch,
          temperature: settings.temperature,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        throw new Error(`Server returned error status ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No readable stream available');

      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let accumulatedSources: GroundingSource[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkStr = decoder.decode(value, { stream: true });
        const lines = chunkStr.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const dataContent = line.slice(6).trim();
          if (dataContent === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataContent);
            if (parsed.text) {
              accumulatedText += parsed.text;
            }
            if (parsed.sources && Array.isArray(parsed.sources)) {
              accumulatedSources = [...accumulatedSources, ...parsed.sources];
            }
            if (parsed.error) {
              accumulatedText += `\n\n*(त्रुटी: ${parsed.error})*`;
            }

            // Update model message in state progressively
            setConversations((prev) =>
              prev.map((c) =>
                c.id === convId
                  ? {
                      ...c,
                      messages: c.messages.map((m) =>
                        m.id === modelMessageId
                          ? {
                              ...m,
                              text: accumulatedText,
                              sources:
                                accumulatedSources.length > 0
                                  ? accumulatedSources
                                  : undefined,
                              isStreaming: true,
                            }
                          : m
                      ),
                    }
                  : c
              )
            );
          } catch (e) {
            // non-json line
          }
        }
      }

      // Finalize model message
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === modelMessageId
                    ? {
                        ...m,
                        text: accumulatedText || 'मला तुमच्या प्रश्नाचे उत्तर देता आले नाही. कृपया पुन्हा विचारा.',
                        isStreaming: false,
                      }
                    : m
                ),
              }
            : c
        )
      );
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream generation was stopped by user.');
      } else {
        console.error('Chat error:', err);
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === modelMessageId
                      ? {
                          ...m,
                          text:
                            m.text ||
                            'क्षमस्व! नेटवर्क किंवा AI सेवा संपर्क करण्यात त्रुटी आली. कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.',
                          isStreaming: false,
                        }
                      : m
                  ),
                }
              : c
          )
        );
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (!activeConversation || activeConversation.messages.length < 2) return;
    const lastUserMsgIndex = [...activeConversation.messages]
      .reverse()
      .findIndex((m) => m.role === 'user');

    if (lastUserMsgIndex === -1) return;
    const actualIndex = activeConversation.messages.length - 1 - lastUserMsgIndex;
    const lastUserMsg = activeConversation.messages[actualIndex];

    // Remove the latest model message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              messages: c.messages.slice(0, actualIndex + 1),
            }
          : c
      )
    );

    handleSendMessage(lastUserMsg.text, lastUserMsg.attachments || []);
  };

  // Voice Speech Output (TTS)
  const handleSpeakMessage = async (messageId: string, text: string) => {
    handleStopAudio();

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId ? { ...m, isAudioLoading: true } : m
              ),
            }
          : c
      )
    );

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceName: settings.ttsVoice,
        }),
      });

      const data = await res.json();
      if (data.audio) {
        const audioSrc = `data:${data.mimeType || 'audio/wav'};base64,${data.audio}`;
        const audio = new Audio(audioSrc);
        currentAudioRef.current = audio;

        audio.onplay = () => {
          setIsPlayingAudio(true);
          setActiveAudioMessageId(messageId);
        };

        audio.onended = () => {
          setIsPlayingAudio(false);
          setActiveAudioMessageId(null);
        };

        audio.onerror = () => {
          console.warn('Audio playback error, falling back to native TTS');
          fallbackNativeTTS(messageId, text);
        };

        await audio.play();
      } else {
        fallbackNativeTTS(messageId, text);
      }
    } catch (err) {
      console.warn('TTS server request failed, falling back to native TTS', err);
      fallbackNativeTTS(messageId, text);
    } finally {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === messageId ? { ...m, isAudioLoading: false } : m
                ),
              }
            : c
        )
      );
    }
  };

  const fallbackNativeTTS = (messageId: string, text: string) => {
    setIsPlayingAudio(true);
    setActiveAudioMessageId(messageId);
    speakTextNative(text, settings.language, () => {
      setIsPlayingAudio(false);
      setActiveAudioMessageId(null);
    });
  };

  const handleStopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    stopSpeaking();
    setIsPlayingAudio(false);
    setActiveAudioMessageId(null);
  };

  const handleClearAllHistory = () => {
    setConversations([]);
    setActiveConversationId(null);
    localStorage.removeItem(STORAGE_CONVERSATIONS_KEY);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 antialiased select-text">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setIsSidebarOpen(false);
        }}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onTogglePin={handleTogglePin}
        selectedPersona={selectedPersona}
        onSelectPersona={(persona) => {
          setSelectedPersona(persona);
          if (activeConversation) {
            setConversations((prev) =>
              prev.map((c) =>
                c.id === activeConversation.id ? { ...c, personaId: persona.id } : c
              )
            );
          }
        }}
        language={settings.language}
        onLanguageChange={(lang) => setSettings((s) => ({ ...s, language: lang }))}
        theme={settings.theme}
        onToggleTheme={() =>
          setSettings((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))
        }
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onOpenDeviceHub={() => setIsDeviceHubOpen(true)}
        onOpenPhotoEnhancer={() => setIsPhotoEnhancerOpen(true)}
        onOpenImageGenerator={() => setIsImageGeneratorOpen(true)}
        onOpenReels={() => setIsReelsOpen(true)}
        onOpenSmartTyping={() => setIsSmartTypingOpen(true)}
      />

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white dark:bg-slate-900/60 relative">
        {/* Header */}
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          selectedPersona={selectedPersona}
          onSelectPersona={(persona) => {
            setSelectedPersona(persona);
            if (activeConversation) {
              setConversations((prev) =>
                prev.map((c) =>
                  c.id === activeConversation.id ? { ...c, personaId: persona.id } : c
                )
              );
            }
          }}
          language={settings.language}
          onLanguageChange={(lang) => setSettings((s) => ({ ...s, language: lang }))}
          enableSearch={settings.enableSearch}
          onToggleSearch={() =>
            setSettings((s) => ({ ...s, enableSearch: !s.enableSearch }))
          }
          theme={settings.theme}
          onToggleTheme={() =>
            setSettings((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))
          }
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          activeConversation={activeConversation}
          onOpenDeviceHub={() => setIsDeviceHubOpen(true)}
          onOpenPhotoEnhancer={() => setIsPhotoEnhancerOpen(true)}
          onOpenImageGenerator={() => setIsImageGeneratorOpen(true)}
          onOpenReels={() => setIsReelsOpen(true)}
          onOpenSmartTyping={() => setIsSmartTypingOpen(true)}
        />

        {/* Chat Messages Area */}
        <ChatArea
          conversation={activeConversation}
          selectedPersona={selectedPersona}
          onSelectPrompt={(text) => handleSendMessage(text)}
          onRegenerate={handleRegenerate}
          isGenerating={isGenerating}
          language={settings.language}
          onSpeakMessage={handleSpeakMessage}
          activeAudioMessageId={activeAudioMessageId}
          isPlayingAudio={isPlayingAudio}
          onStopAudio={handleStopAudio}
        />

        {/* Floating Quick-Action Dashboard (One-Tap Triggers with Fenix Digital Services Branding) */}
        <FloatingDashboard
          language={settings.language}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onOpenDeviceHub={() => setIsDeviceHubOpen(true)}
          onOpenPhotoEnhancer={() => setIsPhotoEnhancerOpen(true)}
          onOpenImageGenerator={() => setIsImageGeneratorOpen(true)}
          onOpenSmartTyping={() => setIsSmartTypingOpen(true)}
          onSelectPersona={(personaId) => {
            const match = PERSONAS.find((p) => p.id === personaId);
            if (match) setSelectedPersona(match);
          }}
          onSendMessage={(text) => handleSendMessage(text)}
        />

        {/* Input Bar */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          onStopGenerating={handleStopGenerating}
          language={settings.language}
          enableSearch={settings.enableSearch}
          onToggleSearch={() =>
            setSettings((s) => ({ ...s, enableSearch: !s.enableSearch }))
          }
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        />
      </div>

      {/* Deep Device Automation Hub Modal */}
      <DeviceControlHub
        isOpen={isDeviceHubOpen}
        onClose={() => setIsDeviceHubOpen(false)}
        language={settings.language}
        onOpenPhotoEnhancer={() => setIsPhotoEnhancerOpen(true)}
        onOpenImageGenerator={() => setIsImageGeneratorOpen(true)}
        onOpenReels={() => setIsReelsOpen(true)}
        onOpenSmartTyping={() => setIsSmartTypingOpen(true)}
      />

      {/* Photo Enhancer Studio */}
      <PhotoEnhancerModal
        isOpen={isPhotoEnhancerOpen}
        onClose={() => setIsPhotoEnhancerOpen(false)}
        language={settings.language}
      />

      {/* AI Image Creator Studio */}
      <ImageGeneratorModal
        isOpen={isImageGeneratorOpen}
        onClose={() => setIsImageGeneratorOpen(false)}
        language={settings.language}
      />

      {/* Reels & Shorts Scroller */}
      <ReelsScrollerModal
        isOpen={isReelsOpen}
        onClose={() => setIsReelsOpen(false)}
        language={settings.language}
      />

      {/* Smart Voice Typing Pad */}
      <SmartTypingModal
        isOpen={isSmartTypingOpen}
        onClose={() => setIsSmartTypingOpen(false)}
        language={settings.language}
      />

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={settings.language}
        onSendTranscript={(text) => handleSendMessage(text)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings((s) => ({ ...s, ...newVals }))}
        onClearAllHistory={handleClearAllHistory}
      />
    </div>
  );
}
