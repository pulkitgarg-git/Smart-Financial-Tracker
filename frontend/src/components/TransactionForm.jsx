import { useState } from 'react';
import { api } from '../api/client';
import { todayIso } from '../utils/format';

const EMPTY = {
  amount: '',
  category: '',
  description: '',
  date: todayIso(),
  type: 'EXPENSE',
};

export default function TransactionForm({ onAdded }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.addTransaction({
        amount: Number(form.amount),
        category: form.category.trim(),
        description: form.description.trim(),
        date: form.date,
        type: form.type,
      });
      setForm({ ...EMPTY, date: todayIso() });
      onAdded?.();
    } catch (err) {
      setError(err.message || 'Could not add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel">
      <h2 className="panel-title">Add transaction</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        {error ? (
          <p className="alert alert-error" role="alert">
            {error}
          </p>
        ) : null}

        <section className="form-row">
          <label>
            Type
            <select value={form.type} onChange={update('type')}>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </label>
          <label>
            Amount
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={update('amount')}
              required
              placeholder="0.00"
            />
          </label>
          <label>
            Date
            <input type="date" value={form.date} onChange={update('date')} required />
          </label>
        </section>

        <section className="form-row">
          <label>
            Category
            <input
              type="text"
              value={form.category}
              onChange={update('category')}
              required
              placeholder="Food, Salary, Rent…"
            />
          </label>
          <label className="span-2">
            Description
            <input
              type="text"
              value={form.description}
              onChange={update('description')}
              placeholder="Optional note"
            />
          </label>
        </section>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Add transaction'}
        </button>
      </form>
    </section>
  );
}
