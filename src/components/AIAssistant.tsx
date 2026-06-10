import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, User, BrainCircuit } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  isDark: boolean;
}

const CONSTANT_SUGGESTIONS = [
  { text: 'Describe TSquare Services', query: 'What services does TSquare Innovations offer?' },
  { text: 'Request Pricing Estimate', query: 'What is the estimating pricing and timeframe for a tailored Web Application?' },
  { text: 'What is your technology stack?', query: 'Describe the technology stack you use for high-reliability systems.' },
  { text: 'Show Case Studies', query: 'Describe your notable projects and clinical systems case studies.' }
];

export default function AIAssistant({ isDark }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am TSquare Concierge AI. I'm here to provide custom software estimates, outline our high-performance tech stack, and share insights on our custom ERP, POS and healthcare systems. How can I assist your business model today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.warn('Chat error, using fallback:', error);
      // Perfect safe fallback just in case
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I'm experiencing slightly higher network traffic, but I'm still online! TSquare offers custom SaaS structures, healthcare EMR solutions, and secure database connections. Tell me an outline of your system needs!"
          }
        ]);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-45" id="ai-assistant-widget">
      {/* 1. Floating Trigger Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 15 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(20,184,166,0.3)] border cursor-none ${
              isDark
                ? 'bg-black/90 border-teal-500/40 text-teal-400'
                : 'bg-white/95 border-teal-500/30 text-teal-600'
            }`}
          >
            <BrainCircuit size={24} className="animate-pulse" />
            
            {/* Unread dot indicator */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 text-[9px] text-white flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Interactive Glass Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] rounded-2xl border shadow-2xl overflow-hidden flex flex-col z-50 ${
              isDark
                ? 'bg-[#000000]/95 border-teal-500/30 text-white'
                : 'bg-white/95 border-teal-500/20 text-slate-800'
            } backdrop-blur-xl`}
          >
            {/* Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDark ? 'border-white/10 bg-gradient-to-r from-teal-950/20 to-black' : 'border-teal-500/10 bg-teal-50/20'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 flex items-center justify-center border border-teal-500/20 bg-teal-500/10 rounded-lg">
                  <Bot size={18} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold flex items-center space-x-1.5 leading-none">
                    <span>TSQUARE AI</span>
                    <Sparkles size={11} className="text-teal-400 animate-pulse" />
                  </h3>
                  <span className="text-[9px] font-mono tracking-wider opacity-60 flex items-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1 animate-ping" />
                    CONCIERGE AGENT
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-lg border hover:scale-105 transition-all text-gray-400 cursor-none ${
                  isDark ? 'border-white/5 hover:bg-white/5 hover:text-white' : 'border-slate-100 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat message flow window */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Icon tag */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-teal-500 text-white'
                        : isDark
                        ? 'bg-neutral-800 border border-teal-500/20 text-teal-400'
                        : 'bg-teal-50 text-teal-600'
                    }`}>
                      {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                    </div>

                    <div className={`p-3 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? isDark
                          ? 'bg-teal-950/40 border-teal-500/40 text-teal-100 rounded-tr-none'
                          : 'bg-teal-50 border-teal-100 text-slate-900 rounded-tr-none'
                        : isDark
                        ? 'bg-neutral-900/40 border-white/5 text-gray-300 rounded-tl-none'
                        : 'bg-white border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                      isDark ? 'bg-neutral-800 border border-teal-500/20 text-teal-400' : 'bg-teal-50'
                    }`}>
                      <Bot size={13} />
                    </div>
                    <div className={`p-3 rounded-xl border flex items-center space-x-1.5 ${
                      isDark ? 'bg-neutral-900/40 border-white/5' : 'bg-white'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggestions panel */}
            <div className={`px-4 py-2 border-t text-[10px] font-mono tracking-wide ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
              <div className="flex items-center space-x-1 mb-2 opacity-50">
                <Sparkles size={10} />
                <span>SUGGESTED ENQUIRIES</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {CONSTANT_SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug.query)}
                    className={`px-2.5 py-1 rounded-md border text-[10px] font-mono leading-tight flex items-center space-x-1 transition-all hover:scale-102 cursor-none ${
                      isDark
                        ? 'border-white/10 bg-white/5 hover:bg-teal-500/10 hover:border-teal-500/30 text-gray-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-500/20 text-slate-600'
                    }`}
                  >
                    <span>{sug.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className={`p-3 border-t flex items-center space-x-2 ${
                isDark ? 'border-white/10 bg-neutral-950' : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pricing estimation, tech stack..."
                className={`flex-1 text-xs px-3.5 py-2.5 rounded-lg border outline-none font-sans cursor-none ${
                  isDark
                    ? 'border-white/10 bg-black text-white placeholder-gray-500 focus:border-teal-500/50'
                    : 'border-slate-200 bg-white text-slate-900 placeholder-gray-400 focus:border-teal-400'
                }`}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-teal-500 text-white disabled:opacity-40 select-none cursor-none ${
                  inputValue.trim() && !isLoading ? 'hover:scale-105 active:scale-95 shadow-[0_4px_10px_rgba(20,184,166,0.3)]' : ''
                }`}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
