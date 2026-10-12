import styles from './CreditCardVisual.module.css';
import { Wifi } from 'lucide-react';

interface CardProps {
    last4: string;
    holder: string;
    expiry: string;
    color?: string;
}

export default function CreditCardVisual({ last4, holder, expiry, color }: CardProps) {
    return (
        <div className={styles.container} style={color ? { background: color } : undefined}>
            <div className={styles.glow} />
            <div className={styles.hologramShine} />

            <div className={styles.chipRow}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={styles.chip} />
                    <Wifi size={18} className={styles.contactless} style={{ transform: 'rotate(90deg)' }} />
                </div>
                <div className={styles.logoBadge}>
                    <div className={styles.logo}>VISA</div>
                    <div className={styles.tier}>WORLD ELITE</div>
                </div>
            </div>

            <div className={styles.number}>•••• •••• •••• {last4}</div>

            <div className={styles.footer}>
                <div>
                    <div style={{ fontSize: '9px', opacity: 0.6, letterSpacing: '1px', marginBottom: '2px', color: '#C9C1B8' }}>CARDHOLDER</div>
                    <div className={styles.holder}>{holder}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '9px', opacity: 0.6, letterSpacing: '1px', marginBottom: '2px', color: '#C9C1B8' }}>EXPIRES</div>
                    <div className={styles.expiry}>{expiry}</div>
                </div>
            </div>
        </div>
    );
}
