import { X } from 'lucide-react';
import styles from './Drawer.module.css';
import clsx from 'clsx';
import { useEffect } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <div
                className={clsx(styles.overlay, isOpen && styles.overlayOpen)}
                onClick={onClose}
            />
            <div className={clsx(styles.drawer, isOpen && styles.drawerOpen)}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
    );
}
