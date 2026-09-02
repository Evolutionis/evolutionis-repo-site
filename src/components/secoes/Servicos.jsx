import { useMemo, useRef } from 'react';
import { useVideoScrub } from '../../hooks/useVideoScrub';

/**
 * A seção em que a rolagem controla o vídeo.
 *
 * A lista de serviços rola normalmente; o painel à direita fica fixo e o quadro
 * exibido é definido pela posição do scroll dentro do serviço em foco.
 */
// Quanto de rolagem (em vh) cada segundo de vídeo recebe. O valor vem do que a
// seção já praticava: 56vh de altura mínima para o trecho de 1,708s do primeiro
// serviço. Mantê-lo faz todos os itens correrem o filme na mesma velocidade.
const VH_POR_SEGUNDO = 33;

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
                // A altura acompanha a duração do trecho de vídeo do item. Sem
                // isso, um serviço com trecho longo (a Limpeza profissional
                // cobre 6,96s dos 10,4s do filme) correria o vídeo várias vezes
                // mais rápido que os demais no mesmo tanto de rolagem.
                style={{ minHeight: `${Math.max(56, (s.b - s.a) * VH_POR_SEGUNDO)}vh` }}
                onClick={(e) =>
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              >
                <span className="k">{s.num} · {s.titulo}</span>
                <h3>{s.titulo}</h3>
                <p>{s.desc}</p>
                {s.especialidades ? (
                  <ul className="svc-esp">
                    {s.especialidades.map((e) => (
                      <li key={e.titulo}>
                        <b>{e.titulo}</b>
                        <span>{e.desc}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="chips">
                    {s.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                  </div>
                )}
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
