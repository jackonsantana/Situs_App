import React, { useState } from 'react';

const ComandoIA = () => {
  const [comando, setComando] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const executarComando = async () => {
    if (!comando.trim()) return;

    const hora = new Date().toLocaleTimeString();
    const novoLog = [`${hora} | Comando recebido: "${comando}"`];
    setLogs((prevLogs) => [...novoLog, ...prevLogs]);
    setComando('');

    try {
      const response = await fetch('/api/exec.ts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comando,
          arquivo: 'teste.txt',
          conteudo: `// Criado pela IA\n// Comando: ${comando}`
        }),
      });

      const data = await response.json();
      const statusLog = `${hora} | ${data.success ? '✅ Sucesso' : '❌ Falha'} - ${data.message}`;
      setLogs((prevLogs) => [statusLog, ...prevLogs]);
    } catch (err) {
      const errorLog = `${hora} | ❌ Erro ao executar: ${(err as Error).message}`;
      setLogs((prevLogs) => [errorLog, ...prevLogs]);
    }
  };

  return (
    <div style={estilo.container}>
      <h2 style={estilo.titulo}>Camada de Comando Inteligente</h2>
      <div style={estilo.form}>
        <input
          type="text"
          placeholder="Ex: Criar nova tela de relatórios"
          value={comando}
          onChange={(e) => setComando(e.target.value)}
          style={estilo.input}
        />
        <button onClick={executarComando} style={estilo.botao}>Executar</button>
      </div>
      <div style={estilo.logs}>
        <h3>Logs de Operação</h3>
        <ul>{logs.map((log, index) => <li key={index} style={estilo.logItem}>{log}</li>)}</ul>
      </div>
    </div>
  );
};

const estilo = {
  container: { padding: '30px', fontFamily: 'Arial', maxWidth: '700px', margin: 'auto' },
  titulo: { fontSize: '22px', background: '#111', color: '#fff', padding: '10px 20px', borderRadius: '5px' },
  form: { display: 'flex', gap: '10px', marginTop: '20px' },
  input: { flex: 1, padding: '10px', fontSize: '16px' },
  botao: { padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' },
  logs: { marginTop: '30px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' },
  logItem: { fontSize: '14px', padding: '5px 0' }
};

export default ComandoIA;
