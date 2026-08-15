import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { api } from '../api/client';
import { currentYearMonth } from '../utils/format';

const FinanceDataContext = createContext(null);

export function FinanceDataProvider({ children }) {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const [overall, txs] = await Promise.all([
        api.getSummary(),
        api.getTransactions(),
      ]);
      setSummary(overall);
      setTransactions(txs);
    } catch (err) {
      setError(err.message || 'Failed to load financial data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshOnMount = useCallback(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      summary,
      transactions,
      recentTransactions: transactions.slice(0, 6),
      loading,
      error,
      refresh,
      refreshOnMount,
      yearMonth: currentYearMonth(),
    }),
    [summary, transactions, loading, error, refresh, refreshOnMount],
  );

  return (
    <FinanceDataContext.Provider value={value}>
      {children}
    </FinanceDataContext.Provider>
  );
}

export function useFinanceData() {
  const ctx = useContext(FinanceDataContext);
  if (!ctx) {
    throw new Error('useFinanceData must be used within FinanceDataProvider');
  }
  return ctx;
}
