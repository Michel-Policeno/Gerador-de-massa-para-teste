#  Gerador de Massa para teste (CPF/CNPJ)

Projeto automatizado utilizando **Playwright** com **TypeScript** para geração e validação de CPFs e CNPJs com o objetivo de obter 
uma massa de dados não produtiva — ou seja, documentos com formato válido, mas que não constam na base da Receita Federal


## 🚀 Tecnologias Utilizadas

- **TypeScript**
- **Playwright**
- **XLSX** – para geração da planilha com os documentos válidos encontrados


## 📦 Pré-requisitos

- Node.js 18 ou superior

## ⚙️ Instalação

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse o diretório
cd nome-do-projeto

# Instale as dependências
npm install
```

## ▶️ Executar

### 1) Configuração:
No momento, o tipo de documento e a quantidade desejada são definidos diretamente no código. Em breve será possível configurar pelo front-end
```bash
let tipoConsulta = "preencha com CPF ou CNPJ";   // CPF ou "CNPJ"
const quantidadeDesejada = 5;  //escolha a quantidade de documentos validos voce precisa
```

### 2) Executar:  
Esse comando compila o TypeScript e executa o script principal
```bash
npm start
```


## 📁 Estrutura do Projeto
```bash
src/
│
├── cpf/
│   ├── geradorCpf.ts
│   └── validarCpf.ts
│
├── cnpj/
│   ├── geradorCNPJ.ts
│   └── validarCNPJ.ts
│
├── excel/
│   └── salvarPlanilha.ts
│
├── selectors/
│   └── paginas.json       // seletores utilizados de cada página
│
└── index.ts
```

## 📤 Saída
Ao final da execução, um arquivo .xlsx será gerado no diretório raiz, com nome no formato:

doc_sucesso-data-hora.xlsx



🧪 Autor

Desenvolvido por Michel Policeno

Meu linkedin: https://www.linkedin.com/in/michel-policeno-85a866212/
