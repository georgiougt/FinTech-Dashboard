import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import styles from './KPIStatCard.module.css';
import clsx from 'clsx';

interface KPIStatCardProps {
    label: string;
    value: string;
    trend: number; // percentage
    trendLabel?: string;
    icon?: LucideIcon;
    positiveIsGood?: boolean; // e.g. for spend, positive trend might be bad
}

export default function KPIStatCard({
    label,
    value,
    trend,
    trendLabel = 'vs last period',
    icon: Icon,
    positiveIsGood = true
}: KPIStatCardProps) {
    const isPositive = trend >= 0;
    const isGood = positiveIsGood ? isPositive : !isPositive;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <div className={clsx('card', styles.card)}>
            <div>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
                <div className={clsx(styles.trend, isGood ? styles.trendPositive : styles.trendNegative)}>
                    <TrendIcon size={16} />
                    <span>{Math.abs(trend)}% {trendLabel}</span>
                </div>
            </div>
            {Icon && (
                <div className={styles.icon}>
                    <Icon size={24} />
                </div>
            )}
        </div>
    );
}
