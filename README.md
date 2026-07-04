# Site Público (HTML + Tailwind + Vite)

Este é o repositório do site público da Evolutionis. O site foi construído utilizando HTML puro e TailwindCSS (via CDN), e utiliza o Vite apenas como servidor de desenvolvimento e ferramenta de build (minificação e organização de arquivos).

O site é dinâmico e lê o arquivo `content.json` para renderizar seus textos, imagens e cores, que são gerenciados pelo painel do CMS (repositório separado). O deploy é feito automaticamente via GitHub Actions.

## 🚀 Como Rodar o Site Localmente

1. **Instalar Dependências** (necessário para o Vite):
   ```bash
   npm install
   ```

2. **Rodar em Desenvolvimento**:
   ```bash
   npm run dev
   ```
   Isso iniciará um servidor local rápido (geralmente em `http://localhost:5173`).

3. **Gerar Versão de Produção (Build)**:
   ```bash
   npm run build
   ```
   Os arquivos finais minificados e prontos para produção serão gerados na pasta `dist/`. É esta pasta que deve ir para a Locaweb.

## ⚙️ Integração com o CMS

A mágica do site acontece através do arquivo `cms-integration.js`, que é carregado no final do `index.html`. Ele:
1. Faz a leitura do arquivo `public/content.json` (ou `content.json` após o build).
2. Substitui dinamicamente as imagens (adaptando de `/` para `images/...` para não quebrar links absolutos).
3. Injeta as cores personalizadas do Admin diretamente nas variáveis CSS nativas do Tailwind, atualizando a identidade visual em tempo real.
4. Altera os textos de cabeçalho, rodapé e da seção hero.

## 📦 Deploy Automático

Suba este diretório como o repositório principal do site no GitHub. O workflow em `.github/workflows/deploy.yml` gera o build da pasta `dist/` e envia via FTP para a Locaweb a cada "push" na branch `main`. Configure os secrets `HOST`, `USER`, `PASS` no GitHub para a conexão FTP.
