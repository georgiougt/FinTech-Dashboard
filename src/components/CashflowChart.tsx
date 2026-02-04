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

            <div className={styles.chartArea}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={40}>
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
