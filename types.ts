
export interface Message {
  role: 'user' | 'model';
  parts: string;
}

// Added BudgetCategory interface to support budget planning and dashboard components
export interface BudgetCategory {
  name: string;
  amount: number;
  type: 'need' | 'want' | 'savings';
  color: string;
}
