import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const url = process.env.DATABASE_URL?.trim();
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();

// Log the configuration (carefully masked)
console.log('DB Config:', {
    hasUrl: !!url,
    urlProtocol: url?.split(':')[0],
    hasToken: !!authToken,
    tokenLength: authToken?.length
});

const libsql = createClient({
    url: url?.replace(/^(libsql|wss):/i, 'https:') || 'file:./dev.db',
    authToken: authToken
})

const adapter = new PrismaLibSQL(libsql)

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
