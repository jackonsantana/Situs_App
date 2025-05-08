import { Octokit } from "octokit";

export async function handler(event: any) {
  const { comando, arquivo, conteudo } = JSON.parse(event.body);

  if (!comando || !arquivo || !conteudo) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Parâmetros faltando" }),
    };
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const owner = "jacksonsantana";
  const repo = "Situs_App";
  const path = `admin_web/src/${arquivo}`;

  try {
    const { data: existingFile } = await octokit.request(
      `GET /repos/${owner}/${repo}/contents/${path}`,
      { owner, repo, path }
    );

    const response = await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path,
      message: `🧠 IA: ${comando}`,
      content: Buffer.from(conteudo).toString("base64"),
      sha: existingFile.sha,
    });

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
