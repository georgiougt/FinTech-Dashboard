import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'API is reachable',
        env: {
            databaseUrlSet: !!process.env.DATABASE_URL,
            authTokenSet: !!process.env.TURSO_AUTH_TOKEN
        }
    }, { status: 200 });
}
