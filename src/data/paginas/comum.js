// Blocos que se repetem em todas as páginas de serviço. Só contém o que o site
// já afirma (content.json): visita técnica sem custo, equipe treinada com EPI,
// visitas registradas no portal do cliente, condomínios/empresas/indústrias.

export const CIDADES = ['São Roque', 'Barueri', 'Alphaville', 'Cajamar', 'Indaiatuba', 'São Paulo'];

export function regioes(texto = '[A CONFIRMAR: alguma cidade tem restrição para este serviço?]') {
  return { titulo: 'Regiões atendidas', cidades: CIDADES, texto };
}

/** As quatro etapas do atendimento; só a de execução muda por serviço. */
export function etapas(execucao) {
  return {
    titulo: 'Como funciona',
    itens: [
      { titulo: 'Visita técnica sem custo', texto: 'Avaliamos o local para dimensionar o serviço pelo que ele realmente precisa.' },
      { titulo: 'Orçamento', texto: '[A CONFIRMAR: prazo de envio do orçamento]' },
      { titulo: 'Execução', texto: execucao },
      { titulo: 'Registro e acompanhamento', texto: 'Cada visita fica registrada no portal do cliente. [A CONFIRMAR: o que é entregue ao final — relatório, laudo, certificado — e garantia]' },
    ],
  };
}

export function faqPendente(perguntas) {
  return {
    titulo: 'Perguntas frequentes',
    itens: perguntas.map((p) => ({ pergunta: `[A CONFIRMAR] ${p}`, resposta: '[A CONFIRMAR]' })),
  };
}
