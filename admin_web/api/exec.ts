// admin_web/api/exec.ts
import { Octokit } from "octokit";

export async function handler(event: any, context?: any) {
  const { comando, arquivo, conteudo } = JSON.parse(event.body);

  if (!comando || !arquivo || !conteudo) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Parâmetros ausentes" }),
    };
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const owner = "jacksonsantana"; // substitua se o repo for de outro user/org
  const repo = "Situs_App";
  const path = `admin_web/src/${arquivo}`;

  try {
    // Verifica se o arquivo já existe para obter o SHA
    let sha: string | undefined;
    try {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        { owner, repo, path }
      );
      sha = data.sha;
    } catch (err) {
      sha = undefined; // Arquivo novo
    }

    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path,
        message: `🧠 IA: ${comando}`,
        content: Buffer.from(conteudo).toString("base64"),
        sha,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, commit: response.data.commit }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
