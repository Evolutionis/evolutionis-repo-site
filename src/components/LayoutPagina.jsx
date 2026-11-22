import { useContent } from '../hooks/useContent';
import { useScrollUi, useProgressBar, useHiddenNear, useReveal } from '../hooks/useScrollUi';
import { useCoresMarca } from '../hooks/useCoresMarca';
import { href } from '../paginas';

import Nav from './secoes/Nav';
import Contato from './secoes/Contato';
import Rodape from './secoes/Rodape';
import WhatsAppFloat from './secoes/WhatsAppFloat';
import AvisoAtualizacao from './AvisoAtualizacao';
import '../styles/pagina-servico.css';

/**
 * Moldura das páginas internas (lista de serviços e cada serviço): cabeçalho,
 * trilha, formulário de contato, rodapé e botão do WhatsApp — tudo do
 * content.json, como na home. O miolo vem por `children(content, trilha)`.
 *
 * Title, description, canonical e dados estruturados NÃO são aplicados aqui:
 * o prerender grava tudo no <head> de cada página. Aplicar de novo no
 * navegador só abriria espaço para os dois divergirem.
 */
export default function LayoutPagina({ inicial, trilha, servicoPadrao, children }) {
  const { content, assetUrl } = useContent(inicial);
  const { stuck, showWa } = useScrollUi();
  const barraRef = useProgressBar();
  const perto = useHiddenNear('contato');
  useReveal([content]);
  useCoresMarca(content.identidade);

  const logo = assetUrl(content.identidade.logo);
  const logoRodape = assetUrl(content.identidade.logoRodape || content.identidade.logo);
  const padrao = typeof servicoPadrao === 'function' ? servicoPadrao(content) : servicoPadrao;

  // A trilha vai para dentro do topo de cada página (quem decide o lugar é a
  // página), por isso sai daqui pronta como elemento.
  const trilhaEl = (
    <nav className="pg-trilha" aria-label="Você está em">
      <a href={href()}>Início</a>
      {trilha.map((t, i) => (
        <span key={t.nome}>
          {' '}<span aria-hidden="true">/</span>{' '}
          {i < trilha.length - 1 ? <a href={href(t.caminho)}>{t.nome}</a> : <span>{t.nome}</span>}
        </span>
      ))}
    </nav>
  );

  return (
    <>
      <div id="progress"><i ref={barraRef} /></div>
      <Nav cabecalho={content.cabecalho} logo={logo} ativo={null} stuck={stuck} />

      <main className="pg-servico">
        {children(content, trilhaEl)}

        <Contato contato={content.contato} servicos={content.servicos} servicoPadrao={padrao} />
      </main>

      <Rodape rodape={content.rodape} contato={content.contato} logo={logoRodape} servicos={content.servicos} />
      <WhatsAppFloat contato={content.contato} visivel={showWa && !perto} />
      <AvisoAtualizacao />
    </>
  );
}
