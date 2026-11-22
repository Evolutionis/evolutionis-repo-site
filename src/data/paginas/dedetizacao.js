// Página de serviço: Dedetização e controle de pragas.
//
// O texto mora no código por enquanto (decisão de 22/11/2026): a primeira página
// valida o modelo; depois de validado, os campos migram para o content.json e o
// painel passa a editá-los.
//
// [A CONFIRMAR] é lacuna de informação da empresa; [SUGESTÃO: ...] é texto
// proposto sem fonte no site, que a empresa precisa aprovar. Nenhum dos dois é texto
// final. Só está afirmado aqui o que o próprio site já afirma (content.json):
// procedimentos aprovados pela ANVISA, dedetização/desratização/descupinização,
// urgência 24h inclusive fim de semana, visita técnica sem custo, equipe com EPI,
// mais de 20 anos, condomínios/empresas/indústrias.

import { regioes } from './comum';

export const dedetizacao = {
  caminho: 'servicos/dedetizacao-e-controle-de-pragas/',
  // Mesma `chave` do item em content.json → servicos.itens: é por ela que o
  // card da home encontra o link para esta página.
  chave: 'dedetizacao',
  seo: {
    titulo: 'Dedetização e Controle de Pragas para Condomínios e Empresas | Evolutionis',
    descricao:
      'Dedetização, desratização e descupinização para condomínios, empresas e indústrias em São Roque, Barueri, Alphaville, Cajamar, Indaiatuba e São Paulo. Urgência 24h e visita técnica sem custo.',
  },

  hero: {
    eyebrow: 'Controle de pragas',
    titulo: 'Dedetização e controle de pragas para condomínios, empresas e indústrias',
    texto:
      'Inspeção, aplicação e monitoramento com procedimentos aprovados pela ANVISA. Dedetização, desratização e descupinização, com atendimento de urgência 24h — inclusive fins de semana.',
  },

  incluido: {
    titulo: 'O que o serviço inclui',
    itens: [
      { titulo: 'Dedetização', texto: '[SUGESTÃO: controle de insetos rasteiros e voadores] [A CONFIRMAR: quais insetos e quais métodos — gel, pulverização, iscas]' },
      { titulo: 'Desratização', texto: 'Controle de roedores. [A CONFIRMAR: método — iscas, armadilhas, porta-iscas monitorados]' },
      { titulo: 'Descupinização', texto: 'Tratamento contra cupins. [A CONFIRMAR: tipos de cupim e método]' },
      { titulo: 'Monitoramento', texto: 'Acompanhamento depois da aplicação. [A CONFIRMAR: como é feito e com que frequência]' },
    ],
  },

  etapas: {
    titulo: 'Como funciona',
    itens: [
      { titulo: 'Visita técnica sem custo', texto: 'Avaliamos o local para dimensionar o serviço pelo que ele realmente precisa.' },
      { titulo: 'Orçamento', texto: '[A CONFIRMAR: prazo de envio do orçamento]' },
      { titulo: 'Aplicação', texto: 'Equipe treinada, com equipamento de proteção e procedimento definido. [A CONFIRMAR: precisa desocupar o local? por quantas horas?]' },
      { titulo: 'Registro e acompanhamento', texto: 'Cada visita fica registrada no portal do cliente. [A CONFIRMAR: certificado/laudo entregue e garantia em dias]' },
    ],
  },

  publicos: {
    titulo: 'Para quem atendemos',
    itens: [
      { titulo: 'Condomínios', texto: '[SUGESTÃO: áreas comuns, garagens, casas de máquinas e reservatórios] [A CONFIRMAR: frequência recomendada]' },
      { titulo: 'Empresas', texto: '[SUGESTÃO: escritórios, comércios e áreas de circulação] [A CONFIRMAR: frequência recomendada]' },
      { titulo: 'Indústrias', texto: '[SUGESTÃO: áreas produtivas e de armazenagem] [A CONFIRMAR: exigências atendidas e frequência]' },
    ],
  },

  regioes: regioes('Urgência 24h: chame no WhatsApp e acionamos a equipe de plantão. [A CONFIRMAR: o 24h vale para todas as cidades?]'),

  faq: {
    titulo: 'Perguntas frequentes',
    itens: [
      { pergunta: '[A CONFIRMAR] Preciso sair do local durante a aplicação?', resposta: '[A CONFIRMAR]' },
      { pergunta: '[A CONFIRMAR] O produto é seguro para crianças e animais?', resposta: '[A CONFIRMAR]' },
      { pergunta: '[A CONFIRMAR] De quanto em quanto tempo devo fazer a dedetização?', resposta: '[A CONFIRMAR]' },
      { pergunta: '[A CONFIRMAR] Vocês emitem certificado?', resposta: '[A CONFIRMAR]' },
    ],
  },
};

export default dedetizacao;
