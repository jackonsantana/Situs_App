// admin_web/src/App.tsx
import { useState, useEffect } from 'react';
import Login from './Login';

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('auth') === 'true';
    setAuth(isAuth);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('auth', 'true');
    setAuth(true);
  };

  if (!auth) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo ao Painel do Admin</h1>
      <p>Aqui é onde seu conteúdo administrativo será exibido.</p>
    </div>
  );
}
