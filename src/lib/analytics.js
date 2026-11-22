// Eventos de conversão do Google Analytics (GA4).
//
// O gtag em si é inicializado por public/analytics-init.js (a CSP não deixa
// script inline). Aqui só existe o ponto único por onde o app registra eventos.

// Chaves que NUNCA podem ir para o GA4. O Google proíbe dado pessoal e pode
// apagar a propriedade por isso. O formulário de contato tem exatamente estes
// campos, então a trava existe para um descuido futuro — alguém acrescentar
// `nome` ao evento "só para ajudar" — não para o código de hoje.
const CHAVES_PROIBIDAS = new Set([
  'nome', 'name', 'telefone', 'phone', 'tel', 'email', 'e-mail', 'mensagem', 'message', 'cpf', 'cnpj',
]);

/**
 * Registra um evento. Não faz nada quando a medição está desligada
 * (homologação, ou o gtag não carregou), e nunca lança: falha de analytics não
 * pode quebrar o envio do formulário.
 */
export function track(evento, params = {}) {
  try {
    // `__medirAnalytics` é definido em public/analytics-init.js, no mesmo `if`
    // que decide se o `config` roda. Uma regra só para "medir ou não".
    if (!window.__medirAnalytics || typeof window.gtag !== 'function') return;

    const seguros = {};
    for (const [chave, valor] of Object.entries(params)) {
      if (CHAVES_PROIBIDAS.has(chave.toLowerCase())) continue;
      seguros[chave] = valor;
    }
    window.gtag('event', evento, seguros);
  } catch {
    /* analytics é opcional: ignora */
  }
}
