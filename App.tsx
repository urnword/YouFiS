
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </button>

        <div className="flex items-center">
          <span className="text-2xl tracking-tight">
            <span className="font-light">You</span>
            <span className="font-black text-slate-900">Fi</span>
            <span className="font-light">M</span>
          </span>
        </div>

        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>

      <main className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto px-4">
        <ChatInterface />
      </main>

      <footer className="py-6 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
          <div className="w-5 h-5 bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">G</div>
          <span>Powered by Gemini AI</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
