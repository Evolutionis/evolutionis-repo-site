// Inicialização do Google Analytics (gtag.js).
//
// É o bloco <script> inline que o Google entrega, movido para um arquivo: a CSP
// do index.html não permite script inline (script-src 'self'), e liberar
// 'unsafe-inline' para isto desfaria a proteção dos achados A1 e A2 inteira.
// Ficar em public/ faz o Vite copiar o arquivo como está, sem empacotar.
//
// A ordem em relação ao gtag.js não importa: o gtag.js é carregado com async e
// lê a fila `dataLayer` quando chega, então tudo que entrar antes é processado.

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag('js', new Date());

// A homologação (/preview/) roda o MESMO build da produção, então sem esta
// guarda cada conferência da equipe antes de promover contaria como visita
// real no relatório. O gtag.js carrega igual, mas sem `config` ele não envia
// nada. Para medir a homologação também, apague o `if`.
if (!/^\/preview(\/|$)/.test(window.location.pathname)) {
  gtag('config', 'G-WPM1B5QR0Q');
}
