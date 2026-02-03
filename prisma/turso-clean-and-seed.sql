-- CLEAN AND SEED SCRIPT
-- Run this entire script to reset your database and load fresh data.

-- 1. CLEANUP (Delete in reverse dependency order)
DELETE FROM Transactions;
DELETE FROM Card;
DELETE FROM Bill;
DELETE FROM Account;
DELETE FROM User;

-- 2. INSERT DATA (Insert in dependency order)

-- Insert User
INSERT INTO User (id, name, email, avatar, createdAt) VALUES 
('u1', 'Akira Kurosawa', 'akira@example.com', '/avatars/akira.jpg', CURRENT_TIMESTAMP);

-- Insert Accounts
INSERT INTO Account (id, name, type, balance, accountNumber, currency, userId, createdAt) VALUES 
('1', 'Main Checking', 'Checking', 12450.00, '4421', 'USD', 'u1', CURRENT_TIMESTAMP),
('2', 'Emergency Fund', 'Savings', 35000.00, '8812', 'USD', 'u1', CURRENT_TIMESTAMP),
('3', 'Studio Ventures', 'Business', 8450.20, '1102', 'USD', 'u1', CURRENT_TIMESTAMP),
('4', 'Bitcoin Cold Storage', 'Crypto', 5441.25, 'BTC', 'BTC', 'u1', CURRENT_TIMESTAMP);

-- Insert Transactions
INSERT INTO Transactions (id, merchant, category, date, amount, status, type, accountId, createdAt) VALUES 
('t1', 'Starbucks Tokyo', 'Food', '2026-02-03T00:00:00.000Z', 8.50, 'success', 'outgoing', '1', CURRENT_TIMESTAMP),
('t2', 'Amazon Japan', 'Shopping', '2026-02-03T00:00:00.000Z', 142.30, 'success', 'outgoing', '1', CURRENT_TIMESTAMP),
('t3', 'Salary Deposit', 'Salary', '2026-02-01T00:00:00.000Z', 5250.00, 'success', 'incoming', '1', CURRENT_TIMESTAMP),
('t4', 'JR East', 'Transport', '2026-02-02T00:00:00.000Z', 12.80, 'success', 'outgoing', '1', CURRENT_TIMESTAMP),
('t5', 'Uber Eats', 'Food', '2026-02-02T00:00:00.000Z', 23.40, 'pending', 'outgoing', '1', CURRENT_TIMESTAMP),
('t6', 'Tokyo Gas', 'Utilities', '2026-02-01T00:00:00.000Z', 85.00, 'success', 'outgoing', '1', CURRENT_TIMESTAMP),
('t7', 'Netflix', 'Entertainment', '2026-02-01T00:00:00.000Z', 17.99, 'success', 'outgoing', '1', CURRENT_TIMESTAMP),
('t8', 'Apple One', 'Subscription', '2026-01-30T00:00:00.000Z', 29.95, 'failed', 'outgoing', '1', CURRENT_TIMESTAMP);

-- Insert Bills
INSERT INTO Bill (id, name, amount, dueDate, category, logo, userId, createdAt) VALUES 
('b1', 'Netflix', 17.99, '2026-03-01', 'Entertainment', NULL, 'u1', CURRENT_TIMESTAMP),
('b2', 'Adobe Creative Cloud', 54.99, '2026-02-28', 'Software', NULL, 'u1', CURRENT_TIMESTAMP),
('b3', 'Tokyo Electric Power', 120.50, '2026-02-25', 'Utilities', NULL, 'u1', CURRENT_TIMESTAMP),
('b4', 'Gym Membership', 45.00, '2026-02-15', 'Health', NULL, 'u1', CURRENT_TIMESTAMP);

-- Insert Cards
INSERT INTO Card (id, name, last4, holder, expiry, network, "limit", spent, color, isVirtual, isFrozen, accountId, createdAt) VALUES 
('c1', 'Premium Platinum', '4532', 'AKIRA KUROSAWA', '12/28', 'visa', 10000, 3245.80, 'from-[#FF4D6D] to-[#D81E5B]', 0, 0, '1', CURRENT_TIMESTAMP),
('c2', 'Business Gold', '8291', 'STUDIO VENTURES', '08/30', 'mastercard', 25000, 8920.45, 'from-[#C8A44D] to-[#9A7B3A]', 0, 0, '3', CURRENT_TIMESTAMP),
('c3', 'Virtual Card', '7234', 'AKIRA KUROSAWA', '05/27', 'visa', 5000, 1234.56, 'from-[#1B2A41] to-[#0B0F14]', 1, 0, '1', CURRENT_TIMESTAMP);
