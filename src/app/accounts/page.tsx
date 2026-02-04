"use client";

import { useState, useEffect } from 'react';
import { api, Account } from '@/lib/api';
import AccountCard from '@/components/AccountCard';
import Modal from '@/components/Modal';
import { Plus } from 'lucide-react';

export default function AccountsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    // Form state
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountType, setNewAccountType] = useState('Checking');

    async function fetchAccounts() {
        try {
            const res = await fetch('/api/accounts');
            if (!res.ok) throw new Error('Failed to fetch accounts');
            const data = await res.json();
            setAccounts(data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch('/api/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newAccountName,
                    type: newAccountType
                })
            });

            if (!res.ok) throw new Error('Failed to create account');

            await fetchAccounts(); // Refresh list
            setIsModalOpen(false);
            setNewAccountName('');
            setNewAccountType('Checking');
        } catch (error) {
            console.error('Error creating account:', error);
            alert('Failed to create account');
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Accounts</h1>
                <div style={{ textAlign: 'center', padding: '60px', color: '#C9C1B8' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700 }}>Accounts</h1>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} />
                    Add Account
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {accounts.map(account => (
                    <AccountCard key={account.id} account={account} />
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Account"
            >
                <form onSubmit={handleCreateAccount}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Account Type</label>
                        <select
                            value={newAccountType}
                            onChange={(e) => setNewAccountType(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                background: '#1B2A41',
                                border: '1px solid rgba(201,193,184,0.3)',
                                color: '#F6F1E8',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="Checking" style={{ background: '#1B2A41', color: '#F6F1E8', padding: '8px' }}>Checking</option>
                            <option value="Savings" style={{ background: '#1B2A41', color: '#F6F1E8', padding: '8px' }}>Savings</option>
                            <option value="Investment" style={{ background: '#1B2A41', color: '#F6F1E8', padding: '8px' }}>Investment</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Account Name</label>
                        <input
                            type="text"
                            value={newAccountName}
                            onChange={(e) => setNewAccountName(e.target.value)}
                            placeholder="e.g. Vacation Fund"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                background: '#1B2A41',
                                border: '1px solid rgba(201,193,184,0.3)',
                                color: '#F6F1E8',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', opacity: creating ? 0.7 : 1 }}
                        disabled={creating}
                    >
                        {creating ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
