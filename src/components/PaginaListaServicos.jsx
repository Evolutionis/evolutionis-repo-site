import LayoutPagina from './LayoutPagina';
import { href, paginaDoServico } from '../paginas';

/**
 * /servicos/ — todos os serviços do site, a partir do content.json
 * (servicos.itens), com link para a página de cada um. Existe para que
 * /servicos/ nunca seja 404 e para reforçar os links internos.
 */
export default function PaginaListaServicos({ pagina, inicial }) {
  const d = pagina.dados;
  return (
    <LayoutPagina inicial={inicial} trilha={[{ nome: 'Serviços' }]}>
      {(content, trilha) => (
        <>
          <section className="pg-hero">
            <div className="shell">
              {trilha}
              <span className="eyebrow">{d.hero.eyebrow}</span>
              <h1>{d.hero.titulo}</h1>
              <p className="pg-lead">{d.hero.texto}</p>
            </div>
          </section>

          <section>
            <div className="shell">
              <div className="pg-grid">
                {content.servicos.itens.map((s) => {
                  const p = paginaDoServico(s.chave);
                  return (
                    <article key={s.chave} className="pg-card">
                      <h2 className="pg-card-titulo">{s.titulo}</h2>
                      <p>{s.desc}</p>
                      {p && (
                        <a href={href(p.caminho)} className="link pg-card-link">
                          Saiba mais sobre {s.titulo.toLowerCase()} →
                        </a>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </LayoutPagina>
  );
}
