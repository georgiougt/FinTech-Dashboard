import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@libsql/client';

export const dynamic = 'force-dynamic';

export async function GET() {
    const url = process.env.DATABASE_URL?.trim();
    const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

    // Masking checks for safety
    const checks: any = {
        config: {
            urlPresent: !!url,
            // Show start of protocol
            urlProtocol: url?.split(':')[0],
            tokenPresent: !!authToken,
            tokenLength: authToken?.length
        }
    };

    try {
        // Test 1: Direct LibSQL Client (Bypassing Prisma)
        // This isolates if the issue is the network/client or Prisma itself
        try {
            // Force https for the direct client test to match what we think should work
            const directUrl = url?.replace(/^(libsql|wss):/i, 'https:') || 'file:./dev.db';
            checks.usedUrlForDirectTest = directUrl.split(':')[0] + '://...'; // Log protocol only

            const client = createClient({
                url: directUrl,
                authToken: authToken
            });

            const result = await client.execute("SELECT 1 as val");
            checks.directLibSql = {
                status: 'Success',
                result: result.rows[0]
            };
        } catch (libSqlErr: any) {
            checks.directLibSql = {
                status: 'Failed',
                error: libSqlErr.message,
                code: libSqlErr.code
            };
        }

        // Test 2: Prisma Connection
        try {
            const prismaResult = await prisma.$queryRaw`SELECT 1 as result`;
            checks.prisma = {
                status: 'Success',
                result: prismaResult
            };
        } catch (prismaErr: any) {
            checks.prisma = {
                status: 'Failed',
                error: prismaErr.message
            };
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
