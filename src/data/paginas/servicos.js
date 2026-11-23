// Página /servicos/: lista de todos os serviços. Os itens vêm do content.json
// (servicos.itens), os mesmos da home — esta lista nunca fica desatualizada.
export const listaServicos = {
  caminho: 'servicos/',
  // Pode ir para produção: o texto da lista vem todo do content.json.
  publicada: true,
  seo: {
    titulo: 'Serviços de Limpeza, Dedetização e Paisagismo para Condomínios e Empresas | Evolutionis',
    descricao:
      "Dedetização, paisagismo, limpeza pós-obra, limpeza de fachada, tratamento de piso e limpeza de caixa d'água para condomínios, empresas e indústrias. Um único time, sem repasse entre fornecedores.",
  },
  hero: {
    eyebrow: 'Serviços',
    titulo: 'Serviços para condomínios, empresas e indústrias',
    texto: 'Seis frentes conduzidas por um único time, sem repasse entre fornecedores.',
  },
};

export default listaServicos;
