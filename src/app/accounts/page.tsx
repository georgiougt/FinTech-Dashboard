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

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const data = await api.accounts.getAll();
                setAccounts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                setLoading(false);
            }
        }
        fetchAccounts();
    }, []);

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
                <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Account Type</label>
                        <select style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            background: '#1B2A41',
                            border: '1px solid rgba(201,193,184,0.3)',
                            color: '#F6F1E8',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}>
                            <option style={{ background: '#1B2A41', color: '#F6F1E8', padding: '8px' }}>Checking</option>
                            <option style={{ background: '#1B2A41', color: '#F6F1E8', padding: '8px' }}>Savings</option>
                            <option style={{ background: '#1B2A41', color: '#F6F1E8', padding: '8px' }}>Investment</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Account Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Vacation Fund"
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
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Create Account</button>
                </form>
            </Modal>
        </div>
    );
}
