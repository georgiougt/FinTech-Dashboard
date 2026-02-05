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

        // Group by category
        const categorySpend = transactions
            .filter((t: any) => t.type === 'outgoing' && t.status === 'success')
            .reduce((acc: Record<string, number>, t: any) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        // Get account balances
        const accounts = await prisma.account.findMany({
            where: { userId: userId }
        });
        const totalBalance = accounts.reduce((sum: number, a: any) => sum + a.balance, 0);

        // Generate daily activity for the last 7 days
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
