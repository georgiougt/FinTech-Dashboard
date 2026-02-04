import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@libsql/client';

export const dynamic = 'force-dynamic';

export async function GET() {
    const urlStr = process.env.DATABASE_URL?.trim();
    const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

    const result: any = {
        config: {
            urlSet: !!urlStr,
            tokenSet: !!authToken,
        }
    };

    try {
        if (urlStr) {
            // Parse URL to get host
            // Handle libsql:// by treating it as https:// for parsing purposes if needed
            const parsableUrl = urlStr.replace(/^(libsql|wss):/i, 'https:');
            const urlObj = new URL(parsableUrl);
            const host = urlObj.hostname;
            const protocol = urlObj.protocol;

            result.config.parsed = {
                host: host,
                protocol: protocol
            };

            // Test 3: Raw HTTP Fetch (The "Truth" Test)
            try {
                const endpoint = `https://${host}/v2/pipeline`;
                result.rawFetch = { endpoint };

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        requests: [
                            { type: "execute", stmt: { sql: "SELECT 1 as val" } },
                            { type: "close" }
                        ]
                    })
                });

                result.rawFetch.status = response.status;
                result.rawFetch.statusText = response.statusText;

                const text = await response.text();
                try {
                    result.rawFetch.body = JSON.parse(text);
                } catch {
                    result.rawFetch.bodyRaw = text;
                }

            } catch (fetchErr: any) {
                result.rawFetch = {
                    status: 'ClientError',
                    error: fetchErr.message
                };
            }
        }

    } catch (e: any) {
        result.error = e.message;
    }

    return NextResponse.json(result, { status: 200 });
}
