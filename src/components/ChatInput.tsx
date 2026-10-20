import React, { useRef, useState, useEffect } from 'react';
import {
  Send,
  Square,
  Mic,
  MicOff,
  Image as ImageIcon,
  Globe,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Attachment, Language } from '../types/assistant';
import { UI_STRINGS } from '../data/translations';

interface ChatInputProps {
  onSendMessage: (text: string, attachments: Attachment[]) => void;
  isGenerating: boolean;
  onStopGenerating: () => void;
  language: Language;
  enableSearch: boolean;
  onToggleSearch: () => void;
  onOpenVoiceModal: () => void;
  isListening?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isGenerating,
  onStopGenerating,
  language,
  enableSearch,
  onToggleSearch,
  onOpenVoiceModal,
  isListening,
}) => {
  const [inputText, setInputText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = UI_STRINGS[language];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputText]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isGenerating) {
      onStopGenerating();
      return;
    }
    if (!inputText.trim() && attachments.length === 0) return;

    onSendMessage(inputText.trim(), attachments);
    setInputText('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Extract base64 without prefix data:...;base64,
        const base64Data = result.split(',')[1] || '';
        const newAttachment: Attachment = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: base64Data,
          previewUrl: file.type.startsWith('image/') ? result : undefined,
        };
        setAttachments((prev) => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
          {attachments.map((att, idx) => (
            <div
              key={idx}
              className="relative group flex items-center space-x-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 shadow-xs"
            >
              {att.previewUrl ? (
                <img
                  src={att.previewUrl}
                  alt={att.name}
                  className="w-8 h-8 rounded object-cover border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <FileText className="w-6 h-6 text-amber-500" />
              )}
              <div className="max-w-[130px] truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                {att.name}
              </div>
              <button
                onClick={() => removeAttachment(idx)}
                className="p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
                title={t.removeAttachment}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input container */}
      <div className="relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 shadow-lg shadow-slate-200/50 dark:shadow-cyan-950/20 focus-within:border-cyan-500 dark:focus-within:border-cyan-400 transition">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={t.inputPlaceholder}
          disabled={isGenerating}
          className="w-full pl-4 pr-12 pt-3.5 pb-12 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none focus:outline-none max-h-48"
        />

        {/* Action bar inside input */}
        <div className="absolute left-3 bottom-2.5 right-3 flex items-center justify-between pointer-events-auto">
          {/* Left tools: Search grounding, Image upload, Voice input */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Attach Image/Doc */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t.uploadImage}
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Voice Input Modal trigger */}
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isListening
                  ? 'bg-rose-500/20 text-rose-500 animate-pulse'
                  : 'text-slate-500 dark:text-slate-400 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={t.voiceInput}
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Google Search Grounding toggle */}
            <button
              type="button"
              onClick={onToggleSearch}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                enableSearch
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={t.searchGroundingDesc}
            >
              <Globe className={`w-3.5 h-3.5 ${enableSearch ? 'text-cyan-400 animate-spin-slow' : ''}`} />
              <span className="hidden sm:inline">क्वांटम सर्च</span>
            </button>
          </div>

          {/* Right submit button */}
          <div className="flex items-center space-x-2">
            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md active:scale-95 transition cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{t.stopGenerating}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={!inputText.trim() && attachments.length === 0}
                className={`p-2.5 rounded-xl transition cursor-pointer shadow-md ${
                  inputText.trim() || attachments.length > 0
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-cyan-500/30 hover:opacity-95 active:scale-95'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 px-2 text-[11px] text-slate-400 dark:text-slate-500">
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>{t.poweredBy}</span>
        </div>
        <div className="hidden sm:inline">
          Shift + Enter = नवीन ओळ • Enter = पाठवा
        </div>
      </div>
    </div>
  );
};
