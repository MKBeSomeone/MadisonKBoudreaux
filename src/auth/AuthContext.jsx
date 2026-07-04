import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext({
  user: null,
  ready: false,
  configured: false,
  signInWithGoogle: async () => {},
  signUpWithEmail: async () => {},
  signInWithEmail: async () => {},
  signOutUser: async () => {},
  isAdmin: false,
});

function getApi() {
  return typeof window !== 'undefined' ? window.suggestionsAPI : undefined;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!!getApi());
  const [configured, setConfigured] = useState(!!getApi()?.configured);

  useEffect(() => {
    const onReady = (e) => {
      setReady(true);
      setConfigured(!!e.detail?.configured);
    };
    const onAuthChanged = (e) => {
      setUser(e.detail?.user || null);
    };

    window.addEventListener('suggestions:ready', onReady);
    window.addEventListener('suggestions:auth-changed', onAuthChanged);

    // In case the module script already finished loading before this
    // component mounted.
    if (getApi()) {
      setReady(true);
      setConfigured(!!getApi().configured);
    }

    return () => {
      window.removeEventListener('suggestions:ready', onReady);
      window.removeEventListener('suggestions:auth-changed', onAuthChanged);
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await getApi()?.signInWithGoogle();
  }, []);

  const signUpWithEmail = useCallback(async (name, email, password) => {
    await getApi()?.signUpWithEmail(name, email, password);
  }, []);

  const signInWithEmail = useCallback(async (email, password) => {
    await getApi()?.signInWithEmail(email, password);
  }, []);

  const signOutUser = useCallback(async () => {
    await getApi()?.signOutUser();
  }, []);

  const isAdmin = !!(user && getApi() && user.email === getApi().ADMIN_EMAIL);

  return (
    <AuthContext.Provider
      value={{ user, ready, configured, signInWithGoogle, signUpWithEmail, signInWithEmail, signOutUser, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
