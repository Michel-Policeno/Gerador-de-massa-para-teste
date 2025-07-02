import { Page } from "playwright";
import seletores from "../selectors/paginas.json" with { type: "json" };

export async function validaCpf(page: Page, cpf: string): Promise<boolean> {
  await page.goto(
    seletores['receitaFederal'].url,
    { waitUntil: "load" }
  );
  //simular ação humana - pageDown
  await page.waitForTimeout(125);
  await page.keyboard.press("PageDown");
  await page.waitForTimeout(505);

  await page.type(seletores['receitaFederal'].inputCpf, cpf, { delay: 380 });

  //simular ação humana - mudar de campo com tab
  await page.waitForTimeout(222);
  await page.keyboard.press("Tab");
  await page.waitForTimeout(302);

  await page.type(seletores['receitaFederal'].inputDtNascimento, "01011980", {
    delay: 451,
  });

  //simular ação humana  - mudar de campo com tab
  await page.waitForTimeout(342);
  await page.keyboard.press("Tab");
  await page.waitForTimeout(410);
  await page.keyboard.down(" ");
  await page.waitForTimeout(200);
  await page.keyboard.up(" ");
  await page.waitForTimeout(2000);

  await page.click(seletores['receitaFederal'].botaoEnviar);
  await page.waitForTimeout(2000);

  const body = await page.content();
  return body.includes("CPF não encontrado na base de dados");
}
