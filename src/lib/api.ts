// API wrapper for backend endpoints
const API_BASE = '/api';

export interface Transaction {
    id: string;
    merchant: string;
    category: string;
    date: string;
    amount: number;
    status: 'success' | 'pending' | 'failed';
    type: 'incoming' | 'outgoing';
    accountId: string;
    account?: Account;
}

export interface Account {
    id: string;
    name: string;
    type: 'Checking' | 'Savings' | 'Business' | 'Crypto';
    balance: number;
    accountNumber: string;
    currency: string;
    transactions?: Transaction[];
    cards?: Card[];
}

export interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    category: string;
    logo?: string;
}

export interface Card {
    id: string;
    name: string;
    last4: string;
    holder: string;
    expiry: string;
    network: string;
    limit: number;
    spent: number;
    color: string;
    isVirtual: boolean;
    isFrozen: boolean;
}

export interface Analytics {
    totalBalance: number;
    totalIncoming: number;
    totalOutgoing: number;
    savingsRate: number;
    categorySpend: Record<string, number>;
    monthlySpend: number;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) {
        let errorMsg = response.statusText;
        try {
            const errorData = await response.json();
            if (errorData.error) errorMsg = errorData.error;
        } catch (e) {
            // Ignore JSON parse error
        }
        throw new Error(errorMsg);
    }
    return response.json();
}

export const api = {
    transactions: {
        getAll: () => fetchAPI<Transaction[]>('/transactions'),
    },
    accounts: {
        getAll: () => fetchAPI<Account[]>('/accounts'),
    },
    bills: {
        getAll: () => fetchAPI<Bill[]>('/bills'),
    },
    analytics: {
        get: () => fetchAPI<Analytics>('/analytics'),
    },
};
