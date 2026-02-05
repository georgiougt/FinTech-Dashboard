"use client";

import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import styles from './CashflowChart.module.css';
import clsx from 'clsx';



export default function CashflowChart({ data }: { data?: any[] }) {
    const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('7D');

    // Fallback if no data provided yet
    const chartData = data || [];
    const hasData = chartData.some((d: any) => d.amount > 0);

    return (
        <div className={clsx('card', styles.container)}>
            <div className={styles.header}>
                <h3 className={styles.title}>Cashflow</h3>
                <div className={styles.toggles}>
                    {['7D', '30D', '90D'].map((p) => (
                        <button
                            key={p}
                            className={clsx(styles.toggle, period === p && styles.toggleActive)}
                            onClick={() => setPeriod(p as any)}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.chartArea} style={{ position: 'relative' }}>
                {!hasData && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        background: 'rgba(27, 42, 65, 0.4)',
                        backdropFilter: 'blur(2px)',
                        borderRadius: '16px'
                    }}>
                        <div style={{ fontSize: '14px', color: '#C9C1B8', marginBottom: '4px' }}>No activity yet</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>Transactions will appear here</div>
                    </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={40} style={{ opacity: hasData ? 1 : 0.3 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#C9C1B8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#C9C1B8', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        {hasData && (
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: '#1B2A41',
                                    borderColor: '#FF4D6D',
                                    borderRadius: '8px',
                                    color: '#F6F1E8'
                                }}
                                formatter={(value: any) => [`$${value}`, 'Amount']}
                            />
                        )}
                        <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.amount > 1000 ? '#2BB673' : '#FF4D6D'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
