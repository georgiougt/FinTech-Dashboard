import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { auth } from '@clerk/nextjs/server';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // Get all transactions for calculations
        const transactions = await prisma.transaction.findMany({
            where: {
                account: {
                    userId: userId
                }
            }
        });

        // Calculate totals
        const totalIncoming = transactions
            .filter((t: any) => t.type === 'incoming' && t.status === 'success')
            .reduce((sum: number, t: any) => sum + t.amount, 0);

        const totalOutgoing = transactions
            .filter((t: any) => t.type === 'outgoing' && t.status === 'success')
            .reduce((sum: number, t: any) => sum + t.amount, 0);

        // Group by category for Pie Chart
        const categoryColors: Record<string, string> = {
            'Food & Dining': '#FF4D6D',
            'Shopping': '#2BB673',
            'Transport': '#C8A44D',
            'Bills': '#8B5CF6',
            'Entertainment': '#FF4D6D',
            'Utilities': '#8B5CF6',
            'General': '#1B2A41'
        };

        const categorySpendRecord = transactions
            .filter((t: any) => t.type === 'outgoing' && t.status === 'success')
            .reduce((acc: Record<string, number>, t: any) => {
                const cat = t.category || 'General';
                acc[cat] = (acc[cat] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        const categorySpend = Object.entries(categorySpendRecord).map(([label, value]) => ({
            label,
            value,
            color: categoryColors[label] || '#9CA3AF'
        }));

        // Top Merchants
        const merchantRecord = transactions
            .filter((t: any) => t.type === 'outgoing' && t.status === 'success')
            .reduce((acc: Record<string, { amount: number, count: number }>, t: any) => {
                const merch = t.merchant || 'Unknown';
                if (!acc[merch]) acc[merch] = { amount: 0, count: 0 };
                acc[merch].amount += t.amount;
                acc[merch].count += 1;
                return acc;
            }, {});

        const topMerchants = Object.entries(merchantRecord)
            .map(([name, data]) => ({
                name,
                amount: data.amount,
                count: data.count
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);

        // Mock Budgets based on actual spend (for visualisation purposes, assuming a dynamic target)
        // In a real app, Budget models would exist
        const budgets = categorySpend.slice(0, 4).map(c => ({
            category: c.label,
            spent: c.value,
            total: Math.max(c.value * 1.2, 500), // Dynamic target just to show UI
            color: c.color
        }));

        // Get account balances (Restored)
        const accounts = await prisma.account.findMany({
            where: { userId: userId }
        });
        const totalBalance = accounts.reduce((sum: number, a: any) => sum + a.balance, 0);

        // Generate daily activity for the last 7 days (Restored)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const dailyActivity = last7Days.map(date => {
            const dayTotal = transactions
                .filter((t: any) => t.date.toString().startsWith(date) && t.type === 'outgoing')
                .reduce((sum: number, t: any) => sum + t.amount, 0);

            return {
                day: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                amount: dayTotal
            };
        });

        return NextResponse.json({
            totalBalance,
            totalIncoming,
            totalOutgoing,
            savingsRate: totalIncoming > 0 ? (totalIncoming - totalOutgoing) / totalIncoming : 0,
            categorySpend,
            topMerchants,
            budgets, // Including dynamic budgets
            monthlySpend: totalOutgoing,
            dailyActivity
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
}
