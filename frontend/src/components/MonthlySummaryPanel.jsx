import { formatMoney } from '../utils/format';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export default function MonthlySummaryPanel({ monthly, year, month, onChange }) {
  const title = monthly
    ? `${MONTHS[month - 1] ?? month} ${year}`
  : 'Monthly summary';

  return (
    <section className="panel">
      <header className="panel-header">
        <h2 className="panel-title">{title}</h2>
        <div className="month-controls">
          <label>
            Year
            <input
              type="number"
              min="2000"
              max="2100"
              value={year}
              onChange={(e) => onChange(Number(e.target.value), month)}
            />
          </label>
          <label>
            Month
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => onChange(year, Number(e.target.value))}
            />
          </label>
        </div>
      </header>

      {monthly ? (
        <dl className="monthly-stats">
          <div>
            <dt>Income</dt>
            <dd className="text-income">{formatMoney(monthly.totalIncome)}</dd>
          </div>
          <div>
            <dt>Expenses</dt>
            <dd className="text-expense">{formatMoney(monthly.totalExpense)}</dd>
          </div>
          <div>
            <dt>Balance</dt>
            <dd>{formatMoney(monthly.balance)}</dd>
          </div>
        </dl>
      ) : (
        <p className="empty-state">Select a month to load summary.</p>
      )}
    </section>
  );
}
