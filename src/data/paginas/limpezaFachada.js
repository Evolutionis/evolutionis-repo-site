// Página de serviço: Limpeza de fachada. [A CONFIRMAR] = lacuna de informação
// da empresa. Afirmado aqui só o que o site já diz (content.json).
import { regioes, etapas, faqPendente } from './comum';

export const limpezaFachada = {
  caminho: 'servicos/limpeza-de-fachada/',
  // false até o conteúdo ser aprovado pela empresa: a página aparece na
  // homologação, mas não é gerada nem linkada em produção (ver src/paginas.js).
  publicada: false,
  chave: 'fachada',
  seo: {
    titulo: 'Limpeza de Fachada e Vidros em Altura para Prédios e Empresas | Evolutionis',
    descricao:
      'Limpeza de fachadas, vidros, revestimentos e esquadrias em altura, com equipe treinada em trabalho vertical e equipamento de segurança certificado. São Roque, Barueri, Alphaville, Cajamar, Indaiatuba e São Paulo.',
  },
  hero: {
    eyebrow: 'Limpeza de fachada',
    titulo: 'Limpeza de fachada com trabalho em altura e segurança certificada',
    texto:
      'Vidros, revestimentos e esquadrias em altura, com equipe treinada em trabalho vertical e equipamento de segurança certificado.',
  },
  incluido: {
    titulo: 'O que o serviço inclui',
    itens: [
      { titulo: 'Vidros', texto: 'Vidros em altura. [A CONFIRMAR: vidros internos também?]' },
      { titulo: 'Revestimentos', texto: '[A CONFIRMAR: tipos atendidos e métodos — lavagem, hidrojateamento]' },
      { titulo: 'Esquadrias', texto: 'Esquadrias em altura. [A CONFIRMAR]' },
    ],
  },
  etapas: etapas('Equipe treinada em trabalho vertical, com equipamento de segurança certificado. [A CONFIRMAR: normas seguidas (ex.: NR-35), uso de balancim ou rapel, altura máxima]'),
  publicos: {
    titulo: 'Para quem atendemos',
    itens: [
      { titulo: 'Condomínios', texto: '[A CONFIRMAR: frequência recomendada]' },
      { titulo: 'Empresas', texto: '[A CONFIRMAR]' },
      { titulo: 'Indústrias', texto: '[A CONFIRMAR]' },
    ],
  },
  regioes: regioes(),
  faq: faqPendente([
    'Que norma de segurança a equipe segue no trabalho em altura?',
    'Precisa interditar a calçada ou parte do prédio?',
    'Com que frequência a fachada deve ser limpa?',
  ]),
};

export default limpezaFachada;
