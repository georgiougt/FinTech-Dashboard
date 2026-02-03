-- SQL migration for Turso database
-- Run this with: turso db shell [your-database-name] < prisma/turso-setup.sql

-- Create User table
CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Account table
CREATE TABLE IF NOT EXISTS Account (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    balance REAL NOT NULL,
    accountNumber TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    userId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Create Transaction table
CREATE TABLE IF NOT EXISTS Transaction (
    id TEXT PRIMARY KEY,
    merchant TEXT NOT NULL,
    category TEXT NOT NULL,
    date DATETIME NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL,
    accountId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (accountId) REFERENCES Account(id)
);

-- Create Card table
CREATE TABLE IF NOT EXISTS Card (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    last4 TEXT NOT NULL,
    holder TEXT NOT NULL,
    expiry TEXT NOT NULL,
    network TEXT NOT NULL,
    "limit" REAL DEFAULT 0,
    spent REAL DEFAULT 0,
    color TEXT NOT NULL,
    isVirtual INTEGER DEFAULT 0,
    isFrozen INTEGER DEFAULT 0,
    accountId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (accountId) REFERENCES Account(id)
);

-- Create Bill table
CREATE TABLE IF NOT EXISTS Bill (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    dueDate TEXT NOT NULL,
    category TEXT NOT NULL,
    logo TEXT,
    userId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id)
);
