import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Create User
    const user = await prisma.user.upsert({
        where: { email: 'akira@example.com' },
        update: {},
        create: {
            email: 'akira@example.com',
            name: 'Akira Kurosawa',
            avatar: '/avatars/akira.jpg',
        },
    })

    console.log({ user })

    // 2. Create Accounts
    const accountsData = [
        { id: '1', name: 'Main Checking', type: 'Checking', balance: 12450.00, accountNumber: '4421', currency: 'USD' },
        { id: '2', name: 'Emergency Fund', type: 'Savings', balance: 35000.00, accountNumber: '8812', currency: 'USD' },
        { id: '3', name: 'Studio Ventures', type: 'Business', balance: 8450.20, accountNumber: '1102', currency: 'USD' },
        { id: '4', name: 'Bitcoin Cold Storage', type: 'Crypto', balance: 5441.25, accountNumber: 'BTC', currency: 'BTC' },
    ]

    for (const acc of accountsData) {
        await prisma.account.upsert({
            where: { id: acc.id },
            update: {},
            create: {
                id: acc.id,
                name: acc.name,
                type: acc.type,
                balance: acc.balance,
                accountNumber: acc.accountNumber,
                currency: acc.currency,
                userId: user.id,
            },
        })
    }
    console.log('Accounts seeded')

    // 3. Create Transactions
    const transactionsData = [
        { id: 't1', merchant: 'Starbucks Tokyo', category: 'Food', date: new Date('2026-02-03'), amount: 8.50, status: 'success', type: 'outgoing', accountId: '1' },
        { id: 't2', merchant: 'Amazon Japan', category: 'Shopping', date: new Date('2026-02-03'), amount: 142.30, status: 'success', type: 'outgoing', accountId: '1' },
        { id: 't3', merchant: 'Salary Deposit', category: 'Salary', date: new Date('2026-02-01'), amount: 5250.00, status: 'success', type: 'incoming', accountId: '1' },
        { id: 't4', merchant: 'JR East', category: 'Transport', date: new Date('2026-02-02'), amount: 12.80, status: 'success', type: 'outgoing', accountId: '1' },
        { id: 't5', merchant: 'Uber Eats', category: 'Food', date: new Date('2026-02-02'), amount: 23.40, status: 'pending', type: 'outgoing', accountId: '1' },
        { id: 't6', merchant: 'Tokyo Gas', category: 'Utilities', date: new Date('2026-02-01'), amount: 85.00, status: 'success', type: 'outgoing', accountId: '1' },
        { id: 't7', merchant: 'Netflix', category: 'Entertainment', date: new Date('2026-02-01'), amount: 17.99, status: 'success', type: 'outgoing', accountId: '1' },
        { id: 't8', merchant: 'Apple One', category: 'Subscription', date: new Date('2026-01-30'), amount: 29.95, status: 'failed', type: 'outgoing', accountId: '1' },
    ]

    for (const tx of transactionsData) {
        await prisma.transaction.upsert({
            where: { id: tx.id },
            update: {},
            create: {
                ...tx
            },
        })
    }
    console.log('Transactions seeded')

    // 4. Create Bills
    const billsData = [
        { id: 'b1', name: 'Netflix', amount: 17.99, dueDate: '2026-03-01', category: 'Entertainment' },
        { id: 'b2', name: 'Adobe Creative Cloud', amount: 54.99, dueDate: '2026-02-28', category: 'Software' },
        { id: 'b3', name: 'Tokyo Electric Power', amount: 120.50, dueDate: '2026-02-25', category: 'Utilities' },
        { id: 'b4', name: 'Gym Membership', amount: 45.00, dueDate: '2026-02-15', category: 'Health' },
    ]

    for (const bill of billsData) {
        await prisma.bill.upsert({
            where: { id: bill.id },
            update: {},
            create: {
                ...bill,
                userId: user.id
            }
        })
    }
    console.log('Bills seeded')

    // 5. Create Cards
    const cardsData = [
        {
            id: 'c1',
            name: 'Premium Platinum',
            last4: '4532',
            holder: 'AKIRA KUROSAWA',
            expiry: '12/28',
            network: 'visa',
            limit: 10000,
            spent: 3245.80,
            color: 'from-[#FF4D6D] to-[#D81E5B]',
            isVirtual: false,
            isFrozen: false,
            accountId: '1'
        },
        {
            id: 'c2',
            name: 'Business Gold',
            last4: '8291',
            holder: 'STUDIO VENTURES',
            expiry: '08/30',
            network: 'mastercard',
            limit: 25000,
            spent: 8920.45,
            color: 'from-[#C8A44D] to-[#9A7B3A]',
            isVirtual: false,
            isFrozen: false,
            accountId: '3'
        },
        {
            id: 'c3',
            name: 'Virtual Card',
            last4: '7234',
            holder: 'AKIRA KUROSAWA',
            expiry: '05/27',
            network: 'visa',
            limit: 5000,
            spent: 1234.56,
            color: 'from-[#1B2A41] to-[#0B0F14]',
            isVirtual: true,
            isFrozen: false,
            accountId: '1'
        }
    ]

    for (const card of cardsData) {
        await prisma.card.upsert({
            where: { id: card.id },
            update: {},
            create: {
                ...card
            }
        })
    }
    console.log('Cards seeded')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
