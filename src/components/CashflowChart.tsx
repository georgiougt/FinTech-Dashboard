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

const DATA_7D = [
    { day: 'Jan 28', amount: 150 },
    { day: 'Jan 29', amount: 450 },
    { day: 'Jan 30', amount: 1200 },
    { day: 'Jan 31', amount: 300 },
    { day: 'Feb 1', amount: 5250 },
    { day: 'Feb 2', amount: 450 },
    { day: 'Feb 3', amount: 200 },
];

const DATA_30D = Array.from({ length: 15 }, (_, i) => ({
    day: `Jan ${i * 2 + 1}`,
    amount: Math.floor(Math.random() * 2000) + 500
}));

export default function CashflowChart() {
    const [period, setPeriod] = useState<'7D' | '30D' | '90D'>('7D');

    const data = period === '7D' ? DATA_7D : DATA_30D; // keeping it simple

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
                    <BarChart data={data} barSize={40}>
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
                            {data.map((entry, index) => (
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
