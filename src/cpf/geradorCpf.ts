import { Page } from "playwright";
import seletores from "../selectors/paginas.json" with { type: "json" };

export async function geradorCPF(page: Page): Promise<string> {
  await page.goto(seletores['4devs'].url, {
    waitUntil: "domcontentloaded",
  });
  //Seleciona checkbox - "cpf com pontuação" como não
  await page.click(seletores["4devs"].semPontuacao);
  await page.waitForTimeout(100);

  //Click botão para gerar cpf
  await page.click(seletores["4devs"].botaoGerarCpf);
  await page.waitForTimeout(1500);

  return (await page.textContent(seletores["4devs"].campoCpfGerado)) || "";
}
