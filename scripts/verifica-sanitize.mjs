// Verificação das validações do TAR-05 (achados A2, C1 e C2).
//
//   node scripts/verifica-sanitize.mjs
//
// Sai com código 1 se algum caso falhar, para poder entrar num passo de CI.
// Não depende de navegador: CSS.escape é preenchido abaixo com a mesma
// especificação, já que aqui interessa o resultado do escape, não o DOM.

import { isGoogleMapsUrl, isHttpsUrl, isValidHexColor } from '../src/lib/sanitize.js';

// CSS.escape não existe no Node. Implementação conforme a especificação da CSSOM
// (https://drafts.csswg.org/cssom/#the-css.escape%28%29-method), reduzida ao que
// estes casos exercitam.
if (typeof globalThis.CSS === 'undefined') {
  globalThis.CSS = {
    escape(valor) {
      return String(valor).replace(/[^\w-]/g, (c) => `\\${c}`);
    },
  };
}

let falhas = 0;

function checa(descricao, obtido, esperado) {
  const ok = obtido === esperado;
  if (!ok) falhas++;
  const marca = ok ? 'ok  ' : 'FALHA';
  console.log(`${marca} ${descricao}`);
  if (!ok) console.log(`      esperado ${JSON.stringify(esperado)}, obtido ${JSON.stringify(obtido)}`);
}

console.log('\n— A2 · URL do mapa —');
checa(
  'embed legítimo do Google Maps passa',
  isGoogleMapsUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3'),
  true,
);
checa('subdomínio maps.google.com passa', isGoogleMapsUrl('https://maps.google.com/maps?q=x'), true);
checa('domínio .com.br passa', isGoogleMapsUrl('https://www.google.com.br/maps/embed?pb=x'), true);
checa('javascript: é rejeitado', isGoogleMapsUrl('javascript:parent.XSS.push(1)'), false);
checa('data: é rejeitado', isGoogleMapsUrl('data:text/html,<script>alert(1)</script>'), false);
checa('http (sem TLS) é rejeitado', isGoogleMapsUrl('http://www.google.com/maps/embed'), false);
checa('domínio de terceiro é rejeitado', isGoogleMapsUrl('https://evil.com/maps/embed'), false);
checa(
  'sufixo enganoso é rejeitado',
  isGoogleMapsUrl('https://google.com.invasor.net/maps/embed'),
  false,
);
checa('prefixo enganoso é rejeitado', isGoogleMapsUrl('https://naogoogle.com/maps'), false);
checa(
  'google no fragmento não engana',
  isGoogleMapsUrl('https://evil.com/#https://www.google.com/maps'),
  false,
);
checa('vazio é rejeitado', isGoogleMapsUrl(''), false);
checa('malformado é rejeitado', isGoogleMapsUrl('nao é uma url'), false);
checa('undefined é rejeitado', isGoogleMapsUrl(undefined), false);

console.log('\n— A2 · link de rede social —');
checa('perfil https passa', isHttpsUrl('https://instagram.com/evolutionis'), true);
checa('javascript: é rejeitado', isHttpsUrl('javascript:alert(1)'), false);
checa('http é rejeitado', isHttpsUrl('http://instagram.com/evolutionis'), false);
checa('vazio é rejeitado', isHttpsUrl(''), false);

console.log('\n— C1 · cor da identidade —');
checa('hex de 6 dígitos passa', isValidHexColor('#1E4E79'), true);
checa('minúsculas passam', isValidHexColor('#ddeaf6'), true);
checa('CSS injetado é rejeitado', isValidHexColor('red; } body { display:none'), false);
checa('nome de cor é rejeitado', isValidHexColor('red'), false);
checa('hex de 3 dígitos é rejeitado', isValidHexColor('#fff'), false);
checa('expressão url() é rejeitada', isValidHexColor('#fff; background:url(//evil.com)'), false);
checa('undefined é rejeitado', isValidHexColor(undefined), false);

console.log('\n— C2 · chave no seletor —');
// O que importa: com o escape, o valor continua sendo um valor — não fecha o
// seletor nem injeta sintaxe. Sem o escape, a aspa encerraria o atributo.
const chaveHostil = 'limpeza"], .outro-alvo[x="';
const seletor = `.svc-item[data-svc="${CSS.escape(chaveHostil)}"]`;
// Só as aspas não escapadas delimitam o valor. Devem sobrar exatamente as duas
// que o próprio template abre e fecha; as da chave chegam neutralizadas.
const aspasAtivas = (seletor.match(/(^|[^\\])"/g) || []).length;
checa('aspa da chave não fecha o seletor', aspasAtivas, 2);
checa(
  'colchete da chave não abre outro atributo',
  (seletor.match(/(^|[^\\])\[/g) || []).length,
  1,
);
checa('chave normal sobrevive ao escape', CSS.escape('limpeza'), 'limpeza');

console.log(
  falhas === 0
    ? '\nTodos os casos passaram.\n'
    : `\n${falhas} caso(s) falharam.\n`,
);
process.exit(falhas === 0 ? 0 : 1);
