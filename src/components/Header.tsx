"use client";

import { Search, Calendar, Bell } from 'lucide-react';
import styles from './Header.module.css';
import { USER_PROFILE } from '@/lib/data';

export default function Header() {
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
                        {USER_PROFILE.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={styles.userName}>{USER_PROFILE.name}</span>
                </div>
            </div>
        </header>
    );
}
