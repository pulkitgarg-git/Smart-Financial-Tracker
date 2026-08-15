import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api/client';
import CategoryBreakdown from '../../components/CategoryBreakdown';
import MonthlySummaryPanel from '../../components/MonthlySummaryPanel';
import SummaryCards from '../../components/SummaryCards';
import { currentYearMonth, todayIso } from '../../utils/format';

export default function AnalyticsModule() {
  const [summary, setSummary] = useState(null);
  const [daySummary, setDaySummary] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayIso());
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState('EXPENSE');
  const [{ year, month }, setYearMonth] = useState(currentYearMonth);
  const [monthly, setMonthly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const [overall, forDay, cats, mon] = await Promise.all([
        api.getSummary(),
        api.getSummaryForDate(selectedDate),
        api.getCategorySummaries(categoryType),
        api.getMonthlySummary(year, month),
      ]);
      setSummary(overall);
      setDaySummary(forDay);
      setCategories(cats);
      setMonthly(mon);
    } catch (err) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [selectedDate, categoryType, year, month]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="module-analytics">
      <section className="hero-banner hero-banner--compact">
        <div className="hero-banner-content">
          <span className="hero-eyebrow">Reports</span>
          <h2 className="hero-title">Analytics & summaries</h2>
          <p className="hero-text">
            All-time totals, daily snapshots, monthly rollups, and spending by
            category.
          </p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={load}>
          Refresh
        </button>
      </section>

      {error && (
        <p className="alert alert-error" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="loading-hint">Crunching numbers…</p>}

      <SummaryCards summary={summary} title="All-time overview" />

      <section className="panel panel-inline">
        <h2 className="panel-title">Summary for a day</h2>
        <label className="date-picker">
          Date
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
        <SummaryCards summary={daySummary} embedded />
      </section>

      <div className="dashboard-grid">
        <MonthlySummaryPanel
          monthly={monthly}
          year={year}
          month={month}
          onChange={(y, m) => setYearMonth({ year: y, month: m })}
        />
        <CategoryBreakdown
          categories={categories}
          type={categoryType}
          onTypeChange={setCategoryType}
        />
      </div>
    </section>
  );
}
