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
    ChevronLeft
} from 'lucide-react';
import styles from './Sidebar.module.css';
import clsx from 'clsx';

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

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>金</div>
                <span>Kintsugi</span>
            </div>

            <nav className={styles.nav}>
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(styles.navItem, isActive && styles.navItemActive)}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={styles.navItem}>
                    <ChevronLeft size={20} />
                    <span>Collapse</span>
                </button>
            </div>
        </aside>
    );
}
