"use client";

import { useState, useEffect } from 'react';
import { api, Bill } from '@/lib/api';
import { Calendar, AlertCircle } from 'lucide-react';

export default function BillsPage() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchBills();
    }, []);

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
            <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Bills & Subscriptions</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

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
                    </div>
                </div>

                {/* Calendar / Timeline Summary */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Timeline</h2>

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
                </div>

            </div>
        </div>
    );
}
