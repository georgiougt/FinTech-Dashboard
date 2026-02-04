import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const email = user.emailAddresses[0].emailAddress;

        // Check if a user with this email already exists but has a different ID (e.g. old Demo User)
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUserByEmail && existingUserByEmail.id !== userId) {
            console.log(`Migrating legacy user ${existingUserByEmail.id} to Clerk user ${userId}`);

            // Perform Migration Transaction
            await prisma.$transaction(async (tx) => {
                // 1. Reassign Accounts
                await tx.account.updateMany({
                    where: { userId: existingUserByEmail.id },
                    data: { userId: userId }
                });

                // 2. Reassign Bills
                await tx.bill.updateMany({
                    where: { userId: existingUserByEmail.id },
                    data: { userId: userId }
                });

                // 3. Delete old user to free up the email
                await tx.user.delete({
                    where: { id: existingUserByEmail.id }
                });
            });
        }

        // Sync User to Database (Upsert) - Now safe from unique constraint
        const dbUser = await prisma.user.upsert({
            where: { id: userId },
            update: {
                email: email,
            },
            create: {
                id: userId,
                email: email,
                name: `${user.firstName} ${user.lastName}`.trim() || 'New User',
                avatar: user.imageUrl
            }
        });

        return NextResponse.json(dbUser);
    } catch (error: any) {
        console.error('Error fetching/syncing user:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();

        // Basic validation
        if (!body.name || !body.email) {
            return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
        }

        console.log('PATCH /api/user received:', body);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: body.name,
                email: body.email,
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
