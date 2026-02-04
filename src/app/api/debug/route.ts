import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    const checks: any = {
        databaseUrl: process.env.DATABASE_URL ? 'Set (Length: ' + process.env.DATABASE_URL.length + ')' : 'Missing',
        databaseUrlProtocol: process.env.DATABASE_URL?.split(':')[0] || 'N/A',
        authToken: process.env.TURSO_AUTH_TOKEN ? 'Set (Length: ' + process.env.TURSO_AUTH_TOKEN.length + ')' : 'Missing',
        nodeEnv: process.env.NODE_ENV,
    };

    try {
        // Check 1: Simple Raw Query
        // We use a try/catch here specifically for the query to ensure we capture the specific error
        let rawQuery = null;
        try {
            rawQuery = await prisma.$queryRaw`SELECT 1 as result`;
            checks.connection = 'Success';
            checks.rawQuery = rawQuery;
        } catch (dbErr: any) {
            checks.connection = 'Failed';
            checks.connectionError = dbErr.message;
        }

        // Check 2: Table Existence (User)
        if (checks.connection === 'Success') {
            try {
                const userCount = await prisma.user.count();
                checks.userTable = `Accessible (Count: ${userCount})`;
            } catch (e: any) {
                checks.userTable = `Error: ${e.message}`;
            }
        }

        // Check 3: Table Existence (Transactions)
        if (checks.connection === 'Success') {
            try {
                const txCount = await prisma.transaction.count();
                checks.transactionTable = `Accessible (Count: ${txCount})`;
            } catch (e: any) {
                checks.transactionTable = `Error: ${e.message}`;
            }
        }

        return NextResponse.json({ status: 'ok', checks }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack,
            checks
        }, { status: 500 });
    }
}
