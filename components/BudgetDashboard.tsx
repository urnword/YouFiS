
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { BudgetCategory } from '../types';

interface Props {
  income: number;
  expenses: BudgetCategory[];
}

const BudgetDashboard: React.FC<Props> = ({ income, expenses }) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = income - totalExpenses;

  const dataByKind = [
    { name: 'Needs', value: expenses.filter(e => e.type === 'need').reduce((s, e) => s + e.amount, 0), color: '#6366f1' },
    { name: 'Wants', value: expenses.filter(e => e.type === 'want').reduce((s, e) => s + e.amount, 0), color: '#fb923c' },
    { name: 'Savings/Debt', value: expenses.filter(e => e.type === 'savings').reduce((s, e) => s + e.amount, 0), color: '#10b981' },
  ];

  const rule503020 = [
    { name: 'Needs (50%)', actual: dataByKind[0].value, ideal: income * 0.5 },
    { name: 'Wants (30%)', actual: dataByKind[1].value, ideal: income * 0.3 },
    { name: 'Savings (20%)', actual: dataByKind[2].value, ideal: income * 0.2 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
      {/* Overview Cards */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Monthly Income</p>
          <h3 className="text-2xl font-bold text-slate-900">${income.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">Total Expenses</p>
          <h3 className="text-2xl font-bold text-indigo-600">${totalExpenses.toLocaleString()}</h3>
        </div>
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${remaining < 0 ? 'border-red-200 bg-red-50' : ''}`}>
          <p className="text-slate-500 text-sm font-medium">Remaining Left</p>
          <h3 className={`text-2xl font-bold ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
            ${remaining.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Expense Breakdown Pie */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Expense Breakdown
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataByKind}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {dataByKind.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 50/30/20 Comparison */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Budget Score (50/30/20)
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rule503020} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend verticalAlign="bottom" height={36}/>
              <Bar dataKey="ideal" name="Ideal Spending" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              <Bar dataKey="actual" name="Your Spending" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;
