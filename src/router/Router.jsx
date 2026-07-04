import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Tiny, dependency-free hash router. Works great on static hosts like
// GitHub Pages since everything after "#" never touches the server,
// so deep links and page refreshes just work with zero server config.

const RouterContext = createContext({ path: '/', navigate: () => {} });

function normalize(hash) {
  const raw = hash.replace(/^#/, '') || '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setPath(normalize(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to) => {
    window.location.hash = to;
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Routes({ routes, fallback }) {
  const { path } = useRouter();
  const Match = routes[path] || fallback;
  return <Match />;
}

export function Link({ to, className, children, onClick, ...rest }) {
  const { navigate, path } = useRouter();
  const isActive = path === to;

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={className}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
