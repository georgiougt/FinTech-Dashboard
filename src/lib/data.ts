export type TransactionStatus = 'success' | 'pending' | 'failed';
export type TransactionType = 'incoming' | 'outgoing';

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
}

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Business' | 'Crypto';
  balance: number;
  accountNumber: string; // Last 4
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  logo?: string;
}

export const USER_PROFILE = {
  name: 'Akira Kurosawa',
  avatar: '/avatars/akira.jpg',
  notificationCount: 3,
};

export const KPI_DATA = {
  totalBalance: 61341.45,
  monthlySpend: 2999.80,
  incoming: 5250.00,
  savingsRate: 0.24, // 24%
};

export const ACCOUNTS: Account[] = [
  { id: '1', name: 'Main Checking', type: 'Checking', balance: 12450.00, accountNumber: '4421' },
  { id: '2', name: 'Emergency Fund', type: 'Savings', balance: 35000.00, accountNumber: '8812' },
  { id: '3', name: 'Studio Ventures', type: 'Business', balance: 8450.20, accountNumber: '1102' },
  { id: '4', name: 'Bitcoin Cold Storage', type: 'Crypto', balance: 5441.25, accountNumber: 'BTC' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', merchant: 'Starbucks Tokyo', category: 'Food', date: '2026-02-03', amount: 8.50, status: 'success', type: 'outgoing' },
  { id: 't2', merchant: 'Amazon Japan', category: 'Shopping', date: '2026-02-03', amount: 142.30, status: 'success', type: 'outgoing' },
  { id: 't3', merchant: 'Salary Deposit', category: 'Salary', date: '2026-02-01', amount: 5250.00, status: 'success', type: 'incoming' },
  { id: 't4', merchant: 'JR East', category: 'Transport', date: '2026-02-02', amount: 12.80, status: 'success', type: 'outgoing' },
  { id: 't5', merchant: 'Uber Eats', category: 'Food', date: '2026-02-02', amount: 23.40, status: 'pending', type: 'outgoing' },
  { id: 't6', merchant: 'Tokyo Gas', category: 'Utilities', date: '2026-02-01', amount: 85.00, status: 'success', type: 'outgoing' },
  { id: 't7', merchant: 'Netflix', category: 'Entertainment', date: '2026-02-01', amount: 17.99, status: 'success', type: 'outgoing' },
  { id: 't8', merchant: 'Apple One', category: 'Subscription', date: '2026-01-30', amount: 29.95, status: 'failed', type: 'outgoing' },
];

export const BILLS: Bill[] = [
  { id: 'b1', name: 'Netflix', amount: 17.99, dueDate: '2026-03-01', category: 'Entertainment' },
  { id: 'b2', name: 'Adobe Creative Cloud', amount: 54.99, dueDate: '2026-02-28', category: 'Software' },
  { id: 'b3', name: 'Tokyo Electric Power', amount: 120.50, dueDate: '2026-02-25', category: 'Utilities' },
  { id: 'b4', name: 'Gym Membership', amount: 45.00, dueDate: '2026-02-15', category: 'Health' },
];

export const CATEGORY_SPEND_DATA = [
  { label: 'Food & Dining', value: 35, color: '#FF4D6D' },
  { label: 'Shopping', value: 25, color: '#2BB673' },
  { label: 'Transport', value: 15, color: '#C8A44D' },
  { label: 'Bills', value: 25, color: '#8B5CF6' },
];
