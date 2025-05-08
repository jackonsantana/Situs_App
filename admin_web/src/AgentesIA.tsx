import React, { useState } from 'react';

const agentesIniciais = [
  { nome: 'DeployBot', status: 'Ativo', logs: ['Pronto para próximo comando.'] },
  { nome: 'CodeMaster', status: 'Em espera', logs: ['Aguardando tarefas de código.'] },
  { nome: 'NetlifyPilot', status: 'Monitorando builds', logs: ['Último deploy bem-sucedido.'] },
];

const AgentesIA = () => {
  const [agentes, setAgentes] = useState(agentesIniciais);
  const [agenteAtivo, setAgenteAtivo] = useState(0);

  const alternarAgente = (index: number) => {
    setAgenteAtivo(index);
  };

  return (
    <div style={estilo.container}>
      <h2 style={estilo.titulo}>👩‍🚀 Painel de Agentes IA</h2>

      <div style={estilo.menu}>
        {agentes.map((agente, index) => (
          <button
            key={agente.nome}
            onClick={() => alternarAgente(index)}
            style={{
              ...estilo.botao,
              backgroundColor: index === agenteAtivo ? '#007bff' : '#e0e0e0',
              color: index === agenteAtivo ? '#fff' : '#000',
            }}
          >
            {agente.nome}
          </button>
        ))}
      </div>

      <div style={estilo.card}>
        <h3>{agentes[agenteAtivo].nome}</h3>
        <p><strong>Status:</strong> {agentes[agenteAtivo].status}</p>
        <h4>📜 Histórico</h4>
        <ul>
          {agentes[agenteAtivo].logs.map((log, i) => (
            <li key={i} style={estilo.log}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const estilo = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    maxWidth: '600px',
    margin: 'auto',
  },
  titulo: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#333',
  },
  menu: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  botao: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  log: {
    fontSize: '14px',
    marginBottom: '5px',
  },
};

export default AgentesIA;
