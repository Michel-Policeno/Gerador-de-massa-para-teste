import * as XLSX from "xlsx";

export function criarExcel(resultado: string[][]): void {
  const ws = XLSX.utils.aoa_to_sheet([
    ["DOCUMENTO NÃO ENCONTRADO NA BASE DA RECEITA"],
    ...resultado,
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "doc-gerados");
  const dataCriacaoArquivo = new Date().toISOString().replace(/[:.]/g, "-");
  const nomeExcel = `doc_sucesso-${dataCriacaoArquivo}.xlsx`;
  XLSX.writeFile(wb, nomeExcel);
}
