import { useMemo, useRef } from 'react';
import { useVideoScrub } from '../../hooks/useVideoScrub';

/**
 * A seção em que a rolagem controla o vídeo.
 *
 * A lista de serviços rola normalmente; o painel à direita fica fixo e o quadro
 * exibido é definido pela posição do scroll dentro do serviço em foco.
 */
export default function Servicos({ servicos, assetUrl }) {
  const itensRef = useRef([]);
  const segmentos = useMemo(
    () => servicos.itens.map((s) => ({ a: s.a, b: s.b })),
    [servicos.itens]
  );

  const { videoRef, activeIndex, progress } = useVideoScrub(itensRef, segmentos);
  const atual = servicos.itens[activeIndex] || servicos.itens[0];
  const total = String(servicos.itens.length).padStart(2, '0');

  return (
    <section id="servicos">
      <div className="shell">
        <div className="sec-head rv">
          <span className="eyebrow">{servicos.eyebrow}</span>
          <h2>{servicos.titulo}</h2>
          <p>{servicos.texto}</p>
        </div>

        <div className="svc-layout">
          <div className="svc-list">
            {servicos.itens.map((s, i) => (
              <article
                key={s.chave}
                ref={(el) => (itensRef.current[i] = el)}
                className={`svc-item${i === activeIndex ? ' on' : ''}`}
                data-svc={s.chave}
                onClick={(e) =>
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              >
                <span className="k">{s.num} · {s.titulo}</span>
                <h3>{s.titulo}</h3>
                <p>{s.desc}</p>
                <div className="chips">
                  {s.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <a href="#contato" className="link" onClick={(e) => e.stopPropagation()}>
                  Solicitar orçamento →
                </a>
              </article>
            ))}
          </div>

          <div className="stage">
            <div className="stage-top">
              <span className="lab">{atual.rotulo}</span>
              <span className="stage-count"><b>{atual.num}</b> / {total}</span>
            </div>

            <video
              ref={videoRef}
              playsInline
              muted
              preload="auto"
              poster={assetUrl('/poster.jpg')}
              aria-label="Equipes da Evolutionis executando os serviços"
            >
              <source src={assetUrl('/servicos.webm')} type="video/webm" />
              <source src={assetUrl('/servicos.mp4')} type="video/mp4" />
            </video>

            <div className="stage-scrub"><i style={{ width: `${progress}%` }} /></div>
            <div className="stage-foot">
              <b>{atual.titulo}</b>
              <span>{atual.legenda}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
