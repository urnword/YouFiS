
import React, { useState } from 'react';
import { BudgetCategory } from '../types';

interface Props {
  income: number;
  expenses: BudgetCategory[];
  onUpdate: (income: number, expenses: BudgetCategory[]) => void;
}

const BudgetPlanner: React.FC<Props> = ({ income, expenses, onUpdate }) => {
  const [localIncome, setLocalIncome] = useState(income);
  const [localExpenses, setLocalExpenses] = useState<BudgetCategory[]>(expenses);

  const updateExpense = (idx: number, amount: number) => {
    const newExpenses = [...localExpenses];
    newExpenses[idx].amount = Math.max(0, amount);
    setLocalExpenses(newExpenses);
    onUpdate(localIncome, newExpenses);
  };

  const addExpense = () => {
    const newExpense: BudgetCategory = {
      name: 'New Item',
      amount: 0,
      type: 'want',
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    };
    const updated = [...localExpenses, newExpense];
    setLocalExpenses(updated);
    onUpdate(localIncome, updated);
  };

  const removeExpense = (idx: number) => {
    const updated = localExpenses.filter((_, i) => i !== idx);
    setLocalExpenses(updated);
    onUpdate(localIncome, updated);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8 max-w-4xl mx-auto">
      <section>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">1</span>
          Monthly Income
        </h3>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
          <input 
            type="number"
            value={localIncome}
            onChange={(e) => {
              const val = Number(e.target.value);
              setLocalIncome(val);
              onUpdate(val, localExpenses);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-lg font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="e.g. 1500"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">Include part-time jobs, allowances, or financial aid monthly stipends.</p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
          Expense Breakdown
        </h3>
        <div className="space-y-3">
          {localExpenses.map((exp, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-slate-50 p-4 rounded-xl group relative">
              <input 
                className="bg-transparent font-medium text-slate-800 border-none focus:ring-0 w-full sm:w-auto flex-1"
                value={exp.name}
                onChange={(e) => {
                  const newEx = [...localExpenses];
                  newEx[i].name = e.target.value;
                  setLocalExpenses(newEx);
                  onUpdate(localIncome, newEx);
                }}
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select 
                  className="bg-white border-slate-200 rounded-lg text-xs py-1 px-2 focus:ring-indigo-500"
                  value={exp.type}
                  onChange={(e) => {
                    const newEx = [...localExpenses];
                    newEx[i].type = e.target.value as any;
                    setLocalExpenses(newEx);
                    onUpdate(localIncome, newEx);
                  }}
                >
                  <option value="need">Need</option>
                  <option value="want">Want</option>
                  <option value="savings">Savings</option>
                </select>
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <input 
                    type="number"
                    value={exp.amount}
                    onChange={(e) => updateExpense(i, Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-7 pr-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button 
                  onClick={() => removeExpense(i)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={addExpense}
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Item
          </button>
        </div>
      </section>
    </div>
  );
};

export default BudgetPlanner;
