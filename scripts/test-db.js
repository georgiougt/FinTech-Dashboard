
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing Prisma Connection...');
    try {
        const userCount = await prisma.user.count();
        console.log('Successfully connected! User count:', userCount);
    } catch (e) {
        console.error('Prisma Error:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
