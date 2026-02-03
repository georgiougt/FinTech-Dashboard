import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

// Only create adapter if DATABASE_URL is available
let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
    const libsql = createClient({
        url: process.env.DATABASE_URL
    });

    const adapter = new PrismaLibSql(libsql);

    const globalForPrisma = global as unknown as { prisma: PrismaClient };

    prisma = globalForPrisma.prisma || new PrismaClient({
        adapter,
        log: ['query'],
    });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} else {
    // Fallback for build time when DATABASE_URL might not be available
    prisma = new PrismaClient({
        log: ['query'],
    });
}

export { prisma };
