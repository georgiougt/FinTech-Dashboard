# Kintsugi FinTech Dashboard

A modern, frontend-only FinTech dashboard with a Japanese "Tokyo Night" aesthetic.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Vanilla CSS (CSS Modules) + CSS Variables
- **Icons**: Lucide React
- **Charts**: Recharts

## Setup & Run

1. Open the terminal.
2. Navigate to the project directory:
   ```bash
   cd app
   ```
3. Install dependencies (if not already):
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Design System

The Japanese theme is defined in `src/app/globals.css`.
- **Sumi Ink (#0B0F14)**: Background
- **Aizome Indigo (#1B2A41)**: Cards/Nav
- **Sakura Pink (#FF4D6D)**: Primary Accents
- **Kintsugi Gold (#C8A44D)**: Premium Highlights

## Features Implemented
- **Overview**: KPI cards, Cashflow Chart, Recent Transactions.
- **Accounts**: List of accounts with "Add Account" modal.
- **Transactions**: Full history with filter UI and details drawer.
- **Cards**: Visual card carousel and management options.
- **Analytics**: Spend breakdown and merchant leaderboard.
- **Bills**: Subscription tracker and timeline.
- **Settings**: Profile and preferences (Dark mode locked on).
