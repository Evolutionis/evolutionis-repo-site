// Validação de dados vindos do CMS.
//
// Tudo o que o painel publica em content.json chega aqui como texto livre: quem
// tiver acesso ao painel (ou a qualquer falha que permita escrever nesse arquivo)
// escolhe o valor. Os pontos abaixo são os que o navegador trata como algo mais
// do que texto — src de iframe, href de link, propriedade CSS, seletor — e por
// isso precisam de validação antes do uso, não depois.
//
// A regra destas funções é ser lista de permissão, nunca de bloqueio: só passa
// o que casa com o formato esperado. Filtrar "javascript:" por substring, por
// exemplo, deixaria passar variações com espaço, maiúscula ou entidade HTML.

/** Faz o parse sem lançar. Devolve null para qualquer coisa que não seja URL. */
function parseUrl(valor) {
  if (typeof valor !== 'string' || valor.trim() === '') return null;
  try {
    return new URL(valor);
  } catch {
    return null;
  }
}

// Domínios de onde um mapa incorporado pode vir. O confronto é feito sobre o
// hostname já normalizado pelo parser da URL — comparar a string crua deixaria
// passar coisas como "https://evil.com/#www.google.com".
const DOMINIOS_MAPA = ['google.com', 'google.com.br'];

/**
 * URL de incorporação do Google Maps: https, e hospedada num domínio do Google.
 * Aceita o domínio exato e os subdomínios (www.google.com, maps.google.com).
 * O ponto antes do domínio na comparação de sufixo é o que impede que
 * "naogoogle.com" ou "google.com.invasor.net" passem.
 */
export function isGoogleMapsUrl(valor) {
  const url = parseUrl(valor);
  if (!url || url.protocol !== 'https:') return false;
  const host = url.hostname.toLowerCase();
  return DOMINIOS_MAPA.some((d) => host === d || host.endsWith(`.${d}`));
}

/**
 * Link externo aceitável (redes sociais do rodapé). Exige https: — o que
 * descarta javascript:, data: e afins, que num href executam ao clique.
 */
export function isHttpsUrl(valor) {
  const url = parseUrl(valor);
  return url !== null && url.protocol === 'https:';
}

/**
 * Cor em hexadecimal de 6 dígitos. Usada antes de escrever numa custom property
 * do CSS: um valor como "red; } body { display:none" entraria no CSSOM e
 * poderia alterar a página inteira.
 */
export function isValidHexColor(valor) {
  return typeof valor === 'string' && /^#[0-9a-fA-F]{6}$/.test(valor);
}
