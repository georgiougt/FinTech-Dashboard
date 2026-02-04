import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEMO_USER_ID = 'u1';

export async function GET() {
    try {
        const bills = await prisma.bill.findMany({
            where: { userId: DEMO_USER_ID },
            orderBy: {
                dueDate: 'asc'
            }
        });

        return NextResponse.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bills' },
            { status: 500 }
        );
    }
}
