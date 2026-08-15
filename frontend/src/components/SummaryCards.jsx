import { createElement } from 'react';
import { formatMoney } from '../utils/format';

function Card({ label, value, variant }) {
  return (
    <article className={`summary-card summary-card--${variant}`}>
      <span className="summary-label">{label}</span>
      <span className="summary-value">{formatMoney(value)}</span>
    </article>
  );
}

function SummaryGrid({ children }) {
  return createElement('div', { className: 'summary-grid' }, children);
}

export default function SummaryCards({ summary, title, embedded = false }) {
  if (!summary) return null;

  const grid = (
    <SummaryGrid>
      <Card label="Income" value={summary.totalIncome} variant="income" />
      <Card label="Expenses" value={summary.totalExpense} variant="expense" />
      <Card label="Balance" value={summary.balance} variant="balance" />
    </SummaryGrid>
  );

  if (embedded) {
    return (
      <>
        {title && <h3 className="panel-subtitle">{title}</h3>}
        {grid}
      </>
    );
  }

  return (
    <section className="panel">
      {title && <h2 className="panel-title">{title}</h2>}
      {grid}
    </section>
  );
}
