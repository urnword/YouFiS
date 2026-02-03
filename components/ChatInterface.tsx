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
    <div className="flex flex-col w-full min-h-[70vh] relative">
      {!hasStarted ? (
        /* HERO EMPTY STATE */
        <div className="flex-1 flex flex-col items-center justify-center py-12 animate-fade-in">
          <div className="mb-8 scale-110">
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
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            Ask your Financial Consultant
          </h1>
          <p className="text-slate-500 text-center mb-12 max-w-md">Get expert advice on student loans, meal prepping on a budget, or managing your first credit card.</p>

          <div className="w-full max-w-2xl relative group">
            <div className="rainbow-glow group-focus-within:opacity-40 transition-opacity"></div>
            <div className="relative bg-white border border-slate-200 rounded-[2rem] shadow-lg flex items-end p-4 min-h-[140px] focus-within:border-teal-300 transition-all">
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
                placeholder="How do I save money on textbooks this semester?"
                className="flex-1 bg-transparent resize-none border-none focus:ring-0 p-2 text-lg font-medium placeholder:text-slate-300 outline-none"
              />
              <div className="flex items-center gap-3 ml-2 pb-1">
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-100 rounded-full text-white disabled:text-slate-300 transition-all shadow-md shadow-teal-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['Budgeting 101', 'Loan Interest', 'Credit Scores'].map(tag => (
              <button 
                key={tag}
                onClick={() => setInput(`Tell me about ${tag}`)}
                className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-xs font-medium hover:bg-white hover:border-teal-200 hover:text-teal-600 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ACTIVE CHAT STATE */
        <div className="flex-1 flex flex-col w-full pt-4">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-8 pb-32 max-h-[70vh]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-slate-100 p-4 rounded-2xl rounded-tr-none' : 'bg-white p-4 rounded-2xl border border-slate-100 shadow-sm'}`}>
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-5 h-5 rounded bg-teal-500 flex items-center justify-center text-[8px] text-white font-bold">Y</div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">YouFiM Consultant</span>
                    </div>
                  )}
                  <div className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-slate-800' : 'text-slate-900'}`}>
                    {msg.parts.split('\n').map((line, i) => {
                      let content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
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
                <div className="flex items-center gap-2 text-teal-400 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Persistent Bottom Input for Chat */}
          <div className="fixed bottom-20 md:bottom-8 left-0 right-0 z-40 px-4 md:px-0 pointer-events-none">
            <div className="max-w-3xl mx-auto w-full pointer-events-auto">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl focus-within:ring-2 focus-within:ring-teal-200 transition-all">
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
                  className="ml-2 p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-20 transition-all shadow-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2 bg-white/80 backdrop-blur rounded-full py-1 inline-block mx-auto w-full">Guidance provided for educational purposes only.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;