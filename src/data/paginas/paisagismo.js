// Página de serviço: Paisagismo. [A CONFIRMAR] = lacuna de informação da
// empresa. Afirmado aqui só o que o site já diz (content.json).
import { regioes, etapas, faqPendente } from './comum';

export const paisagismo = {
  caminho: 'servicos/paisagismo/',
  // false até o conteúdo ser aprovado pela empresa: a página aparece na
  // homologação, mas não é gerada nem linkada em produção (ver src/paginas.js).
  publicada: false,
  chave: 'paisagismo',
  seo: {
    titulo: 'Paisagismo para Condomínios e Empresas — Projeto e Manutenção | Evolutionis',
    descricao:
      'Projeto, implantação e manutenção de áreas verdes para condomínios, empresas e indústrias, com poda técnica e irrigação automatizada. São Roque, Barueri, Alphaville, Cajamar, Indaiatuba e São Paulo.',
  },
  hero: {
    eyebrow: 'Paisagismo',
    titulo: 'Paisagismo para condomínios, empresas e indústrias',
    texto:
      'Projeto, implantação e manutenção contínua de áreas verdes — poda técnica e irrigação automatizada para o jardim atravessar o ano inteiro bem.',
  },
  incluido: {
    titulo: 'O que o serviço inclui',
    itens: [
      { titulo: 'Projeto', texto: '[A CONFIRMAR: o que o projeto entrega — planta, espécies, orçamento de implantação]' },
      { titulo: 'Implantação', texto: '[A CONFIRMAR: preparo de solo, plantio, prazos]' },
      { titulo: 'Manutenção e poda', texto: 'Manutenção contínua com poda técnica. [A CONFIRMAR: frequência das visitas e o que cada visita inclui]' },
      { titulo: 'Irrigação automatizada', texto: 'Irrigação automatizada. [A CONFIRMAR: instalação, manutenção ou ambos]' },
    ],
  },
  etapas: etapas('Equipe treinada, com equipamento de proteção e procedimento definido. [A CONFIRMAR: equipe fixa ou visitas programadas?]'),
  publicos: {
    titulo: 'Para quem atendemos',
    itens: [
      { titulo: 'Condomínios', texto: '[SUGESTÃO: jardins, áreas comuns e de lazer] [A CONFIRMAR: frequência recomendada]' },
      { titulo: 'Empresas', texto: '[SUGESTÃO: áreas externas e recepções] [A CONFIRMAR]' },
      { titulo: 'Indústrias', texto: '[SUGESTÃO: grandes áreas externas] [A CONFIRMAR]' },
    ],
  },
  regioes: regioes(),
  faq: faqPendente([
    'Vocês fazem só a manutenção de um jardim que já existe?',
    'Com que frequência a equipe vem ao local?',
    'O descarte dos resíduos da poda está incluído?',
  ]),
};

export default paisagismo;
