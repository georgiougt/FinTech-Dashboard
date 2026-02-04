"use client";

import { useState, useEffect } from 'react';
import TransactionTable from '@/components/TransactionTable';
import Drawer from '@/components/Drawer';
import Modal from '@/components/Modal';
import { api, Transaction } from '@/lib/api';
import { Filter, Download, Plus } from 'lucide-react';

export default function TransactionsPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        merchant: '',
        amount: '',
        category: 'Shopping',
        type: 'outgoing', // incoming | outgoing
        accountId: '',
        date: new Date().toISOString().split('T')[0]
    });

    async function fetchData() {
        try {
            const [txData, accData] = await Promise.all([
                api.transactions.getAll(),
                api.accounts.getAll()
            ]);
            setTransactions(txData);
            setAccounts(accData);

            // Set default account if available
            if (accData.length > 0 && !formData.accountId) {
                setFormData(prev => ({ ...prev, accountId: accData[0].id }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateTransaction = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to create transaction');

            await fetchData(); // Refresh list
            setIsModalOpen(false);
            // Reset form
            setFormData({
                merchant: '',
                amount: '',
                category: 'Shopping',
                type: 'outgoing',
                accountId: accounts[0]?.id || '',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error('Error creating transaction:', error);
            alert('Failed to create transaction');
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Transactions</h1>
                <div style={{ textAlign: 'center', padding: '60px', color: '#C9C1B8' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700 }}>Transactions</h1>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} />
                        New Transaction
                    </button>
                    <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#F6F1E8', border: '1px solid rgba(201,193,184,0.18)' }}>
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#F6F1E8', border: '1px solid rgba(201,193,184,0.18)' }}>
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div onClick={() => setIsDrawerOpen(true)}>
                <TransactionTable
                    transactions={transactions}
                    title="All Transactions"
                />
            </div>

            {/* Pagination placeholders */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--color-sakura-pink)', color: 'white', border: 'none' }}>1</button>
                <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none' }}>2</button>
            </div>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Transaction Details"
            >
                {/* existing drawer content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ textAlign: 'center', padding: '32px 0', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
                        <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-shiro)' }}>--</div>
                        <div style={{ color: 'var(--color-gofun-gray)', marginTop: '8px' }}>Select a transaction</div>
                    </div>
                </div>
            </Drawer>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Transaction"
            >
                <form onSubmit={handleCreateTransaction}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                            >
                                <option value="outgoing">Expense</option>
                                <option value="incoming">Income</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Amount ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Merchant / Title</label>
                        <input
                            type="text"
                            required
                            value={formData.merchant}
                            onChange={e => setFormData({ ...formData, merchant: e.target.value })}
                            placeholder="e.g. Starbucks"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                        >
                            <option value="Shopping">Shopping</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Salary">Salary</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Account</label>
                        <select
                            value={formData.accountId}
                            onChange={e => setFormData({ ...formData, accountId: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                        >
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.name} (${acc.balance})</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={creating}>
                        {creating ? 'Processing...' : 'Add Transaction'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
