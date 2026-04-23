import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout.jsx';
import { PasswordField } from '../../components/auth/PasswordField.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { getErrorMessage } from '../../utils/helpers.js';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [postRegBanner] = useState(() => {
    const s = location.state;
    if (s?.message) return s.message;
    if (s?.registered) return 'Account created. Please sign in with your email and password.';
    return '';
  });
  const [prefillEmail] = useState(() => String(location.state?.registeredEmail || ''));

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your swaps.">
      <form
        className="form-grid form-auth"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          setLoading(true);
          const fd = new FormData(e.currentTarget);
          try {
            await login({
              email: fd.get('email'),
              password: fd.get('password'),
            });
            navigate(from, { replace: true });
          } catch (err) {
            setError(getErrorMessage(err));
          } finally {
            setLoading(false);
          }
        }}
      >
        {error && <div className="alert error">{error}</div>}
        {postRegBanner && <div className="alert success">{postRegBanner}</div>}
        <p className="auth-meta muted sm">Use the email and password you registered with SkillSwap.</p>
        <label className="field full">
          <span>Email</span>
          <input
            className="input"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={prefillEmail}
          />
        </label>
        <PasswordField name="password" autoComplete="current-password" required />
        <button type="submit" className="btn primary full" disabled={loading}>
          {loading ? 'Signing in…' : 'Log in'}
        </button>
        <p className="muted sm form-footer">
          New here?{' '}
          <Link to="/register" className="link-accent">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
