"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { api, Analytics, Transaction } from '@/lib/api';
import KPIStatCard from '@/components/KPIStatCard';
import TransactionTable from '@/components/TransactionTable';
import AlertsPanel from '@/components/AlertsPanel';
import CashflowChart from '@/components/CashflowChart';
import { DollarSign, TrendingDown, TrendingUp, Percent } from 'lucide-react';

export default function Overview() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsData, transactionsData] = await Promise.all([
          api.analytics.get(),
          api.transactions.getAll()
        ]);
        setAnalytics(analyticsData);
        setTransactions(transactionsData.slice(0, 5)); // Show only recent 5
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '60px', color: '#C9C1B8' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '60px', color: '#FF4D6D' }}>
          Failed to load data
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome back, Akira</h1>
        <p className={styles.welcomeSubtitle}>Here's what's happening with your finances today</p>
      </div>

      <div className={styles.kpiGrid}>
        <KPIStatCard
          label="Total Balance"
          value={`$${analytics.totalBalance.toLocaleString()}`}
          trend={8.2}
          icon={DollarSign}
        />
        <KPIStatCard
          label="Monthly Spend"
          value={`$${analytics.monthlySpend.toLocaleString()}`}
          trend={-12.5}
          positiveIsGood={false}
          icon={TrendingDown}
        />
        <KPIStatCard
          label="Incoming"
          value={`$${analytics.totalIncoming.toLocaleString()}`}
          trend={0}
          icon={TrendingUp}
        />
        <KPIStatCard
          label="Savings Rate"
          value={`${(analytics.savingsRate * 100).toFixed(1)}%`}
          trend={5.3}
          icon={Percent}
        />
      </div>

      <div className={styles.chartsGrid}>
        <CashflowChart />
        <AlertsPanel />
      </div>

      <div className={styles.transactionsSection}>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
