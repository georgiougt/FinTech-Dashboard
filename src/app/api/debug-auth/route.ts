import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authData = await auth();
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        headers[key] = value;
    });

    return NextResponse.json({
        message: 'Auth Debug Info',
        auth: {
            userId: authData.userId,
            sessionId: authData.sessionId,
            // orgId: authData.orgId,
        },
        headers: {
            // Masking sensitive headers but checking presence
            cookie: headers['cookie'] ? 'Present (Length: ' + headers['cookie'].length + ')' : 'Missing',
            authorization: headers['authorization'] ? 'Present' : 'Missing',
            host: headers['host'],
            'user-agent': headers['user-agent']
        }
    });
}
