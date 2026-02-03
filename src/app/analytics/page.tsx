"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CATEGORY_SPEND_DATA } from '@/lib/data';

const MERCHANTS = [
    { name: 'Amazon Japan', amount: 1450.20, count: 12 },
    { name: 'Starbucks Tokyo', amount: 340.50, count: 24 },
    { name: 'Uber Eats', amount: 280.10, count: 8 },
    { name: 'JR East', amount: 120.00, count: 15 },
    { name: '7-Eleven', amount: 85.40, count: 10 },
];

const BUDGETS = [
    { category: 'Food & Dining', spent: 850, total: 1200, color: '#FF4D6D' },
    { category: 'Shopping', spent: 1450, total: 1000, color: '#2BB673' },
    { category: 'Transport', spent: 120, total: 300, color: '#C8A44D' },
    { category: 'Bills', spent: 400, total: 500, color: '#8B5CF6' },
];

export default function AnalyticsPage() {
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
                                    data={CATEGORY_SPEND_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="label"
                                >
                                    {CATEGORY_SPEND_DATA.map((entry, index) => (
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

                {/* Budget Progress */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Monthly Budgets</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {BUDGETS.map(budget => {
                            const percent = Math.min((budget.spent / budget.total) * 100, 100);
                            const isOver = budget.spent > budget.total;

                            return (
                                <div key={budget.category}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                        <span style={{ color: '#F6F1E8' }}>{budget.category}</span>
                                        <span style={{ color: isOver ? '#FF4D6D' : '#C9C1B8' }}>
                                            ${budget.spent} / ${budget.total}
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
                    </div>
                </div>

                {/* Merchant Leaderboard */}
                <div className="card" style={{ gridColumn: '1 / -1' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F6F1E8', marginBottom: '24px' }}>Top Merchants</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {MERCHANTS.map((m, i) => (
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
                    </div>
                </div>

            </div>
        </div >
    );
}
