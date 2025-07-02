import { Page } from "playwright";
import seletores from "../selectors/paginas.json" with { type: "json" };

export async function validaCNPJ(page: Page, cnpj: string): Promise<boolean> {
  await page.goto(seletores['informeCadastral'].url);
  //simular ação humana - pageDown
  await page.waitForTimeout(425);
  await page.keyboard.press("PageDown");
  await page.waitForTimeout(505);
  
  await page.click(seletores['informeCadastral'].inputCNPJ)
  await page.waitForTimeout(105);
  await page.type(seletores['informeCadastral'].inputCNPJ, cnpj, {
      delay: 193,
  });
  await page.waitForTimeout(80);
  await page.keyboard.press("Tab");
  await page.waitForTimeout(90);
  await page.keyboard.press("Enter")
  await page.waitForTimeout(2000);
  const body = await page.content();
  return body.includes("Não conseguimos localizar o cnpj ");
}

