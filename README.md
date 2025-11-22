# 👟 Shoeasy Project 2.0

> **Redefinindo o conforto urbano e a experiência de compra online.**

![Project Status](https://img.shields.io/badge/status-completed-green)
![Node Version](https://img.shields.io/badge/node-14%2B-blue)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

## 📄 Sobre o Projeto

O **Shoeasy** é uma Landing Page de e-commerce moderna focada em venda de tênis exclusivos. Este projeto representa um **Refactoring completo** (V2.0) de um projeto legado.

O objetivo desta nova versão foi elevar o nível de UI/UX, implementar uma arquitetura de pastas profissional e adicionar funcionalidades dinâmicas (como carrinho de compras persistente) utilizando **Vanilla JavaScript** puro, sem dependência de frameworks frontend pesados.

### ✨ Evolução (V1.0 vs V2.0)
Você pode consultar o código da versão antiga na branch `versao-1.0` deste repositório.
- **Design:** Interface moderna com Glassmorphism, tipografia hierárquica e Design Responsivo.
- **Performance:** Animações leves utilizando *Intersection Observer*.
- **Funcionalidade:** Carrinho de compras funcional com persistência de dados via LocalStorage.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5 Semântico, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
- **Backend:** Node.js com Express (Servidor de arquivos estáticos).
- **Ferramentas:** Git, NPM, Nodemon.

## 🚀 Funcionalidades

- [x] **Hero Section Interativa:** Elementos flutuantes e animações de entrada.
- [x] **Navbar Dinâmica:** Efeito de vidro (Glassmorphism) ao rolar e menu mobile responsivo.
- [x] **Carrinho de Compras (Side Cart):**
  - Adicionar/Remover itens.
  - Cálculo de subtotal em tempo real.
  - **Persistência:** O carrinho não é perdido ao atualizar a página (LocalStorage).
- [x] **Scroll Reveal:** Elementos aparecem suavemente ao rolar a página.

## 📂 Estrutura de Pastas

```text
shoeasy-novo/
│
├── public/            # Arquivos do Frontend (Cliente)
│   ├── css/           # Estilização global e componentes
│   ├── img/           # Imagens dos produtos e assets
│   ├── js/            # Lógica (Carrinho, Menu, Animações)
│   └── index.html     # Estrutura principal
│
├── src/               # Lógica do Servidor
│   └── server.js      # Configuração do Express
│
├── package.json       # Dependências do Node
└── README.md          # Documentação
```

## 🔧 Como Rodar o Projeto

Você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. **Clone o repositório:**
```bash
git clone [https://github.com/miguelfidelis1/shoeasy-project.git](https://github.com/miguelfidelis1/shoeasy-project.git)
```

2. **Entre na pasta do projeto:**
```bash
cd shoeasy-project
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Inicie o servidor:**

```bash
npm run dev
```

5. **Acesse no navegador:**
O projeto estará rodando em: 
 
```bash
http://localhost:3000
```

## 🤝 Autor
**Feito com dedicação por Miguel Fidelis.**