import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const bills = await prisma.bill.findMany({
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
