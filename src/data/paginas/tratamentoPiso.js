// Página de serviço: Tratamento de piso. [A CONFIRMAR] = lacuna de informação
// da empresa. Afirmado aqui só o que o site já diz (content.json).
import { regioes, etapas, faqPendente } from './comum';

export const tratamentoPiso = {
  caminho: 'servicos/tratamento-de-piso/',
  chave: 'piso',
  seo: {
    titulo: 'Tratamento de Piso: Lavagem, Cristalização e Impermeabilização | Evolutionis',
    descricao:
      'Lavagem mecanizada, cristalização e impermeabilização de pisos para condomínios, empresas e indústrias — recupera o piso e prolonga o intervalo entre manutenções. São Roque, Barueri, Alphaville, Cajamar, Indaiatuba e São Paulo.',
  },
  hero: {
    eyebrow: 'Tratamento de piso',
    titulo: 'Tratamento de piso: lavagem mecanizada, cristalização e impermeabilização',
    texto:
      'Lavagem mecanizada, cristalização e impermeabilização — recupera o piso e prolonga o intervalo entre manutenções.',
  },
  incluido: {
    titulo: 'O que o serviço inclui',
    itens: [
      { titulo: 'Lavagem mecanizada', texto: 'Lavagem mecanizada. [A CONFIRMAR: tipos de piso atendidos]' },
      { titulo: 'Cristalização', texto: 'Recupera o piso. [A CONFIRMAR: em quais pisos — mármore, granito, granilite?]' },
      { titulo: 'Impermeabilização', texto: 'Prolonga o intervalo entre manutenções. [A CONFIRMAR: produtos e durabilidade]' },
    ],
  },
  etapas: etapas('Equipe treinada, com equipamento de proteção e procedimento definido. [A CONFIRMAR: o local precisa ficar fechado? por quanto tempo até liberar o tráfego?]'),
  publicos: {
    titulo: 'Para quem atendemos',
    itens: [
      { titulo: 'Condomínios', texto: '[SUGESTÃO: halls, garagens e áreas comuns] [A CONFIRMAR]' },
      { titulo: 'Empresas', texto: '[SUGESTÃO: recepções, corredores e lojas] [A CONFIRMAR]' },
      { titulo: 'Indústrias', texto: '[A CONFIRMAR: piso industrial/epóxi?]' },
    ],
  },
  regioes: regioes(),
  faq: faqPendente([
    'Quais tipos de piso vocês tratam?',
    'Quanto tempo o piso fica sem poder ser usado?',
    'De quanto em quanto tempo o tratamento precisa ser refeito?',
  ]),
};

export default tratamentoPiso;
