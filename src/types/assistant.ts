export type Language = 'mr' | 'en' | 'hi';

export interface Attachment {
  name: string;
  type: string;
  size: number;
  base64: string;
  previewUrl?: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  attachments?: Attachment[];
  sources?: GroundingSource[];
  isStreaming?: boolean;
  audioUrl?: string;
  isAudioLoading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  personaId: string;
  messages: Message[];
  isPinned?: boolean;
}

export interface Persona {
  id: string;
  name: Record<Language, string>;
  title: Record<Language, string>;
  badge: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  color: string;
  bgGradient: string;
  systemInstruction: string;
  starterPrompts: Array<{
    text: Record<Language, string>;
    category: Record<Language, string>;
  }>;
}

export type AssistantTone = 'friendly' | 'formal' | 'academic' | 'simple';

export interface AppSettings {
  language: Language;
  enableSearch: boolean;
  tone: AssistantTone;
  ttsVoice: 'Kore' | 'Puck' | 'Zephyr' | 'Charon' | 'Fenrir';
  temperature: number;
  theme: 'dark' | 'light';
}
