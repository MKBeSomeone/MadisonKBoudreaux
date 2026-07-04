import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './AuthModal.css';

export default function AuthModal({ onClose }) {
  const { configured, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong signing in with Google.');
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(name, email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="auth-modal-title">{mode === 'signup' ? 'Create an account' : 'Sign in'}</h2>

        {!configured && (
          <p className="auth-modal-warning">
            Login isn't fully wired up yet — the site owner still needs to add their
            Firebase config. See SETUP-FIREBASE.md.
          </p>
        )}

        <button className="btn btn-primary auth-google-btn" onClick={handleGoogle} disabled={busy}>
          Continue with Google
        </button>

        <div className="auth-divider"><span>or</span></div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn btn-outline" disabled={busy}>
            {mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'signup' ? (
            <>Already have an account? <button onClick={() => setMode('signin')}>Sign in</button></>
          ) : (
            <>New here? <button onClick={() => setMode('signup')}>Create an account</button></>
          )}
        </p>
      </div>
    </div>
  );
}
