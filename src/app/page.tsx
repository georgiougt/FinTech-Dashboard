"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { api, Analytics, Transaction } from '@/lib/api';
import KPIStatCard from '@/components/KPIStatCard';
import TransactionTable from '@/components/TransactionTable';
import AlertsPanel from '@/components/AlertsPanel';
import CashflowChart from '@/components/CashflowChart';
import { DollarSign, TrendingDown, TrendingUp, Percent } from 'lucide-react';

import { useUser } from '@/context/UserContext';

export default function Overview() {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      } catch (error: any) {
        console.error('Data fetch error details:', error);
        setErrorMsg(error.message || 'Unknown error occurred');
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
          <h3>Failed to load data</h3>
          <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
            Please check your internet connection or try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
        <p className={styles.welcomeSubtitle}>Here's what's happening with your finances today</p>
      </div>

      <div className={styles.kpiGrid}>
        <KPIStatCard
          label="Total Balance"
          value={`$${analytics.totalBalance.toLocaleString()}`}
          trend={0}
          icon={DollarSign}
        />
        <KPIStatCard
          label="Monthly Spend"
          value={`$${analytics.monthlySpend.toLocaleString()}`}
          trend={0}
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
          trend={0}
          icon={Percent}
        />
      </div>

      <div className={styles.chartsGrid}>
        <CashflowChart data={analytics.dailyActivity} />
        <AlertsPanel />
      </div>

      <div className={styles.transactionsSection}>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
