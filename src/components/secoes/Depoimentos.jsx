const iniciais = (n) => n.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();

export default function Depoimentos({ depoimentos }) {
  return (
    <section id="depoimentos">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{depoimentos.eyebrow}</span>
          <h2>{depoimentos.titulo}</h2>
          {depoimentos.placeholder && (
            <span className="ph-flag">◆ conteúdo de exemplo — substituir por depoimentos reais</span>
          )}
        </div>
        <div className="dep-grid rv">
          {depoimentos.itens.map((d) => (
            <figure className="dep" key={d.nome}>
              <span className="q" aria-hidden="true">&ldquo;</span>
              <blockquote><p>{d.texto}</p></blockquote>
              <figcaption className="who">
                <span className="av" aria-hidden="true">{iniciais(d.nome)}</span>
                <span><b>{d.nome}</b><span>{d.cargo}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
