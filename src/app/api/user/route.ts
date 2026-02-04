import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Since we don't have real auth yet, we'll grab the first user
// In a real app, this would get the ID from the session
const DEMO_USER_ID = 'u1';

export async function GET() {
    try {
        const user = await prisma.user.findUnique({
            where: { id: DEMO_USER_ID },
            include: {
                _count: {
                    select: { bills: true, accounts: true }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: DEMO_USER_ID },
            data: {
                name: body.name,
                email: body.email,
                // Add other fields here if your schema supports them (phone is not in schema yet)
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
