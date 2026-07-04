import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import './AuthWidget.css';

export default function AuthWidget() {
  const { user, signOutUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (user) {
    return (
      <div className="auth-widget">
        <span className="auth-widget-name">{user.displayName || user.email}</span>
        <button className="auth-widget-signout" onClick={() => signOutUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <>
      <button className="auth-widget-signin" onClick={() => setShowModal(true)}>Sign in</button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
