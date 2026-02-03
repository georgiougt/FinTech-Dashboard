"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    Wallet,
    ArrowRightLeft,
    CreditCard,
    PieChart,
    Receipt,
    Settings,
    ChevronLeft,
    ChevronRight // Added right chevron
} from 'lucide-react';
import styles from './Sidebar.module.css';
import clsx from 'clsx';
import { useSidebar } from '@/context/SidebarContext'; // Import context

const MENU_ITEMS = [
    { name: 'Overview', path: '/', icon: LayoutGrid },
    { name: 'Accounts', path: '/accounts', icon: Wallet },
    { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Cards', path: '/cards', icon: CreditCard },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
    { name: 'Bills', path: '/bills', icon: Receipt },
    { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar(); // Consume context

    return (
        <aside className={clsx(styles.sidebar, isCollapsed && styles.collapsed)}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>金</div>
                {!isCollapsed && <span>Kintsugi</span>}
            </div>

            <nav className={styles.nav}>
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(styles.navItem, isActive && styles.navItemActive)}
                            title={isCollapsed ? item.name : undefined} // Tooltip on collapse
                        >
                            <item.icon size={20} />
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={styles.navItem} onClick={toggleSidebar}>
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!isCollapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
