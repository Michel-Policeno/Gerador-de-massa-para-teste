import { Page } from "playwright";

export async function geradorCPF(page: Page): Promise<string> {
  await page.goto("https://www.4devs.com.br/gerador_de_cpf", {
    waitUntil: "domcontentloaded",
  });
  //Seleciona checkbox - "cpf com pontuação" como não
  await page.click("#pontuacao_nao");
  await page.waitForTimeout(100);

  //Click botão para gerar cpf
  await page.click("#bt_gerar_cpf");
  await page.waitForTimeout(1500);

  return (await page.textContent("#texto_cpf")) || "";
}
