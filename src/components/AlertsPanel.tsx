import styles from './AlertsPanel.module.css';
import { AlertCircle, TrendingUp, Bell } from 'lucide-react';
import clsx from 'clsx';

export default function AlertsPanel() {
    return (
        <div className={clsx('card', styles.panel)}>
            <h3 className={styles.header}>Alerts & Insights</h3>

            <div className={styles.alertItem}>
                <div className={styles.alertIcon} style={{ color: '#FF4D6D', background: 'rgba(255, 77, 109, 0.15)' }}>
                    <AlertCircle size={18} />
                </div>
                <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>
                        Unusual spend detected
                        <span className={styles.importantTag}>Important</span>
                    </div>
                    <div className={styles.alertMessage}>
                        Your spending is 40% higher than usual this week
                    </div>
                    <div className={styles.alertTime}>2 hours ago</div>
                </div>
            </div>

            <div className={styles.alertItem}>
                <div className={styles.alertIcon} style={{ color: '#FF4D6D', background: 'rgba(255, 77, 109, 0.15)' }}>
                    <TrendingUp size={18} />
                </div>
                <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>
                        Subscription increased
                    </div>
                    <div className={styles.alertMessage}>
                        Netflix increased from $15.99 to $17.99
                    </div>
                    <div className={styles.alertTime}>1 day ago</div>
                </div>
            </div>

            <div className={styles.alertItem}>
                <div className={styles.alertIcon}>
                    <Bell size={18} />
                </div>
                <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>
                        Budget on track
                    </div>
                    <div className={styles.alertMessage}>
                        You're on track to save $800 this month
                    </div>
                    <div className={styles.alertTime}>2 days ago</div>
                </div>
            </div>
        </div>
    );
}
