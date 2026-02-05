import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const cards = await prisma.card.findMany({
            where: {
                account: {
                    userId: userId
                }
            },
            include: {
                account: {
                    select: {
                        name: true,
                        type: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(cards);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { accountId, type, limit } = body;

        if (!accountId) {
            return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
        }

        // Verify account belongs to user
        const account = await prisma.account.findUnique({
            where: { id: accountId }
        });

        if (!account || account.userId !== userId) {
            return NextResponse.json({ error: 'Account not found or unauthorized' }, { status: 403 });
        }

        // Generate random card details
        const last4 = Math.floor(1000 + Math.random() * 9000).toString();
        const expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 3);
        const expiryString = `${(expiry.getMonth() + 1).toString().padStart(2, '0')}/${expiry.getFullYear().toString().slice(-2)}`;

        const newCard = await prisma.card.create({
            data: {
                name: `${type || 'Virtual'} Card`,
                last4,
                holder: 'VALUED MEMBER', // We could fetch user name but this is standard
                expiry: expiryString,
                network: 'visa',
                limit: limit ? parseFloat(limit) : 1000,
                color: `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`,
                isVirtual: true,
                accountId
            }
        });

        return NextResponse.json(newCard);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function getRandomColor() {
    const colors = ['#FF4D6D', '#2BB673', '#C8A44D', '#8B5CF6', '#1B2A41'];
    return colors[Math.floor(Math.random() * colors.length)];
}
