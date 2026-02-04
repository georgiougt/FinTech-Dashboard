import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const accounts = await prisma.account.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { transactions: true, cards: true }
                }
            }
        });
        return NextResponse.json(accounts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();

        if (!body.name || !body.type) {
            return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
        }

        // Generate a random 4 digit account number for demo purposes
        const accountNumber = Math.floor(1000 + Math.random() * 9000).toString();

        const newAccount = await prisma.account.create({
            data: {
                userId,
                name: body.name,
                type: body.type,
                balance: 0, // Start with 0 balance
                accountNumber: accountNumber,
                currency: 'USD'
            }
        });

        return NextResponse.json(newAccount);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
