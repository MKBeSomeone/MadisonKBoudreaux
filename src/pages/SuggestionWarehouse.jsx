import React, { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import { useAuth } from '../auth/AuthContext';
import AuthModal from '../auth/AuthModal';
import './GridPages.css';
import './SuggestionWarehouse.css';

function StarRating({ value, onRate, interactive }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={`star-rating ${interactive ? 'is-interactive' : ''}`}>
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          className={`star ${value >= n ? 'is-filled' : ''}`}
          onClick={interactive ? () => onRate(n) : undefined}
          disabled={!interactive}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function formatDate(ts) {
  if (!ts) return '';
  // Firestore Timestamp objects expose .toDate(); fall back gracefully
  // if the field hasn't synced yet (serverTimestamp resolves async).
  const date = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function SuggestionWarehouse() {
  const { user, ready, configured, isAdmin } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!ready || !window.suggestionsAPI) return undefined;
    const unsubscribe = window.suggestionsAPI.subscribeSuggestions(setSuggestions);
    return unsubscribe;
  }, [ready]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await window.suggestionsAPI.submitSuggestion(text.trim());
      setText('');
    } catch (err) {
      setError(err.message || 'Something went wrong submitting your suggestion.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRate = async (id, rating) => {
    try {
      await window.suggestionsAPI.rateSuggestion(id, rating);
    } catch (err) {
      setError(err.message || 'Something went wrong saving that rating.');
    }
  };

  return (
    <div className="page">
      <PageHero
        accent="mustard"
        eyebrow="Stuff I Swear By... and Stuff You Suggest"
        title="Suggestion Warehouse"
        subtitle="Suggest a book, show, tool, or anything else you think I should check out. I read every one and rate my favorites."
      />

      <section className="container suggestion-section">
        {!configured && (
          <p className="empty-note">
            Heads up — the site owner hasn't finished connecting the login/database
            backend yet, so suggestions can't be saved just yet.
          </p>
        )}

        {user ? (
          <form className="suggestion-form card" onSubmit={handleSubmit}>
            <label htmlFor="suggestion-text" className="suggestion-form-label">
              Suggest something to {user.displayName ? '' : 'me'}
            </label>
            <textarea
              id="suggestion-text"
              placeholder="I think you'd love..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              required
            />
            <div className="suggestion-form-row">
              <span className="suggestion-form-hint">Posting as {user.displayName || user.email}</span>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send suggestion'}
              </button>
            </div>
          </form>
        ) : (
          <div className="suggestion-form card suggestion-signed-out">
            <p>Sign in to send me a suggestion.</p>
            <button className="btn btn-primary" onClick={() => setShowAuthModal(true)}>
              Sign in to suggest something
            </button>
          </div>
        )}

        {error && <p className="auth-error">{error}</p>}

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </section>

      <section className="container grid-section">
        <h2 className="section-title">
          {suggestions.length ? `${suggestions.length} suggestion${suggestions.length === 1 ? '' : 's'} so far` : 'Suggestions'}
        </h2>

        {suggestions.length === 0 ? (
          <p className="empty-note">No suggestions yet — be the first to send one in!</p>
        ) : (
          <div className="suggestion-list">
            {suggestions.map((s) => (
              <div key={s.id} className="suggestion-card card">
                <p className="suggestion-text">{s.text}</p>
                <div className="suggestion-meta-row">
                  <span className="suggestion-author">— {s.authorName || 'Anonymous'}</span>
                  {s.createdAt && <span className="suggestion-date">{formatDate(s.createdAt)}</span>}
                </div>
                <div className="suggestion-rating-row">
                  <StarRating
                    value={s.rating || 0}
                    interactive={isAdmin}
                    onRate={(n) => handleRate(s.id, n)}
                  />
                  {!isAdmin && !s.rating && <span className="suggestion-rating-pending">Not rated yet</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
