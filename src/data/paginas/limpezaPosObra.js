// Página de serviço: Limpeza pós-obra. [A CONFIRMAR] = lacuna de informação
// da empresa. Afirmado aqui só o que o site já diz (content.json).
import { regioes, etapas, faqPendente } from './comum';

export const limpezaPosObra = {
  caminho: 'servicos/limpeza-pos-obra/',
  chave: 'posobra',
  seo: {
    titulo: 'Limpeza Pós-Obra para Condomínios, Empresas e Indústrias | Evolutionis',
    descricao:
      'Limpeza pós-obra com retirada de resíduo fino, remoção de respingos e higienização completa — a obra entregue pronta para uso. São Roque, Barueri, Alphaville, Cajamar, Indaiatuba e São Paulo.',
  },
  hero: {
    eyebrow: 'Limpeza pós-obra',
    titulo: 'Limpeza pós-obra: a obra entregue pronta para uso',
    texto:
      'Retirada de resíduo fino, remoção de respingos e higienização completa — a obra entregue pronta para uso, sem etapa intermediária.',
  },
  incluido: {
    titulo: 'O que o serviço inclui',
    itens: [
      { titulo: 'Retirada de resíduo fino', texto: 'Retirada do resíduo fino da obra. [A CONFIRMAR: entulho grosso está incluído?]' },
      { titulo: 'Remoção de respingos', texto: '[SUGESTÃO: tinta, massa e cimento em pisos, vidros e esquadrias] [A CONFIRMAR: métodos e produtos]' },
      { titulo: 'Higienização completa', texto: 'A obra entregue pronta para uso. [A CONFIRMAR: o que entra — banheiros, cozinhas, luminárias, áreas externas]' },
    ],
  },
  etapas: etapas('Equipe treinada, com equipamento de proteção e procedimento definido. [A CONFIRMAR: prazo médio por tamanho de obra]'),
  publicos: {
    titulo: 'Para quem atendemos',
    itens: [
      { titulo: 'Condomínios', texto: '[A CONFIRMAR]' },
      { titulo: 'Empresas', texto: '[A CONFIRMAR]' },
      { titulo: 'Construtoras e indústrias', texto: '[A CONFIRMAR: atendem construtoras na entrega de empreendimentos?]' },
    ],
  },
  regioes: regioes(),
  faq: faqPendente([
    'A limpeza pode começar com a obra ainda em andamento?',
    'Quanto tempo leva a limpeza pós-obra?',
    'Vocês levam os produtos e equipamentos?',
  ]),
};

export default limpezaPosObra;
