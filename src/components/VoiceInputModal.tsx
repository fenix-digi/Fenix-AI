import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  X,
  Send,
  Upload,
  Loader2,
  Volume2,
  FileAudio,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types/assistant';
import { UI_STRINGS } from '../data/translations';
import { createSpeechRecognizer, isSpeechRecognitionSupported } from '../utils/speech';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSendTranscript: (text: string) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  language,
  onSendTranscript,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [isTranscribingFile, setIsTranscribingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = UI_STRINGS[selectedLang];

  useEffect(() => {
    setSelectedLang(language);
  }, [language]);

  // Clean up on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopRecording();
      setTranscript('');
      setErrorMessage(null);
    } else {
      // Start recording automatically when opened
      startRecording();
    }
    return () => {
      stopRecording();
    };
  }, [isOpen, selectedLang]);

  const startRecording = () => {
    setErrorMessage(null);
    if (!isSpeechRecognitionSupported()) {
      setErrorMessage('या ब्राउझरमध्ये स्पीच रेकग्निशन समर्थित नाही. कृपया क्रोम किंवा एज वापरा किंवा ऑडिओ फाईल अपलोड करा.');
      return;
    }

    try {
      const recognizer = createSpeechRecognizer(
        selectedLang,
        (text, isFinal) => {
          setTranscript((prev) => (isFinal ? `${prev} ${text}`.trim() : `${prev} ${text}`.trim()));
        },
        (error) => {
          if (error === 'no-speech') {
            // Keep listening
            return;
          }
          setErrorMessage(`आवाज ओळखण्यात त्रुटी: ${error}`);
          setIsRecording(false);
        },
        () => {
          // If ended unexpectedly while isRecording, restart or reset
          setIsRecording(false);
        }
      );

      if (recognizer) {
        recognizer.start();
        recognitionRef.current = recognizer;
        setIsRecording(true);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('मायक्रोफोन सुरू करता आला नाही. कृपया परवानगी तपासा.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSend = () => {
    if (!transcript.trim()) return;
    onSendTranscript(transcript.trim());
    onClose();
  };

  // Upload audio file and transcribe via Gemini 3.5 Transcribe
  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsTranscribingFile(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = (reader.result as string).split(',')[1];
        const res = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioData: base64Data,
            mimeType: file.type || 'audio/webm',
            prompt: `Transcribe this audio precisely. Language may be ${selectedLang === 'mr' ? 'Marathi' : selectedLang === 'hi' ? 'Hindi' : 'English'}. Keep Devanagari script for Marathi/Hindi.`,
          }),
        });

        const data = await res.json();
        if (data.transcription) {
          setTranscript(data.transcription);
        } else {
          setErrorMessage('ऑडिओ भाषांतर अयशस्वी झाले.');
        }
      } catch (err: any) {
        console.error(err);
        setErrorMessage('फाईल पाठवताना त्रुटी आली.');
      } finally {
        setIsTranscribingFile(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-6 text-white shadow-2xl overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{t.voiceInput}</h3>
              <p className="text-xs text-slate-400">
                {isRecording ? t.listening : 'मायक्रोफोन बंद आहे'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language selector tabs */}
        <div className="my-4 flex items-center justify-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {(['mr', 'hi', 'en'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setSelectedLang(l);
                stopRecording();
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                selectedLang === l
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l === 'mr' ? 'मराठी' : l === 'hi' ? 'हिंदी' : 'English'}
            </button>
          ))}
        </div>

        {/* Central Waveform & Pulse Button */}
        <div className="my-6 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            {isRecording && (
              <>
                <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
                <div className="absolute -inset-3 rounded-full border-2 border-amber-500/40 animate-pulse" />
              </>
            )}
            <button
              onClick={handleToggleRecord}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white scale-105 shadow-rose-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600'
              }`}
            >
              {isRecording ? (
                <Mic className="w-8 h-8 animate-bounce" />
              ) : (
                <MicOff className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Sound bars animation */}
          {isRecording && (
            <div className="flex items-center space-x-1.5 h-6">
              {[40, 75, 100, 60, 90, 45, 80, 55, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-amber-400 rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Transcript Box */}
        <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-3.5 min-h-[90px] max-h-40 overflow-y-auto">
          {transcript ? (
            <p className="text-sm text-slate-100 whitespace-pre-wrap leading-relaxed">
              {transcript}
            </p>
          ) : (
            <p className="text-xs text-slate-500 italic text-center pt-5">
              {isRecording
                ? 'काहीही बोला... तुमचा आवाज येथे मजकूरात रूपांतरित होईल.'
                : 'मायक्रोफोन सुरू करण्यासाठी वरील बटण दाबा.'}
            </p>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        {/* Or Upload Audio File */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleAudioFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isTranscribingFile}
            className="flex items-center space-x-1 text-slate-400 hover:text-amber-400 transition cursor-pointer"
          >
            {isTranscribingFile ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>ऑडिओ ट्रान्सक्राइब होत आहे...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                <span>ऑडिओ फाईल अपलोड करा</span>
              </>
            )}
          </button>

          {transcript && (
            <button
              onClick={() => setTranscript('')}
              className="text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              साफ करा
            </button>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSend}
            disabled={!transcript.trim()}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer ${
              transcript.trim()
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 active:scale-95'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>मित्र AI ला पाठवा</span>
          </button>
        </div>
      </div>
    </div>
  );
};
