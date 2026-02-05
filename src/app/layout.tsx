import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { UserProvider } from '@/context/UserContext';
import AppLayout from '@/components/AppLayout';
import { ClerkProvider } from '@clerk/nextjs';

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
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <UserProvider>
            <SidebarProvider>
              <AppLayout>{children}</AppLayout>
            </SidebarProvider>
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
