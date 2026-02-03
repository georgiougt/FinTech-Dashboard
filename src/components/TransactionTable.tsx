import { Transaction } from '@/lib/data';
import styles from './TransactionTable.module.css';
import StatusChip from './StatusChip';
import clsx from 'clsx';

const CategoryIcon = ({ category }: { category: string }) => {
    const icons: Record<string, string> = {
        'Food': '🍜',
        'Transport': '🚇',
        'Shopping': '🛍️',
        'Entertainment': '🎬',
        'Utilities': '⚡',
        'Health': '🏥',
        'Salary': '💰',
        'Investment': '📈',
        'Subscription': '🔄',
        'Software': '💻',
        'Other': '📦',
    };
    return <span style={{ fontSize: '20px' }}>{icons[category] || icons['Other']}</span>;
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
                            <td className="text-gofun">{t.date}</td>
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
