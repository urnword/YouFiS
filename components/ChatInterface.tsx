
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const hasStarted = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', parts: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = [...messages, userMsg];
    const response = await getGeminiResponse(history);

    setMessages(prev => [...prev, { role: 'model', parts: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      {!hasStarted ? (
        /* HERO EMPTY STATE */
        <div className="flex-1 flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="mb-8 scale-110">
            {/* Custom YM Financial Logo */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2dd4bf', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0f766e', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M30 70 L45 45 L60 60 L80 30" fill="none" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M72 30 H80 V38" fill="none" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <text x="50" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e" fontFamily="Inter">YOUFIM</text>
                <text x="50" y="93" textAnchor="middle" fontSize="5" fill="#64748b" fontFamily="Inter">Youth Financial Manager</text>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 text-center tracking-tight">
            How can I help you today?
          </h1>

          <div className="w-full max-w-2xl relative group">
            <div className="rainbow-glow group-focus-within:opacity-40 transition-opacity"></div>
            <div className="relative bg-white border border-slate-200 rounded-[2rem] shadow-sm flex items-end p-4 min-h-[140px] focus-within:border-slate-300 transition-all">
              <textarea 
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent resize-none border-none focus:ring-0 p-2 text-xl font-medium placeholder:text-slate-400 outline-none"
              />
              <div className="flex items-center gap-3 ml-2 pb-1">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                  </svg>
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-full text-slate-600 transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE CHAT STATE */
        <div className="flex-1 flex flex-col h-[80vh] w-full pt-4">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-8 pb-10 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-slate-100 p-4 rounded-2xl' : ''}`}>
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-5 h-5 rounded bg-teal-500 flex items-center justify-center text-[8px] text-white font-bold">Y</div>
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">YouFiM</span>
                    </div>
                  )}
                  <div className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-slate-800' : 'text-slate-900'}`}>
                    {msg.parts.split('\n').map((line, i) => {
                      let content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
                      return (
                        <p key={i} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{ __html: content }} />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Persistent Bottom Input for Chat */}
          <div className="mt-auto pt-4 border-t border-slate-100 sticky bottom-0 bg-white">
            <div className="max-w-3xl mx-auto w-full mb-4 px-4">
              <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-200 transition-all">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a follow up..."
                  className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-slate-800"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="ml-2 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-20 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">Guidance provided for educational purposes only.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
