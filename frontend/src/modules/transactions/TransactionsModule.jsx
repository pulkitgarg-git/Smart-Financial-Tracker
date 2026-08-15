import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/client';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import { useFinanceData } from '../../context/FinanceDataContext';

export default function TransactionsModule() {
  const { refresh } = useFinanceData();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const txs = await api.getTransactions(filter || undefined);
      setTransactions(txs);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleAdded = async () => {
    await refresh();
    await loadTransactions();
  };

  return (
    <section className="module-transactions">
      <section className="hero-banner hero-banner--compact">
        <div className="hero-banner-content">
          <span className="hero-eyebrow">Ledger</span>
          <h2 className="hero-title">Transactions</h2>
          <p className="hero-text">
            Record income and expenses with categories. Filter the list by type
            below.
          </p>
        </div>
      </section>

      <TransactionForm onAdded={handleAdded} />
      {loading && <p className="loading-hint">Loading transactions…</p>}
      <TransactionList
        transactions={transactions}
        filter={filter}
        onFilterChange={setFilter}
      />
    </section>
  );
}
