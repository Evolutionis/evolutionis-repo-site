# Site Público (React + Vite)

Site que lê o `content.json` e renderiza as seções com imagens e ícones Lucide.
O conteúdo é gerenciado pelo CMS (repo separado) e o deploy é automático via FTP.

```
npm install
npm run dev      # local
npm run build    # gera dist/ (inclui content.json e images/)
```

## Deploy

Suba este diretório como o repositório `site` no GitHub. O workflow em
`.github/workflows/deploy.yml` builda e envia o `dist/` pra Locaweb via FTP a cada
push no `main`. Configure os secrets `HOST`, `USER`, `PASS` (dados de FTP da Locaweb)
em Settings → Secrets and variables → Actions.

## Conteúdo

- `public/content.json` — conteúdo do site (o backend do CMS sobrescreve via GitHub API)
- `public/images/` — imagens enviadas pelo admin
- `src/App.jsx` — renderiza as seções. Ajuste aqui se mudar a estrutura no admin.
- `src/components/Icon.jsx` — resolve ícones Lucide pelo nome salvo no JSON.
