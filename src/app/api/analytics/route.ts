import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get all transactions for calculations
        const transactions = await prisma.transaction.findMany();

        // Calculate totals
        const totalIncoming = transactions
            .filter(t => t.type === 'incoming' && t.status === 'success')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalOutgoing = transactions
            .filter(t => t.type === 'outgoing' && t.status === 'success')
            .reduce((sum, t) => sum + t.amount, 0);

        // Group by category
        const categorySpend = transactions
            .filter(t => t.type === 'outgoing' && t.status === 'success')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        // Get account balances
        const accounts = await prisma.account.findMany();
        const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

        return NextResponse.json({
            totalBalance,
            totalIncoming,
            totalOutgoing,
            savingsRate: totalIncoming > 0 ? (totalIncoming - totalOutgoing) / totalIncoming : 0,
            categorySpend,
            monthlySpend: totalOutgoing
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
