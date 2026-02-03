import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import AppLayout from '@/components/AppLayout';

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
        <SidebarProvider>
          <AppLayout>{children}</AppLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
