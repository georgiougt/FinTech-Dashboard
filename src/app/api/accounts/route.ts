import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// TODO: Replace with real auth session
const DEMO_USER_ID = 'u1';

export async function GET() {
    try {
        const accounts = await prisma.account.findMany({
            where: { userId: DEMO_USER_ID },
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
        const body = await request.json();

        if (!body.name || !body.type) {
            return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
        }

        // Generate a random 4 digit account number for demo purposes
        const accountNumber = Math.floor(1000 + Math.random() * 9000).toString();

        const newAccount = await prisma.account.create({
            data: {
                userId: DEMO_USER_ID,
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
