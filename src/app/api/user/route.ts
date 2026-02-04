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

        // Sync User to Database (Upsert)
        const dbUser = await prisma.user.upsert({
            where: { id: userId },
            update: {
                email: user.emailAddresses[0].emailAddress,
            },
            create: {
                id: userId,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName} ${user.lastName}`.trim() || 'New User',
                avatar: user.imageUrl,
                phone: null
            }
        });

        // Fetch counts manually since upsert doesn't support include easily in one go efficiently without extra query sometimes,
        // but let's just do a findUnique to get everything if needed, or return dbUser.
        // Actually, we need the counts for the UI logic likely?
        // Let's just return the user for now.

        return NextResponse.json(dbUser);
    } catch (error: any) {
        console.error('Error fetching user:', error);
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
                phone: body.phone,
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
