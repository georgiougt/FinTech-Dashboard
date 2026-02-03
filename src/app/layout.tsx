import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kintsugi FinTech Dashboard',
  description: 'Modern Japanese-inspired FinTech Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: '260px' }}>
            <Header />
            <main style={{ padding: '0 40px 40px 40px' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
