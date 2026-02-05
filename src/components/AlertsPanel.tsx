import styles from './AlertsPanel.module.css';
import { AlertCircle, TrendingUp, Bell } from 'lucide-react';
import clsx from 'clsx';

interface Alert {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'warning' | 'info' | 'success';
}

interface AlertsPanelProps {
    alerts?: Alert[];
}

export default function AlertsPanel({ alerts = [] }: AlertsPanelProps) {
    return (
        <div className={clsx('card', styles.panel)} style={{ minHeight: '320px' }}>
            <h3 className={styles.header}>Alerts & Insights</h3>

            {alerts.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 0', opacity: 0.5 }}>
                    <div style={{ padding: '16px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                        <Bell size={24} />
                    </div>
                    <p style={{ color: '#C9C1B8', fontSize: '14px' }}>No new alerts</p>
                </div>
            ) : (
                <div className={styles.alertList}>
                    {alerts.map(alert => (
                        <div key={alert.id} className={styles.alertItem}>
                            <div className={styles.alertIcon} style={{
                                color: alert.type === 'warning' ? '#FF4D6D' : alert.type === 'success' ? '#2BB673' : '#C8A44D',
                                background: alert.type === 'warning' ? 'rgba(255, 77, 109, 0.15)' : alert.type === 'success' ? 'rgba(43, 182, 115, 0.15)' : 'rgba(200, 164, 77, 0.15)'
                            }}>
                                {alert.type === 'warning' ? <AlertCircle size={18} /> : alert.type === 'success' ? <Bell size={18} /> : <TrendingUp size={18} />}
                            </div>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>
                                    {alert.title}
                                    {alert.type === 'warning' && <span className={styles.importantTag}>Important</span>}
                                </div>
                                <div className={styles.alertMessage}>
                                    {alert.message}
                                </div>
                                <div className={styles.alertTime}>{alert.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
