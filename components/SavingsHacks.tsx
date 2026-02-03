
import React from 'react';

const HACKS = [
  {
    title: "The Textbook Trick",
    desc: "Never buy new. Use sites like SlugBooks to compare rental prices, or check the campus library's 'Course Reserve' first.",
    icon: "📚",
    category: "Study"
  },
  {
    title: "UNiDAYS / StudentBeans",
    desc: "Register with your .edu email to get 10-50% off tech (Apple/Samsung), clothes, and food services.",
    icon: "🛍️",
    category: "Shopping"
  },
  {
    title: "Meal Prep Sunday",
    desc: "Spending $15 at Chipotle vs $5 for a home-cooked meal adds up to $300 savings monthly. Invest in good Tupperware!",
    icon: "🍱",
    category: "Food"
  },
  {
    title: "Campus Employment",
    desc: "Look for 'Work-Study' or desk jobs at the library/gym. You can often study while getting paid.",
    icon: "💻",
    category: "Income"
  },
  {
    title: "Interest Hack",
    desc: "Even paying $20/month toward your unsubsidized student loan interest while in school prevents interest from 'capitalizing'.",
    icon: "📈",
    category: "Debt"
  },
  {
    title: "The 24-Hour Rule",
    desc: "Wait 24 hours before any purchase over $30. Usually, the 'want' impulse fades away by morning.",
    icon: "⏳",
    category: "Mindset"
  }
];

const SavingsHacks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Student Savings Hacks 💡</h2>
        <p className="text-indigo-100 opacity-90 max-w-xl">
          Being a student is expensive, but it also comes with secret perks. 
          Use these proven methods to keep your bank account happy while you study.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HACKS.map((hack, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {hack.icon}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
              {hack.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{hack.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{hack.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsHacks;
