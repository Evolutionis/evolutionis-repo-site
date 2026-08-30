import { Icone } from '../Icones';

export default function Hero({ hero }) {
  const [antes, depois] = hero.tituloDestaque && hero.titulo.includes(hero.tituloDestaque)
    ? hero.titulo.split(hero.tituloDestaque)
    : [hero.titulo, null];

  // `chave` vem do CMS (pilar.alvo). Interpolada crua, uma aspa no valor fecha
  // o seletor mais cedo e o resto vira sintaxe — o querySelector passa a mirar
  // outro elemento, ou lança e derruba o clique. CSS.escape trata o valor como
  // texto, que é o que ele é.
  const irPara = (chave) => (e) => {
    e.preventDefault();
    document.querySelector(`.svc-item[data-svc="${CSS.escape(chave)}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="inicio">
      <div className="shell">
        <div className="hero-grid">
          <div>
            <span className="eyebrow rv">{hero.badge}</span>
            <h1 className="rv">
              {antes}
              {depois !== null && <><em>{hero.tituloDestaque}</em>{depois}</>}
            </h1>
            <p className="lede rv">{hero.subtitulo}</p>
            <div className="hero-cta rv">
              <a href="#contato" className="btn btn-solid">{hero.textoBotao1}</a>
              <a href="#servicos" className="btn btn-line">{hero.textoBotao2}</a>
            </div>
            <p className="hero-note rv"><span className="dot-live" /> {hero.aviso}</p>
          </div>

          <div className="pillars rv">
            {hero.pilares.map((p) => (
              <a className="pillar" key={p.alvo} href="#servicos" onClick={irPara(p.alvo)}>
                <span className="ic"><Icone nome={p.icone} /></span>
                <span>
                  <h3>{p.titulo}</h3>
                  <p>{p.desc}</p>
                </span>
                <span className="go" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="stats rv">
          {hero.estatisticas.map((s) => (
            <div className="stat" key={s.rotulo}>
              <b>{s.valor}</b>
              <span>{s.rotulo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
