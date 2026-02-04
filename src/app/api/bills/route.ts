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

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.name || !body.amount || !body.dueDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newBill = await prisma.bill.create({
            data: {
                userId: DEMO_USER_ID,
                name: body.name,
                amount: parseFloat(body.amount),
                dueDate: body.dueDate, // Expecting string (e.g. "15th") or date string
                category: body.category || 'Utilities',
                logo: body.logo || null
            }
        });

        return NextResponse.json(newBill);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
