export default function Operacao({ operacao }) {
  return (
    <section id="operacao">
      <div className="shell">
        <div className="op-grid">
          <div className="sec-head rv" style={{ marginBottom: 0 }}>
            <span className="eyebrow">{operacao.eyebrow}</span>
            <h2>{operacao.titulo}</h2>
            <p>{operacao.texto}</p>
          </div>
          <div className="op-points rv">
            {operacao.pontos.map((p, i) => (
              <div className="op-point" key={p.titulo}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{p.titulo}</h4>
                  <p>{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
