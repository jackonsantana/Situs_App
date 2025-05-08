import React, { useState } from "react";

const ComandoIA = () => {
  const [comando, setComando] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [executando, setExecutando] = useState(false);

  const executarComando = async () => {
    if (!comando.trim()) return;

    const hora = new Date().toLocaleTimeString();
    setExecutando(true);

    try {
      const response = await fetch("/api/router", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comando }),
      });

      const result = await response.json();

      const novoLog = [
        `${hora} | Comando: "${comando}"`,
        `${hora} | Status: ${response.status}`,
        `${hora} | Resposta: ${JSON.stringify(result)}`,
      ];

      setLogs((prev) => [...novoLog, ...prev]);
    } catch (err: any) {
      setLogs((prev) => [
        `${hora} | Erro ao executar: ${err.message}`,
        ...prev,
      ]);
    } finally {
      setComando("");
      setExecutando(false);
    }
  };

  return (
    <div style={estilo.container}>
      <h2 style={estilo.titulo}>Camada de Comando Inteligente</h2>

      <div style={estilo.form}>
        <input
          type="text"
          placeholder="Ex: Criar nova função de login"
          value={comando}
          onChange={(e) => setComando(e.target.value)}
          style={estilo.input}
        />
        <button
          onClick={executarComando}
          style={estilo.botao}
          disabled={executando}
        >
          {executando ? "Executando..." : "Executar"}
        </button>
      </div>

      <div style={estilo.logs}>
        <h3>Logs de Operação</h3>
        <ul>
          {logs.map((log, i) => (
            <li key={i} style={estilo.logItem}>
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const estilo = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "700px",
    margin: "auto",
  },
  titulo: {
    fontSize: "22px",
    background: "#111",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  botao: {
    padding: "10px 20px",
    backgroundColor: "#00cfc1",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  logs: {
    marginTop: "30px",
    backgroundColor: "#f5f5f5",
    padding: "15px",
    borderRadius: "5px",
  },
  logItem: {
    fontSize: "14px",
    padding: "5px 0",
  },
};

export default ComandoIA;
