import LayoutPagina from './LayoutPagina';

/** Página de um serviço. O texto vem de src/data/paginas/<servico>.js. */
export default function PaginaServico({ pagina, inicial }) {
  const d = pagina.dados;
  return (
    <LayoutPagina
      inicial={inicial}
      trilha={[{ nome: 'Serviços', caminho: 'servicos/' }, { nome: d.hero.eyebrow }]}
      // O serviço pré-selecionado é o título do item no content.json — o mesmo
      // valor que a lista do formulário mostra e que vai para o GA4.
      servicoPadrao={(content) => content.servicos.itens.find((s) => s.chave === d.chave)?.titulo || ''}
    >
      {(_content, trilha) => (
        <>
          <section className="pg-hero">
            <div className="shell">
              {trilha}
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
        </>
      )}
    </LayoutPagina>
  );
}
