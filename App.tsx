import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import BudgetDashboard from './components/BudgetDashboard';
import BudgetPlanner from './components/BudgetPlanner';
import SavingsHacks from './components/SavingsHacks';
import { BudgetCategory } from './types';

type View = 'chat' | 'budget' | 'hacks';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('chat');
  const [income, setIncome] = useState<number>(2000);
  const [expenses, setExpenses] = useState<BudgetCategory[]>([
    { name: 'Rent & Utilities', amount: 800, type: 'need', color: '#6366f1' },
    { name: 'Groceries', amount: 300, type: 'need', color: '#6366f1' },
    { name: 'Dining Out', amount: 150, type: 'want', color: '#fb923c' },
    { name: 'Subscribtions', amount: 50, type: 'want', color: '#fb923c' },
    { name: 'Emergency Fund', amount: 200, type: 'savings', color: '#10b981' },
  ]);

  const handleBudgetUpdate = (newIncome: number, newExpenses: BudgetCategory[]) => {
    setIncome(newIncome);
    setExpenses(newExpenses);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col relative overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-black text-sm shadow-sm shadow-teal-200">
            Y
          </div>
          <span className="text-xl tracking-tight hidden sm:block">
            <span className="font-light">You</span>
            <span className="font-black text-slate-900">Fi</span>
            <span className="font-light">M</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
          <button 
            onClick={() => setActiveView('chat')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'chat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            AI Consultant
          </button>
          <button 
            onClick={() => setActiveView('budget')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'budget' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Budget Manager
          </button>
          <button 
            onClick={() => setActiveView('hacks')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeView === 'hacks' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Student Hacks
          </button>
        </nav>

        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse hidden sm:block"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 pt-6 pb-24">
        {activeView === 'chat' && (
          <div className="w-full max-w-4xl mx-auto animate-fade-in">
             <ChatInterface />
          </div>
        )}

        {activeView === 'budget' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-8">
               <h2 className="text-3xl font-bold text-slate-900">Student Budget Hub</h2>
               <p className="text-slate-500 mt-2">Track your income and expenses using the 50/30/20 principle designed for university life.</p>
            </div>
            
            <BudgetDashboard income={income} expenses={expenses} />
            
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Update Your Numbers</h3>
              <BudgetPlanner 
                income={income} 
                expenses={expenses} 
                onUpdate={handleBudgetUpdate} 
              />
            </div>
          </div>
        )}

        {activeView === 'hacks' && (
          <div className="animate-fade-in">
            <SavingsHacks />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-6 py-3 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveView('chat')}
          className={`flex flex-col items-center gap-1 ${activeView === 'chat' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span className="text-[10px] font-bold">Chat</span>
        </button>
        <button 
          onClick={() => setActiveView('budget')}
          className={`flex flex-col items-center gap-1 ${activeView === 'budget' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
          <span className="text-[10px] font-bold">Budget</span>
        </button>
        <button 
          onClick={() => setActiveView('hacks')}
          className={`flex flex-col items-center gap-1 ${activeView === 'hacks' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
          <span className="text-[10px] font-bold">Hacks</span>
        </button>
      </footer>

      {/* Footer Branding for Desktop */}
      <div className="hidden md:flex py-8 text-center justify-center border-t border-slate-100 bg-white mt-auto">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">G</div>
          <span>Powered by Gemini AI • Student Financial Guidance</span>
        </div>
      </div>
    </div>
  );
};

export default App;