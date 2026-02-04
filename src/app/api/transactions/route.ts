import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const accountId = searchParams.get('accountId');

        const where: any = {
            account: {
                userId: userId
            }
        };

        if (accountId) {
            where.accountId = accountId;
        }

        const transactions = await prisma.transaction.findMany({
            where,
            orderBy: { date: 'desc' },
            take: limit ? parseInt(limit) : undefined,
            include: {
                account: {
                    select: { name: true, type: true }
                }
            }
        });

        return NextResponse.json(transactions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { accountId, merchant, amount, type, category, date } = body;

        // Validation
        if (!accountId || !amount || !merchant || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify account belongs to user
        const account = await prisma.account.findUnique({
            where: { id: accountId }
        });

        if (!account || account.userId !== userId) {
            return NextResponse.json({ error: 'Account not found or unauthorized' }, { status: 403 });
        }

        // Use interactive transaction to ensure balance matches history
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create the transaction record
            const transaction = await tx.transaction.create({
                data: {
                    accountId,
                    merchant,
                    amount: parseFloat(amount),
                    type, // 'incoming' or 'outgoing'
                    category: category || 'General',
                    date: date ? new Date(date) : new Date(),
                    status: 'success'
                }
            });

            // 2. Update the account balance
            const balanceChange = type === 'incoming' ? parseFloat(amount) : -parseFloat(amount);

            await tx.account.update({
                where: { id: accountId },
                data: {
                    balance: {
                        increment: balanceChange
                    }
                }
            });

            return transaction;
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Transaction error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
