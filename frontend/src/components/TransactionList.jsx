import { formatDate, formatMoney } from '../utils/format';

export default function TransactionList({ transactions, filter, onFilterChange }) {
  return (
    <section className="panel">
      <header className="panel-header">
        <h2 className="panel-title">Transactions</h2>
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </header>

      {transactions.length === 0 ? (
        <p className="empty-state">No transactions yet. Add your first one above.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className={`transaction-item transaction-item--${tx.type?.toLowerCase()}`}
            >
              <div className="tx-main">
                <span className="tx-category">{tx.category}</span>
                {tx.description && (
                  <span className="tx-description">{tx.description}</span>
                )}
              </div>
              <div className="tx-meta">
                <span className="tx-date">{formatDate(tx.date)}</span>
                <span className={`tx-amount tx-amount--${tx.type?.toLowerCase()}`}>
                  {tx.type === 'EXPENSE' ? '−' : '+'}
                  {formatMoney(tx.amount)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
