import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Copy,
  Check,
  Share2,
  FileText,
  Sparkles,
  Download,
  Trash2,
} from 'lucide-react';
import { Language } from '../types/assistant';
import { createSpeechRecognizer, isSpeechRecognitionSupported } from '../utils/speech';

interface SmartTypingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SmartTypingModal: React.FC<SmartTypingModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'free' | 'letter' | 'whatsapp' | 'email'>('free');

  const recognitionRef = useRef<any>(null);

  if (!isOpen) return null;

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (!isSpeechRecognitionSupported()) {
        alert('या ब्राउझरमध्ये स्पीच रेकग्निशन समर्थित नाही.');
        return;
      }
      const recognizer = createSpeechRecognizer(
        language,
        (transcript, isFinal) => {
          setText((prev) => (isFinal ? `${prev} ${transcript}`.trim() : prev));
        },
        () => setIsListening(false),
        () => setIsListening(false)
      );
      if (recognizer) {
        recognizer.start();
        recognitionRef.current = recognizer;
        setIsListening(true);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!text.trim()) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typing-document-${Date.now()}.txt`;
    a.click();
  };

  const applyTemplate = (template: 'letter' | 'whatsapp' | 'email') => {
    setSelectedFormat(template);
    if (template === 'letter') {
      setText(
        `प्रति,\nमा. अधिकारी साहेब,\nविषय: ....................................... बाबत.\n\nमहोदय,\nसविनय जयहिंद.\nमी खालीलप्रमाणे नम्र विनंती अर्ज सादर करतो की...\n\nआपला नम्र,\n[नाव/स्वाक्षरी]`
      );
    } else if (template === 'whatsapp') {
      setText(
        `नमस्कार! 🙏\nआशा आहे आपण सर्व कुशल आहात.\n\nमी हा संदेश आपल्याशी संवाद साधण्यासाठी पाठवत आहे...\n\nधन्यवाद!\n- [तुमचे नाव]`
      );
    } else if (template === 'email') {
      setText(
        `विषय: [येथे ईमेलचा विषय लिहा]\n\nआदरणीय महोदय / मॅडम,\n\nमी [तुमचे नाव] या संदर्भात ईमेल करत आहे की...\n\nकृपया यावर योग्य ती कार्यवाही करावी ही नम्र विनंती.\n\nआपला विश्वासू,\n[तुमचे नाव]\n[मोबाईल क्रमांक]`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 text-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'mr' ? 'स्मार्ट व्हॉईस टायपिंग पॅड' : 'Smart Voice Typing Pad'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'mr'
                  ? 'तुम्ही बोला - मित्र AI तुमच्यासाठी जलद मराठी टायपिंग करेल'
                  : 'Speak naturally, auto-type and export to WhatsApp or Docs'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (recognitionRef.current) recognitionRef.current.stop();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Format Templates */}
        <div className="py-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate-400">प्रारूप (Templates):</span>
          <button
            onClick={() => applyTemplate('letter')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            📄 शासकीय / अधिकृत अर्ज
          </button>
          <button
            onClick={() => applyTemplate('whatsapp')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition"
          >
            💬 WhatsApp मेसेज
          </button>
          <button
            onClick={() => applyTemplate('email')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-sky-400 hover:text-sky-300 transition"
          >
            ✉️ अधिकृत ईमेल
          </button>
        </div>

        {/* Text Area */}
        <div className="flex-1 min-h-[220px] relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="येथे बोला किंवा टाइप करा... उदा. शासकीय अर्ज, नोकरीसाठी अर्ज, किंवा मित्राला पाठवायचा मोठा संदेश..."
            className="w-full h-full p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none font-sans leading-relaxed"
          />

          {/* Real-time word count */}
          <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md">
            {text.split(/\s+/).filter(Boolean).length} शब्द
          </div>
        </div>

        {/* Controls Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Mic Toggle Button */}
          <button
            onClick={toggleListening}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md ${
              isListening
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse shadow-rose-500/30'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25'
            }`}
          >
            {isListening ? <Mic className="w-4 h-4 animate-bounce" /> : <MicOff className="w-4 h-4" />}
            <span>{isListening ? 'ऐकत आहे... बोला' : 'माईक सुरू करा (बोलून टाइप करा)'}</span>
          </button>

          {/* Export Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              disabled={!text.trim()}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'कॉपी झाले!' : 'कॉपी करा'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              disabled={!text.trim()}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer disabled:opacity-40 shadow-md shadow-emerald-600/20"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp वर पाठवा</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              disabled={!text.trim()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer disabled:opacity-40"
              title="Download TXT"
            >
              <Download className="w-4 h-4" />
            </button>

            {text && (
              <button
                onClick={() => setText('')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 cursor-pointer"
                title="Clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
