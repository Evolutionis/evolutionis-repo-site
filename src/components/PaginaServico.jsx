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
 * Página de um serviço. O texto vem de src/data/paginas/<servico>.js; cabeçalho,
 * contato, rodapé e cores vêm do content.json, como na home — assim a página
 * acompanha o que o painel publica sem PR.
 *
 * Title, description, canonical e dados estruturados NÃO são aplicados aqui:
 * o prerender já grava tudo no <head> do HTML desta página. Aplicar de novo no
 * navegador só abriria espaço para os dois divergirem.
 */
export default function PaginaServico({ pagina, inicial }) {
  const { content, assetUrl } = useContent(inicial);
  const { stuck, showWa } = useScrollUi();
  const barraRef = useProgressBar();
  const perto = useHiddenNear('contato');
  useReveal([content]);
  useCoresMarca(content.identidade);

  const d = pagina.dados;
  const logo = assetUrl(content.identidade.logo);
  const logoRodape = assetUrl(content.identidade.logoRodape || content.identidade.logo);

  return (
    <>
      <div id="progress"><i ref={barraRef} /></div>
      <Nav cabecalho={content.cabecalho} logo={logo} ativo={null} stuck={stuck} />

      <main className="pg-servico">
        <section className="pg-hero">
          <div className="shell">
            <nav className="pg-trilha" aria-label="Você está em">
              <a href={href()}>Início</a> <span aria-hidden="true">/</span> <span>{d.hero.eyebrow}</span>
            </nav>
            <span className="eyebrow">{d.hero.eyebrow}</span>
            <h1>{d.hero.titulo}</h1>
            <p className="pg-lead">{d.hero.texto}</p>
            <div className="pg-cta">
              <a href="#contato" className="btn btn-solid">Solicitar orçamento</a>
            </div>
          </div>
        </section>

        <section>
          <div className="shell">
            <div className="sec-head"><h2>{d.incluido.titulo}</h2></div>
            <div className="pg-grid">
              {d.incluido.itens.map((i) => (
                <article key={i.titulo} className="pg-card">
                  <h3>{i.titulo}</h3>
                  <p>{i.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-alt">
          <div className="shell">
            <div className="sec-head"><h2>{d.etapas.titulo}</h2></div>
            <ol className="pg-etapas">
              {d.etapas.itens.map((e) => (
                <li key={e.titulo}>
                  <h3>{e.titulo}</h3>
                  <p>{e.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="shell">
            <div className="sec-head"><h2>{d.publicos.titulo}</h2></div>
            <div className="pg-grid">
              {d.publicos.itens.map((p) => (
                <article key={p.titulo} className="pg-card">
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-alt">
          <div className="shell">
            <div className="sec-head">
              <h2>{d.regioes.titulo}</h2>
              <p>{d.regioes.texto}</p>
            </div>
            <ul className="pg-cidades">
              {d.regioes.cidades.map((c) => <li key={c} className="chip">{c}</li>)}
            </ul>
          </div>
        </section>

        <section>
          <div className="shell">
            <div className="sec-head"><h2>{d.faq.titulo}</h2></div>
            <div className="pg-faq">
              {d.faq.itens.map((f) => (
                <details key={f.pergunta}>
                  <summary>{f.pergunta}</summary>
                  <p>{f.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Contato contato={content.contato} servicoPadrao={d.servicoFormulario} />
      </main>

      <Rodape rodape={content.rodape} contato={content.contato} logo={logoRodape} />
      <WhatsAppFloat contato={content.contato} visivel={showWa && !perto} />
      <AvisoAtualizacao />
    </>
  );
}
