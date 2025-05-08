import React from 'react';
import ReactDOM from 'react-dom/client';
import ComandoIA from './ComandoIA';
import AgentesIA from './AgentesIA';

const App = () => {
  return (
    <div style={estilo.pagina}>
      <h1 style={estilo.titulo}>🧠 Painel de Comando Inteligente</h1>

      <div style={estilo.secao}>
        <ComandoIA />
      </div>

      <div style={estilo.secao}>
        <AgentesIA />
      </div>
    </div>
  );
};

const estilo = {
  pagina: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  secao: {
    marginBottom: '40px',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
