# Segurança — site público

## Dependências

Estado em 30/08/2026: `npm audit` retorna **0 vulnerabilidades**.

O que foi corrigido no TAR-09 e por quê a escolha de versão:

| Pacote | De | Para | Observação |
|---|---|---|---|
| `vite` | 5.4.21 | 7.3.6 | traz `esbuild` 0.28, fora da faixa vulnerável (`<=0.24.2`) |
| `@vitejs/plugin-react` | 4.7.0 | 5.2.0 | versão que declara compatibilidade com Vite 7 |
| `vite-plugin-pwa` | 0.20.5 | 1.3.0 | idem |
| `postcss`, `nanoid` | — | — | resolvidos por `npm audit fix`, dentro do semver |

O Vite 8 também fecharia o achado, mas foi descartado: o
`@vitejs/plugin-react` 6 arrasta a cadeia do rolldown (`@rolldown/plugin-babel`
→ `@babel/core` 8) e o npm não resolve os peers sem `--force`. O Vite 7 resolve
o mesmo problema de segurança sem essa ruptura. Quando a cadeia do Vite 8
estabilizar, a migração fica natural.

Todas as dependências afetadas são de build. Como o site vai ao ar estático, a
exposição em produção é pequena — mas `vite` e `esbuild` afetam quem roda
`npm run dev` numa rede compartilhada, que era o caso a fechar.

### Manter isso fechado: ativar o Dependabot

A ativação é feita nas configurações do GitHub, fora do alcance de um commit:

**Settings → Code security and analysis**, e habilite:

- **Dependabot alerts** — avisa quando uma dependência do projeto passa a ter
  vulnerabilidade conhecida.
- **Dependabot security updates** — abre PR sozinho com a correção.

Sem isso, a lista volta a acumular e só reaparece na próxima auditoria manual.

## Validação de dados vindos do CMS

`src/lib/sanitize.js` concentra a validação de tudo o que o painel publica e
que o navegador trata como mais do que texto:

- `isGoogleMapsUrl` — antes do `src` do iframe do mapa
- `isHttpsUrl` — antes do `href` dos links de redes sociais
- `isValidHexColor` — antes de escrever nas custom properties do CSS

A regra é lista de permissão, nunca de bloqueio: filtrar `javascript:` por
substring deixaria passar variações com espaço, maiúscula ou entidade HTML.

Verificação: `node scripts/verifica-sanitize.mjs` (sai com código diferente de
zero em caso de falha, então serve como passo de CI).

## Cabeçalhos

Duas camadas, porque nenhuma cobre a outra:

- **`index.html`** — a Content-Security-Policy, por meta tag. Vale mesmo em
  hospedagem 100% estática, sem depender do servidor.
- **`public/.htaccess`** — `X-Frame-Options`, `X-Content-Type-Options` e
  `Strict-Transport-Security`, que só funcionam como cabeçalho HTTP.

**Pendente de conferência em produção:** a Locaweb pode ignorar `.htaccess`
conforme o plano de hospedagem. Depois do deploy, abra o site na aba
Network → Headers e confirme que os três aparecem. Se não aparecerem, a
proteção real é só a do `index.html` — registre a limitação em vez de dar o
item como resolvido.
