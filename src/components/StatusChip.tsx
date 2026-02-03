import styles from './StatusChip.module.css';
import clsx from 'clsx';
import { TransactionStatus } from '@/lib/data';

export default function StatusChip({ status }: { status: TransactionStatus }) {
    return (
        <span className={clsx(styles.chip, styles[status])}>
            {status}
        </span>
    );
}
