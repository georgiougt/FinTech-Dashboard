import styles from './CreditCardVisual.module.css';

interface CardProps {
    last4: string;
    holder: string;
    expiry: string;
    color?: string; // Could be used to vary card colors
}

export default function CreditCardVisual({ last4, holder, expiry }: CardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.glow} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={styles.chip} />
                <div className={styles.logo}>VISA</div>
            </div>

            <div className={styles.number}>•••• •••• •••• {last4}</div>

            <div className={styles.footer}>
                <div>
                    <div style={{ fontSize: '10px', opacity: 0.6, marginBottom: '2px' }}>CARD HOLDER</div>
                    <div className={styles.holder}>{holder}</div>
                </div>
                <div>
                    <div style={{ fontSize: '10px', opacity: 0.6, marginBottom: '2px' }}>EXPIRES</div>
                    <div className={styles.expiry}>{expiry}</div>
                </div>
            </div>
        </div>
    );
}
