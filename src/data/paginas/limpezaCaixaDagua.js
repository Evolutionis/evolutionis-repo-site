// Página de serviço: Limpeza de caixa d'água. [A CONFIRMAR] = lacuna de
// informação da empresa. Afirmado aqui só o que o site já diz (content.json).
import { regioes, etapas, faqPendente } from './comum';

export const limpezaCaixaDagua = {
  caminho: 'servicos/limpeza-de-caixa-dagua/',
  chave: 'caixadagua',
  seo: {
    titulo: "Limpeza de Caixa d'Água com Laudo para Condomínios e Empresas | Evolutionis",
    descricao:
      "Higienização de caixas d'água e reservatórios em condomínios, prédios comerciais e shoppings, com laudo e periodicidade dentro da norma. São Roque, Barueri, Alphaville, Cajamar, Indaiatuba e São Paulo.",
  },
  hero: {
    eyebrow: "Limpeza de caixa d'água",
    titulo: "Limpeza de caixa d'água e reservatórios com laudo técnico",
    texto:
      "Higienização de reservatórios em shoppings, prédios comerciais e condomínios, com laudo e periodicidade dentro da norma.",
  },
  incluido: {
    titulo: 'O que o serviço inclui',
    itens: [
      { titulo: 'Higienização do reservatório', texto: "Higienização de reservatórios. [A CONFIRMAR: etapas e produtos]" },
      { titulo: 'Laudo técnico', texto: '[A CONFIRMAR: o que o laudo atesta e quem assina]' },
      { titulo: 'Periodicidade dentro da norma', texto: '[A CONFIRMAR: qual norma e de quanto em quanto tempo]' },
    ],
  },
  etapas: etapas('Equipe treinada, com equipamento de proteção e procedimento definido. [A CONFIRMAR: quanto tempo fica sem água? como é feito o aviso aos moradores?]'),
  publicos: {
    titulo: 'Para quem atendemos',
    itens: [
      { titulo: 'Condomínios', texto: '[A CONFIRMAR]' },
      { titulo: 'Prédios comerciais', texto: '[A CONFIRMAR]' },
      { titulo: 'Shoppings', texto: '[A CONFIRMAR: capacidade máxima atendida]' },
    ],
  },
  regioes: regioes(),
  faq: faqPendente([
    "De quanto em quanto tempo a caixa d'água deve ser limpa?",
    'Quanto tempo o prédio fica sem água?',
    'O laudo serve para a fiscalização da Vigilância Sanitária?',
  ]),
};

export default limpezaCaixaDagua;
