import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const accounts = await prisma.account.findMany({
            include: {
                transactions: {
                    take: 5,
                    orderBy: {
                        date: 'desc'
                    }
                },
                cards: true
            }
        });

        return NextResponse.json(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch accounts' },
            { status: 500 }
        );
    }
}
