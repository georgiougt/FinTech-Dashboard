"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const res = await fetch('/api/analytics');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAnalytics();
    }, []);

    if (loading) {
        return <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}><Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 16px' }} />Loading analytics...</div>;
    }

    if (!data || data.categorySpend.length === 0) {
        return (
            <div>
                <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Analytics</h1>
                <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
                    <h2 style={{ color: '#F6F1E8', marginBottom: '8px' }}>No Data Available</h2>
                    <p style={{ color: '#C9C1B8' }}>Start spending to see analytics!</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-shora" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>Analytics</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>

                {/* Spend by Category */}
                <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Spend by Category</h2>
                    <div style={{ flex: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.categorySpend}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="label"
                                >
                                    {data.categorySpend.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1B2A41', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#F6F1E8' }}
                                />
                                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ color: '#C9C1B8' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Budget Progress (Dynamic) */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Monthly Budgets</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {data.budgets.map((budget: any) => {
                            const percent = Math.min((budget.spent / budget.total) * 100, 100);
                            const isOver = budget.spent > budget.total;

                            return (
                                <div key={budget.category}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                        <span style={{ color: '#F6F1E8' }}>{budget.category}</span>
                                        <span style={{ color: isOver ? '#FF4D6D' : '#C9C1B8' }}>
                                            ${budget.spent.toLocaleString()} / ${budget.total.toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${percent}%`,
                                            background: budget.color,
                                            height: '100%',
                                            borderRadius: '4px',
                                            border: isOver ? '2px solid rgba(255, 77, 109, 0.6)' : 'none',
                                            boxSizing: 'border-box'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                        {data.budgets.length === 0 && (
                            <div style={{ color: '#C9C1B8', fontStyle: 'italic' }}>
                                Automated budgets will appear here after more spending activity.
                            </div>
                        )}
                    </div>
                </div>

                {/* Merchant Leaderboard */}
                <div className="card" style={{ gridColumn: '1 / -1' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Top Merchants</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {data.topMerchants.map((m: any, i: number) => (
                            <div key={m.name} style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '16px',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: 700, opacity: 0.2, color: '#F6F1E8' }}>#{i + 1}</div>
                                <div style={{ fontWeight: 600, color: '#F6F1E8' }}>{m.name}</div>
                                <div style={{ color: '#C9C1B8', fontSize: '14px' }}>{m.count} transactions</div>
                                <div style={{ fontWeight: 600, color: '#FF4D6D', marginTop: 'auto' }}>${m.amount.toLocaleString()}</div>
                            </div>
                        ))}
                        {data.topMerchants.length === 0 && (
                            <div style={{ color: '#C9C1B8', fontStyle: 'italic', gridColumn: '1 / -1' }}>
                                No merchant data yet.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div >
    );
}
