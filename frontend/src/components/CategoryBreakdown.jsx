import { formatMoney } from '../utils/format';

export default function CategoryBreakdown({ categories, type, onTypeChange }) {
  return (
    <section className="panel">
      <header className="panel-header">
        <h2 className="panel-title">By category</h2>
        <select
          className="filter-select"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="EXPENSE">Expenses</option>
          <option value="INCOME">Income</option>
        </select>
      </header>

      {categories.length === 0 ? (
        <p className="empty-state">No {type.toLowerCase()} data for this type yet.</p>
      ) : (
        <ul className="category-list">
          {categories.map((row) => (
            <li key={row.category} className="category-item">
              <span>{row.category}</span>
              <span className="category-amount">{formatMoney(row.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
