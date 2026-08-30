import { Icone } from '../Icones';

export default function Diferenciais({ diferenciais }) {
  return (
    <section id="diferenciais">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{diferenciais.eyebrow}</span>
          <h2>{diferenciais.titulo}</h2>
        </div>
        <div className="dif-grid rv">
          {diferenciais.itens.map((d) => (
            <div className="dif" key={d.titulo}>
              <span className="ic"><Icone nome={d.icone} size={19} /></span>
              <h4>{d.titulo}</h4>
              <p>{d.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
