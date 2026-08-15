import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(fullName, email, password);
      navigate('/app/overview');
    } catch (err) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <ThemeToggle className="auth-theme-toggle" />
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">₹</span>
          <h1>Create your account</h1>
          <p>Start tracking income and expenses in one place.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error ? (
            <p className="alert alert-error" role="alert">
              {error}
            </p>
          ) : null}

          <label>
            Full name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Jane Doe"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="At least 6 characters"
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
