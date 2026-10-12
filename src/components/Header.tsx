"use client";

import { Search, Calendar, Bell } from 'lucide-react';
import Image from 'next/image';
import styles from './Header.module.css';
import { useUser } from '@/context/UserContext';
import { USER_PROFILE } from '@/lib/data';

export default function Header() {
    const { user, loading } = useUser();
    const displayName = user?.name || USER_PROFILE.name;
    const avatarUrl = USER_PROFILE.avatar;

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search transactions, accounts, payees..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.actions}>
                <button className={styles.datePicker}>
                    <Calendar size={16} />
                    <span>Last 30 days</span>
                </button>

                <button className={styles.iconBtn} aria-label="Notifications">
                    <Bell size={20} />
                    {USER_PROFILE.notificationCount > 0 && (
                        <span className={styles.notificationBadge} />
                    )}
                </button>

                <div className={styles.userProfile}>
                    <div className={styles.avatar} style={{ overflow: 'hidden', position: 'relative', border: '1.5px solid var(--color-kintsugi-gold)' }}>
                        <Image
                            src={avatarUrl}
                            alt={displayName}
                            width={36}
                            height={36}
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <span className={styles.userName}>
                        {loading ? '...' : displayName}
                    </span>
                </div>
            </div>
        </header>
    );
}
