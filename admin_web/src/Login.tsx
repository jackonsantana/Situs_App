// admin_web/src/Login.tsx
type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const handleClick = () => {
    onLogin();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login de Teste</h2>
      <p>Email: <strong>admin@situs.com</strong></p>
      <p>Senha: <strong>123456</strong></p>
      <button onClick={handleClick}>Entrar</button>
    </div>
  );
}
