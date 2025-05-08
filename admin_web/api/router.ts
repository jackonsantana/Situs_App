// admin_web/api/router.ts

import type { APIGatewayEvent, Context } from "aws-lambda";
import { handler as execHandler } from "./exec";

export async function handler(event: APIGatewayEvent, context: Context) {
  try {
    const { comando } = JSON.parse(event.body || "{}");

    if (!comando) {
      return {
        statusCode: 400,
        body: JSON.stringify({ erro: "Comando ausente." }),
      };
    }

    // 🔁 Exemplo de comando interpretado pela IA:
    if (comando.includes("nova função") || comando.includes("criar função")) {
      return await execHandler(
        {
          ...event,
          body: JSON.stringify({
            comando,
            arquivo: "NovaFuncao.tsx",
            conteudo: `export default function NovaFuncao() {\n  return <div>Nova função criada por IA!</div>;\n}`,
          }),
        },
        context
      );
    }

    if (comando.includes("deploy netlify")) {
      // (em breve) integração com Netlify API real
      return {
        statusCode: 202,
        body: JSON.stringify({ msg: "Deploy acionado (simulado)" }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ erro: "Comando não reconhecido." }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        erro: "Erro interno no roteador",
        detalhe: err.message,
      }),
    };
  }
}
