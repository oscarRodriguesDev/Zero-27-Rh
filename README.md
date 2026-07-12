

````markdown
# Zero27RH

<p align="center">
  <h3 align="center">Recrutamento e Seleção de Talentos</h3>
  <p align="center">
    Construindo pontes entre talentos e empresas.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-Produção-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Licença-Privada-red?style=for-the-badge">
</p>

---

## Sobre o Projeto

O **Zero27RH** é o site institucional da empresa especializada em **Recrutamento e Seleção de Talentos**.

O projeto foi desenvolvido utilizando **Next.js**, com foco em:

- Design responsivo
- SEO otimizado
- Alto desempenho
- Facilidade de gerenciamento de conteúdo
- Excelente experiência do usuário

O sistema possui **6 páginas institucionais**, blog integrado ao **Cosmic JS** e painel administrativo para gerenciamento de conteúdo.

---

## Funcionalidades

- Página inicial institucional
- Apresentação dos serviços de recrutamento
- Exibição dos clientes parceiros
- Listagem de vagas abertas
- Blog dinâmico utilizando Cosmic JS
- Painel administrativo protegido
- CRUD completo de postagens
- Formulário de contato integrado ao Google Forms
- Banner de cookies compatível com a LGPD
- Slider de imagens com animações CSS
- SEO utilizando JSON-LD
- Layout totalmente responsivo

---

## Tecnologias

| Tecnologia | Versão |
|------------|---------|
| Next.js | 16.2.10 |
| React | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| PostCSS | 4.x |
| ESLint | 9.x |
| Cosmic JS SDK | 2.1 |
| jose | 6.2 |
| marked | 18.x |

---

## Estrutura do Projeto

```text
src
├── app
│   ├── api
│   │   ├── auth
│   │   └── posts
│   ├── admin
│   │   ├── blog
│   │   ├── login
│   │   └── page.tsx
│   ├── blog
│   │   └── [slug]
│   ├── clientes
│   ├── contatos
│   ├── privacidade
│   ├── servicos
│   ├── vagas
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── CookieConsent.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── ImageSlider.tsx
├── lib
│   ├── auth.ts
│   └── cosmic.ts
├── middleware.ts
└── types
    └── blog.ts
```

---

## Executando o Projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm, pnpm, yarn ou bun

---

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
COSMIC_BUCKET_SLUG=seu_bucket
COSMIC_READ_KEY=sua_read_key
COSMIC_WRITE_KEY=sua_write_key
JWT_SECRET=seu_segredo_jwt
```

---

### Instalação

```bash
npm install
```

---

### Desenvolvimento

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

### Produção

```bash
npm run build
npm start
```

---

### Lint

```bash
npm run lint
```

---

## Scripts

| Script | Descrição |
|---------|-----------|
| npm run dev | Inicia o ambiente de desenvolvimento |
| npm run build | Gera a build de produção |
| npm start | Executa a aplicação em produção |
| npm run lint | Executa o ESLint |

---

## SEO e Performance

O projeto utiliza recursos nativos do Next.js para garantir melhor indexação e desempenho.

- `generateMetadata`
- JSON-LD
- Rich Snippets
- Assets otimizados
- Slider CSS sem JavaScript
- Layout responsivo
- Política de Privacidade
- Banner LGPD

---

## Licença

Projeto privado.

Todos os direitos reservados.
````

Essa versão segue o padrão dos repositórios mais profissionais do GitHub, com separadores (`---`), blocos de código bem formatados, tabelas consistentes e uma estrutura que renderiza corretamente em qualquer cliente compatível com Markdown.
