"use client";

import { Search, Calendar, Bell } from 'lucide-react';
import styles from './Header.module.css';
import { useUser } from '@/context/UserContext';
import { USER_PROFILE } from '@/lib/data'; // Fallback

export default function Header() {
    const { user, loading } = useUser();
    const displayName = user?.name || USER_PROFILE.name;

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search transactions, accounts..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.actions}>
                <button className={styles.datePicker}>
                    <Calendar size={16} />
                    <span>Last 30 days</span>
                </button>

                <button className={styles.iconBtn}>
                    <Bell size={20} />
                    {USER_PROFILE.notificationCount > 0 && (
                        <span className={styles.notificationBadge} />
                    )}
                </button>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>
                        {/* Initials */}
                        {displayName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className={styles.userName}>
                        {loading ? '...' : displayName}
                    </span>
                </div>
            </div>
        </header>
    );
}
