import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEMO_USER_ID = 'u1';

export async function GET() {
    try {
        // Get all transactions for calculations
        const transactions = await prisma.transaction.findMany({
            where: {
                account: {
                    userId: DEMO_USER_ID
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
            where: { userId: DEMO_USER_ID }
        });
        const totalBalance = accounts.reduce((sum: number, a: any) => sum + a.balance, 0);

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
            { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
}
