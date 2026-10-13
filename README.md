# Visora — óculos inteligentes

Loja da Visora: vitrine, configurador de encomenda, carrinho e checkout simulado.

Site feito por [𝕮𝖍𝖆𝖛𝖊𝖘](https://github.com/Chaves1905) · [pedrochaves1905@gmail.com](mailto:pedrochaves1905@gmail.com)

## Local

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

Build de produção:

```bash
npm run build
npm run preview
```

## GitHub

```bash
git add .
git commit -m "Publica a loja Visora"
git branch -M main
git remote add origin https://github.com/Chaves1905/visora.git
git push -u origin main
```

## Vercel

1. Entre em [vercel.com](https://vercel.com) com a conta do GitHub.
2. **Add New Project** → importe `Chaves1905/visora`.
3. Framework: **Vite**. Build: `npm run build`. Pasta de saída: `dist`.
4. Deploy.

A cada `git push` na `main`, o Vercel publica de novo.
