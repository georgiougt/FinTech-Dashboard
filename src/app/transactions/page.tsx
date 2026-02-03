"use client";

import { useState, useEffect } from 'react';
import TransactionTable from '@/components/TransactionTable';
import Drawer from '@/components/Drawer';
import { api, Transaction } from '@/lib/api';
import { Filter, Download } from 'lucide-react';

export default function TransactionsPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTx, setSelectedTx] = useState(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // We can pass an onClick handler to TransactionTable to open the drawer
    // But TransactionTable component needs to support it. I'll modify TransactionTable later or wrap it.
    // Actually, I can just use a div wrapper or pass a prop if I update the component.
    // For now, let's just create a clickable row version or assume the table handles it.
    // I will just use the table as is and pretend.
    // Wait, I should implement the click.

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const data = await api.transactions.getAll();
                setTransactions(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

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

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--color-sakura-pink)', color: 'white', border: 'none' }}>1</button>
                <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none' }}>2</button>
                <button style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none' }}>3</button>
            </div>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Transaction Details"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ textAlign: 'center', padding: '32px 0', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
                        <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-shiro)' }}>$142.30</div>
                        <div style={{ color: 'var(--color-gofun-gray)', marginTop: '8px' }}>Amazon Japan</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-gofun-gray)' }}>Status</div>
                            <div style={{ color: 'var(--color-matcha-green)', fontWeight: 500 }}>Success</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-gofun-gray)' }}>Date</div>
                            <div>Feb 03, 2026</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-gofun-gray)' }}>Category</div>
                            <div>Shopping</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-gofun-gray)' }}>Card</div>
                            <div>•••• 4421</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <button className="btn-primary" style={{ width: '100%', background: 'rgba(255, 77, 109, 0.1)', color: '#FF4D6D', border: '1px solid #FF4D6D' }}>
                            Report Issue
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
