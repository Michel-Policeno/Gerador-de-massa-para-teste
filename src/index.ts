import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
chromium.use(StealthPlugin());

import { geradorCPF } from "./cpf/geradorCpf.js";
import { validaCpf } from "./cpf/validarCpf.js";
import { geradorCNPJ } from "./cnpj/geradorCNPJ.js";
import { validaCNPJ } from "./cnpj/validarCNPJ.js";
import { criarExcel } from "./excel/salvarPlanilha.js";
import { Page } from "playwright";

//paramentros
let tipoConsulta = "CPF"; //CPF ou CNPJ
const quantidadeDesejada = 5;

async function gerarDocumentos(
  page: Page,
  resultado: string[][],
  gerarDoc: Function,
  validaDoc: Function
) {
  while (resultado.length < quantidadeDesejada) {
    try {
      const docGerado = await gerarDoc(page);
      const valido = await validaDoc(page, docGerado);
      if (valido) {
        resultado.push([docGerado]);
        console.log(`${docGerado} obteve sucesso`);
      }
    } catch (err) {
      console.error(`Erro ao gerar doc. Erro: ${err}`);
    }
    //verificar se a pagina continua Aberta - evitando laço infinito de erro
    if (page.isClosed()) {
      console.log("A página foi fechada pelo usuário. Encerrando o processo.");
      break;
    }
  }
}

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const resultado: string[][] = [];

  switch (tipoConsulta) {
    case "CPF":
      await gerarDocumentos(page, resultado, geradorCPF, validaCpf);
      break;

    case "CNPJ":
      await gerarDocumentos(page, resultado, geradorCNPJ, validaCNPJ);
      break;

    default:
      console.log("Escolha entre CPF ou CNPJ");
      break;
  }
  await browser.close();

  try {
    criarExcel(resultado);
  } catch (err) {
    console.error(`Erro ao criar Excel. Erro: ${err}`);
  }
}

main();
