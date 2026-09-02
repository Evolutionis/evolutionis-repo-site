// Conteúdo padrão do site.
//
// Tudo que aparece na tela nasce daqui e pode ser sobrescrito pelo `content.json`
// que o CMS publica. Se um campo ainda não existe no painel, ou se o content.json
// falhar ao carregar, a seção renderiza com estes valores em vez de aparecer vazia.
//
// Marcadores PLACEHOLDER indicam conteúdo fictício aguardando dado real.

export const DEFAULTS = {
  identidade: {
    corPrimaria: '#1E4E79',
    corSecundaria: '#DDEAF6',
    // Cabeçalho e fundos claros: logotipo com a placa azul-clara preenchida.
    logo: '/logo.png',
    // Rodapé: versão invertida da mesma arte, para fundo escuro (#0F1A24).
    // Dá 14,4:1 de contraste, acima do mínimo de 3:1 da WCAG para elementos
    // gráficos. A versão em azul da marca (/logo-rodape.png) fica em 2,03:1
    // sobre esse fundo — praticamente ilegível — por isso não é usada aqui.
    logoRodape: '/logo-claro.png',
  },

  cabecalho: {
    menu1: 'A operação',
    menu2: 'Serviços',
    menu3: 'Acompanhamento',
    menu4: 'Clientes',
    menu5: 'Diferenciais',
    menu6: 'Contato',
    textoBotao: 'Solicitar orçamento',
  },

  hero: {
    badge: 'São Roque/SP · há mais de 20 anos',
    titulo: 'Sua operação limpa, verde e protegida.',
    tituloDestaque: 'protegida',
    subtitulo:
      'Limpeza profissional, paisagismo e controle de pragas para condomínios, empresas e indústrias — frentes conduzidas por um time só, sem repasse entre fornecedores.',
    textoBotao1: 'Solicitar orçamento',
    textoBotao2: 'Ver os serviços',
    aviso: 'Cada atendimento acompanhado em tempo real pelo portal do cliente',
    pilares: [
      { titulo: 'Limpeza profissional', desc: "Pós-obra, fachadas, pisos e caixa d'água", alvo: 'limpeza', icone: 'limpeza' },
      { titulo: 'Paisagismo', desc: 'Projetos, manutenção, poda e irrigação automatizada', alvo: 'paisagismo', icone: 'planta' },
      { titulo: 'Controle de pragas', desc: 'Dedetização, desratização e descupinização — ANVISA', alvo: 'dedetizacao', icone: 'escudo' },
    ],
    estatisticas: [
      { valor: '20+', rotulo: 'Anos de operação' },
      { valor: '500+', rotulo: 'Clientes atendidos' },
      { valor: '98%', rotulo: 'Índice de satisfação' },
      { valor: '24h', rotulo: 'Urgências de pragas' },
    ],
  },

  operacao: {
    eyebrow: 'A operação',
    titulo: 'Duas décadas fazendo o trabalho que só aparece quando falha.',
    texto:
      'Limpeza, jardim e controle de pragas são serviços invisíveis quando bem executados. Foi mantendo essa invisibilidade em condomínios, empresas e indústrias da região que a Evolutionis chegou aos 20 anos.',
    pontos: [
      {
        titulo: 'Um fornecedor, várias frentes',
        texto:
          'Você trata com um interlocutor só. Sem repassar responsabilidade entre empresas quando o jardim precisa de poda no mesmo dia da dedetização.',
      },
      {
        titulo: 'Equipe própria e treinada',
        texto:
          'Times fixos por contrato, que conhecem o local e o padrão esperado — não uma equipe diferente a cada visita.',
      },
      {
        titulo: 'Procedimentos e conformidade',
        texto:
          'Produtos adequados a cada superfície e procedimentos de controle de pragas aprovados pela ANVISA.',
      },
      {
        titulo: 'Visibilidade do que foi feito',
        texto:
          'Cada atendimento é registrado e fica disponível para consulta — não é preciso ligar para saber se a equipe passou.',
      },
    ],
  },

  // Cada serviço tem um trecho do filme em public/servicos.mp4.
  // `a` e `b` são os segundos de início e fim do trecho — a rolagem move
  // o currentTime do vídeo dentro dessa faixa. Se mudar o vídeo, ajuste aqui.
  servicos: {
    eyebrow: 'Serviços',
    titulo: 'Três frentes, um único time.',
    texto:
      'A rolagem controla o vídeo ao lado: cada serviço que você percorre avança a cena correspondente, mostrando o time em campo.',
    itens: [
      {
        chave: 'paisagismo',
        num: '01',
        titulo: 'Paisagismo',
        rotulo: 'Paisagismo',
        legenda: 'Poda técnica de cerca-viva',
        desc: 'Projeto, implantação e manutenção contínua de áreas verdes — poda técnica e irrigação automatizada para o jardim atravessar o ano inteiro bem.',
        tags: ['Projetos', 'Manutenção', 'Poda', 'Irrigação'],
        a: 0.0,
        b: 1.708,
      },
      {
        chave: 'dedetizacao',
        num: '02',
        titulo: 'Dedetização e controle de pragas',
        rotulo: 'Dedetização',
        legenda: 'Aplicação com equipamento de proteção',
        desc: 'Inspeção, aplicação e monitoramento com procedimentos aprovados pela ANVISA. Dedetização, desratização e descupinização, com urgência 24h.',
        tags: ['Dedetização', 'Desratização', 'Descupinização', 'Urgência 24h'],
        a: 1.708,
        b: 3.458,
      },
      {
        // Pós-obra, fachada, piso e caixa d'água eram quatro serviços separados.
        // Viraram especialidades de um só, porque é assim que o Hero, o rodapé e
        // o formulário sempre nomearam o conjunto: "Limpeza profissional".
        //
        // A fusão não exigiu recortar o vídeo: os quatro segmentos eram
        // contíguos (3,458 → 5,166 → 6,791 → 8,041 → 10,416), então o trecho
        // deste item é a soma exata deles.
        chave: 'limpeza',
        num: '03',
        titulo: 'Limpeza profissional',
        rotulo: 'Limpeza profissional',
        legenda: 'Da entrega da obra à manutenção do dia a dia',
        desc: 'Conservação do ambiente construído de ponta a ponta — da entrega da obra à rotina de manutenção, com equipe treinada e equipamento próprio para cada superfície.',
        especialidades: [
          {
            titulo: 'Pós-obra',
            desc: 'Retirada de resíduo fino, remoção de respingos e higienização completa — a obra entregue pronta para uso, sem etapa intermediária.',
          },
          {
            titulo: 'Fachada',
            desc: 'Vidros, revestimentos e esquadrias em altura, com equipe treinada em trabalho vertical e equipamento de segurança certificado.',
          },
          {
            titulo: 'Tratamento de piso',
            desc: 'Lavagem mecanizada, cristalização e impermeabilização — recupera o piso e prolonga o intervalo entre manutenções.',
          },
          {
            titulo: "Caixa d'água",
            desc: 'Higienização de reservatórios em shoppings, prédios comerciais e condomínios, com laudo e periodicidade dentro da norma.',
          },
        ],
        a: 3.458,
        b: 10.416,
      },
    ],
  },

  acompanhamento: {
    eyebrow: 'Acompanhamento em tempo real',
    titulo: 'Você não precisa ligar para saber se a equipe passou.',
    texto:
      'Nossa operação de campo é gerenciada pelo Field Control — e você recebe acesso ao portal do cliente, onde acompanha cada ordem de serviço em tempo real.',
    itens: [
      { titulo: 'Status de cada atendimento', texto: 'Veja o que está agendado, em execução e concluído, sem depender de telefonema ou mensagem.' },
      { titulo: 'Equipe a caminho', texto: 'Acompanhe o deslocamento do time da nossa base até o seu endereço, com horário de chegada.' },
      { titulo: 'Histórico completo', texto: 'Todo serviço executado fica registrado — útil na prestação de contas em assembleia ou auditoria.' },
      { titulo: 'Abertura de chamados', texto: 'Solicite um atendimento extra pelo próprio portal, sem passar por intermediário.' },
    ],
    ordens: [
      { titulo: 'Limpeza de áreas comuns', detalhe: 'Concluído · Bloco A', hora: '08:40', estado: 'done' },
      { titulo: 'Poda e manutenção do jardim', detalhe: 'Em execução · equipe no local', hora: '10:15', estado: 'now' },
      { titulo: 'Controle de pragas · garagem', detalhe: 'Agendado · equipe a caminho', hora: '14:00', estado: 'next' },
      { titulo: 'Higienização de carpetes', detalhe: 'Agendado · salão de festas', hora: '16:30', estado: 'next' },
    ],
  },

  clientes: {
    eyebrow: 'Quem confia na Evolutionis',
    titulo: 'Condomínios, empresas e indústrias da região.',
    texto:
      'Contratos de manutenção contínua em três perfis de cliente, cada um com exigências próprias de rotina, horário e conformidade.',
    placeholder: true, // PLACEHOLDER — trocar por logos reais autorizados
    itens: [
      { nome: 'Alto da Serra', setor: 'Condomínio' },
      { nome: 'Jardim das Flores', setor: 'Condomínio' },
      { nome: 'Grupo Mailasqui', setor: 'Indústria' },
      { nome: 'Vale Verde', setor: 'Empresa' },
      { nome: 'Portal do Sol', setor: 'Condomínio' },
      { nome: 'Metalúrgica SR', setor: 'Indústria' },
      { nome: 'Centro Empresarial', setor: 'Empresa' },
      { nome: 'Residencial Aurora', setor: 'Condomínio' },
    ],
  },

  diferenciais: {
    eyebrow: 'Diferenciais',
    titulo: 'O que muda ao contratar a Evolutionis.',
    itens: [
      { icone: 'relogio', titulo: 'Pontualidade', texto: 'Cronograma acordado em contrato e cumprido — com o horário de cada visita registrado no portal.' },
      { icone: 'escudo', titulo: 'Atendimento 24h', texto: 'Urgências de controle de pragas atendidas fora do horário comercial, inclusive fins de semana.' },
      { icone: 'documento', titulo: 'Orçamento gratuito', texto: 'Visita técnica sem custo para dimensionar o serviço pelo que o local realmente precisa.' },
      { icone: 'equipe', titulo: 'Equipe qualificada', texto: 'Profissionais treinados, com equipamento de proteção e procedimento definido.' },
      { icone: 'local', titulo: 'Cobertura regional', texto: 'Base em São Roque, atendendo cidades da região.' },
      { icone: 'folha', titulo: 'Sustentabilidade', texto: 'Produtos e práticas escolhidos para reduzir impacto ambiental sem abrir mão do resultado.' },
    ],
  },

  depoimentos: {
    eyebrow: 'Depoimentos',
    titulo: 'O que dizem quem convive com o serviço.',
    placeholder: true, // PLACEHOLDER — trocar por depoimentos reais coletados
    itens: [
      {
        texto: 'Trocamos três fornecedores por um só. O que mais pesou na assembleia foi conseguir mostrar o histórico de tudo que foi feito no mês, sem depender de relatório manual.',
        nome: 'Marina R.',
        cargo: 'Síndica · Condomínio Alto da Serra',
      },
      {
        texto: 'O jardim da entrada era o nosso ponto fraco com clientes. Depois do projeto e da manutenção contínua, virou a primeira coisa que elogiam quando chegam.',
        nome: 'Carlos A.',
        cargo: 'Gerente administrativo · Centro Empresarial',
      },
      {
        texto: 'Tivemos uma ocorrência de pragas num sábado à noite. A equipe chegou no mesmo dia e resolveu antes da segunda-feira, sem parar a produção.',
        nome: 'Patrícia S.',
        cargo: 'Coordenadora de facilities · Indústria',
      },
    ],
  },

  contato: {
    eyebrow: 'Contato',
    titulo: 'Fale com a operação.',
    texto:
      'Orçamento sem custo. Respondemos em horário comercial — e a qualquer hora em caso de urgência de pragas.',
    whatsapp: '5511917513230',
    whatsappVisivel: '(11) 91751-3230',
    email: 'comercial@evolutionis.com.br',
    endereco: 'Rua Borba Gato, 33',
    bairro: 'Mailasqui · São Roque/SP',
    horario: 'Segunda a sexta, 8h às 18h',
    urgenciaTitulo: 'Urgência de pragas',
    urgenciaTexto:
      'Infestação fora do horário comercial? Atendemos 24h — chame no WhatsApp que acionamos a equipe de plantão.',
    mapaEmbed: '', // PLACEHOLDER — colar a URL de incorporação do Google Maps
  },

  rodape: {
    sobre:
      'Limpeza profissional, paisagismo e controle de pragas para condomínios, empresas e indústrias. Há mais de 20 anos em São Roque/SP.',
    textoDireitos: '© 2026 Evolutionis Serviços Ltda. Todos os direitos reservados.',
    instagram: '', // PLACEHOLDER — URL do perfil
    facebook: '', // PLACEHOLDER — URL do perfil
  },

  seo: {
    titulo: 'Evolutionis Serviços | Limpeza, Paisagismo e Controle de Pragas',
    descricao:
      'Há mais de 20 anos em limpeza profissional, paisagismo e controle de pragas para condomínios, empresas e indústrias em São Roque/SP. Acompanhe cada atendimento em tempo real.',
    cidades: [], // PLACEHOLDER — cidades atendidas, entra nos dados estruturados
  },
};

export default DEFAULTS;
