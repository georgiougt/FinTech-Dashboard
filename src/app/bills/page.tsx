"use client";

import { useState, useEffect } from 'react';
import { api, Bill } from '@/lib/api';
import { Calendar, AlertCircle, Plus } from 'lucide-react';
import Modal from '@/components/Modal';

export default function BillsPage() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        dueDate: '',
        category: 'Utilities'
    });

    async function fetchBills() {
        try {
            const data = await api.bills.getAll();
            setBills(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bills:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBills();
    }, []);

    const handleCreateBill = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch('/api/bills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to create bill');

            await fetchBills();
            setIsModalOpen(false);
            setFormData({ name: '', amount: '', dueDate: '', category: 'Utilities' });
        } catch (error) {
            console.error('Error creating bill:', error);
            alert('Failed to create bill');
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Bills & Subscriptions</h1>
                <div style={{ textAlign: 'center', padding: '60px', color: '#C9C1B8' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700 }}>Bills & Subscriptions</h1>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} />
                    Add Bill
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>

                {/* Upcoming Bills */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Upcoming Bills</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {bills.map(bill => (
                            <div key={bill.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
                                        fontSize: '20px', fontWeight: 600, color: '#F6F1E8'
                                    }}>
                                        {bill.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#F6F1E8' }}>{bill.name}</div>
                                        <div style={{ fontSize: '14px', color: '#C9C1B8' }}>Due on {bill.dueDate}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 600, color: '#F6F1E8' }}>${bill.amount}</div>
                                    <button style={{
                                        fontSize: '12px', color: '#FF4D6D', background: 'none', border: 'none',
                                        cursor: 'pointer', marginTop: '4px'
                                    }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                        {bills.length === 0 && (
                            <div style={{ textAlign: 'center', color: '#C9C1B8', padding: '24px' }}>
                                No upcoming bills. You're free!
                            </div>
                        )}
                    </div>
                </div>

                {/* Calendar / Timeline Summary */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Timeline</h2>

                    {bills.length > 0 ? (
                        <div style={{ position: 'relative', paddingLeft: '24px' }}>
                            <div style={{ position: 'absolute', left: '7px', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.1)' }} />

                            {bills.map((bill, i) => (
                                <div key={bill.id} style={{ marginBottom: '32px', position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', left: '-21px', top: '4px', width: '12px', height: '12px',
                                        borderRadius: '50%', background: i === 0 ? '#FF4D6D' : '#1B2A41',
                                        border: '2px solid #FF4D6D'
                                    }} />
                                    <div style={{ fontSize: '14px', color: '#C9C1B8', marginBottom: '4px' }}>{bill.dueDate}</div>
                                    <div style={{ color: '#F6F1E8', fontWeight: 500 }}>Payment for {bill.name}</div>
                                    <div style={{ fontSize: '12px', color: '#C9C1B8' }}>Expected amount: ${bill.amount}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#C9C1B8', padding: '24px' }}>
                            Add a bill to see your timeline.
                        </div>
                    )}
                </div>

            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Bill"
            >
                <form onSubmit={handleCreateBill}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Bill Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Netflix, Rent"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Amount ($)</label>
                        <input
                            type="number"
                            required
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#F6F1E8', fontWeight: 500 }}>Due Date (e.g. "15th" or date)</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. 15th of every month"
                            value={formData.dueDate}
                            onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B2A41', color: 'white', border: '1px solid #333' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={creating}>
                        {creating ? 'Adding...' : 'Add Bill'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
