import { Icone } from '../Icones';

export default function Acompanhamento({ acompanhamento }) {
  return (
    <section id="acompanhe">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{acompanhamento.eyebrow}</span>
          <h2>{acompanhamento.titulo}</h2>
          <p>{acompanhamento.texto}</p>
        </div>

        <div className="fc-grid">
          <div className="fc-list rv">
            {acompanhamento.itens.map((it) => (
              <div className="fc-item" key={it.titulo}>
                <span className="tick"><Icone nome="check" size={13} strokeWidth={3} /></span>
                <div>
                  <h4>{it.titulo}</h4>
                  <p>{it.texto}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="portal rv" role="img" aria-label="Exemplo do portal do cliente com ordens de serviço">
            <div className="portal-bar">
              <i /><i /><i />
              <span className="u">portal do cliente · Evolutionis</span>
            </div>
            <h5>Ordens de serviço · hoje <em>ao vivo</em></h5>
            {acompanhamento.ordens.map((o) => (
              <div className="os" key={o.titulo}>
                <span className={`st ${o.estado}`} />
                <span className="tx"><b>{o.titulo}</b><span>{o.detalhe}</span></span>
                <span className="hr">{o.hora}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
