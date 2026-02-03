"use client";

import { useSidebar } from '@/context/SidebarContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div
                style={{
                    flex: 1,
                    marginLeft: isCollapsed ? '80px' : '260px',
                    transition: 'margin-left 0.3s ease'
                }}
            >
                <Header />
                <main style={{ padding: '0 40px 40px 40px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
