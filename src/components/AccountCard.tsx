import styles from './AccountCard.module.css';
import { Account } from '@/lib/data';
import { Wallet, Landmark, Briefcase, Bitcoin } from 'lucide-react';
import clsx from 'clsx';

const AccountIcon = ({ type }: { type: Account['type'] }) => {
    switch (type) {
        case 'Savings': return <Landmark size={20} />;
        case 'Business': return <Briefcase size={20} />;
        case 'Crypto': return <Bitcoin size={20} />;
        default: return <Wallet size={20} />;
    }
};

export default function AccountCard({ account }: { account: Account }) {
    return (
        <div className={clsx('card', styles.card)}>
            <div className={styles.top}>
                <div>
                    <div className={styles.type}>{account.type}</div>
                    <div className={styles.name}>{account.name}</div>
                </div>
                <div className={styles.icon}>
                    <AccountIcon type={account.type} />
                </div>
            </div>

            <div>
                <div className={styles.balanceLabel}>Available Balance</div>
                <div className={styles.balance}>${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>

            <div className={styles.footer}>
                <div className={styles.number}>•••• {account.accountNumber}</div>
                <button className={styles.actionBtn}>Transfer</button>
            </div>
        </div>
    );
}
