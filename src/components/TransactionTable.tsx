import { Transaction } from '@/lib/data';
import styles from './TransactionTable.module.css';
import StatusChip from './StatusChip';
import clsx from 'clsx';
import { 
    Utensils, 
    Train, 
    ShoppingBag, 
    Film, 
    Zap, 
    HeartPulse, 
    DollarSign, 
    TrendingUp, 
    Repeat, 
    Laptop, 
    Package 
} from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
    const iconProps = { size: 18, strokeWidth: 2 };
    const icons: Record<string, React.ReactNode> = {
        'Food': <Utensils {...iconProps} />,
        'Transport': <Train {...iconProps} />,
        'Shopping': <ShoppingBag {...iconProps} />,
        'Entertainment': <Film {...iconProps} />,
        'Utilities': <Zap {...iconProps} />,
        'Health': <HeartPulse {...iconProps} />,
        'Salary': <DollarSign {...iconProps} />,
        'Investment': <TrendingUp {...iconProps} />,
        'Subscription': <Repeat {...iconProps} />,
        'Software': <Laptop {...iconProps} />,
        'Other': <Package {...iconProps} />,
    };
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-shiro)' }}>
            {icons[category] || icons['Other']}
        </span>
    );
};

export default function TransactionTable({ transactions, title = "Recent Transactions" }: { transactions: Transaction[], title?: string }) {
    return (
        <div className={clsx('card', styles.container)}>
            <div className={styles.header}>{title}</div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Merchant</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>
                                <div className={styles.merchantIcon}>
                                    <div className={styles.iconPlaceholder}>
                                        <CategoryIcon category={t.category} />
                                    </div>
                                    <div>
                                        <div>{t.merchant}</div>
                                        <div className={styles.categoryTag}>{t.category}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="text-gofun">{new Date(t.date).toLocaleDateString()}</td>
                            <td><StatusChip status={t.status} /></td>
                            <td className={t.type === 'incoming' ? styles.amountIncoming : styles.amountOutgoing}>
                                {t.type === 'incoming' ? '+' : ''}${t.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
