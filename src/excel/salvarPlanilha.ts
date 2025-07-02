import * as XLSX from "xlsx";

export function criarExcel(resultado: string[][]): void {
  const ws = XLSX.utils.aoa_to_sheet([
    ["CPF NÃO ENCONTRADOS NA BASE DA RECEITA"],
    ...resultado,
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "CPFs");
  const dataCriacaoArquivo = new Date().toISOString().replace(/[:.]/g, "-");
  const nomeExcel = `cpfs_sucesso-${dataCriacaoArquivo}.xlsx`;
  XLSX.writeFile(wb, nomeExcel);
}
