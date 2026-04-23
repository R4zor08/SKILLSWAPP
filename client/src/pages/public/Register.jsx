import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout.jsx';
import { PasswordField } from '../../components/auth/PasswordField.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { getErrorMessage } from '../../utils/helpers.js';

export function Register() {
  const { register, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout title="Create your account" subtitle="Join SkillSwap and start exchanging skills.">
      <form
        className="form-grid form-auth"
        onSubmit={async (e) => {
          e.preventDefault();
          setError('');
          setLoading(true);
          const fd = new FormData(e.currentTarget);
          const email = String(fd.get('email') || '');
          try {
            await register({
              name: fd.get('name'),
              email,
              password: fd.get('password'),
            });
            logout();
            navigate('/login', {
              replace: true,
              state: {
                registered: true,
                registeredEmail: email,
                message: 'Account created. Sign in with your email and password.',
              },
            });
          } catch (err) {
            setError(getErrorMessage(err));
          } finally {
            setLoading(false);
          }
        }}
      >
        {error && <div className="alert error">{error}</div>}
        <p className="auth-meta muted sm">Use at least 8 characters; pick a password you do not use elsewhere.</p>
        <label className="field full">
          <span>Name</span>
          <input className="input" name="name" required autoComplete="name" />
        </label>
        <label className="field full">
          <span>Email</span>
          <input className="input" name="email" type="email" required autoComplete="email" />
        </label>
        <PasswordField name="password" autoComplete="new-password" minLength={8} required />
        <button type="submit" className="btn primary full" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
        <p className="muted sm form-footer">
          Already have an account?{' '}
          <Link to="/login" className="link-accent">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
