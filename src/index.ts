import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
chromium.use(StealthPlugin());

import { geradorCPF } from "./cpf/geradorCpf.js";
import { validaCpf } from "./cpf/validarCpf.js";
import { criarExcel } from "./excel/salvarPlanilha.js";

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const resultado: string[][] = [];

  while (resultado.length < 2) {
    try {
      const cpfGerado = await geradorCPF(page);
      const valido = await validaCpf(page, cpfGerado);
      if (valido) {
        resultado.push([cpfGerado]);
        console.log(`CPF ${cpfGerado} - sucesso`);
      }
    } catch (err) {
      console.error(`Erro ao gerar CPF. Erro: ${err}`);
    }
    //verificar se a pagina continua Aberta - evitando laço infinito de erro
    if (page.isClosed()) {
      console.log("A página foi fechada pelo usuário. Encerrando o processo.");
      break;
    }
  }
  await browser.close();

  try {
    criarExcel(resultado);
  } catch (err) {
    console.error(`Erro ao criar Excel. Erro: ${err}`);
  }
}

main();
