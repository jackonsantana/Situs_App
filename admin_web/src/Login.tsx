// admin_web/src/Login.tsx
import { useState } from 'react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@situs.com' && senha === '123456') {
      localStorage.setItem('auth', 'true');
      onLogin();
    } else {
      alert('Login ou senha inválidos');
    }
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        /><br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
