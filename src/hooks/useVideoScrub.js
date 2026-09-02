import { useCallback, useEffect, useRef, useState } from 'react';

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Faz a rolagem controlar o tempo do vídeo.
 *
 * Cada serviço é dono de um trecho da página e de um segmento do filme. O quanto
 * você avançou no trecho define o quadro exibido — rolar para frente reproduz,
 * rolar para trás rebobina, parar congela.
 *
 * Três detalhes que este arquivo resolve e que quebram silenciosamente se saírem:
 *
 * 1. O arquivo precisa ser codificado com TODO quadro como keyframe. Sem isso a
 *    busca engasga, porque o navegador tem que decodificar desde o keyframe
 *    anterior a cada movimento do scroll.
 * 2. O servidor precisa responder a requisições de intervalo (HTTP Range). Sem
 *    isso `video.seekable` fica vazio, o vídeo trava no primeiro quadro e nenhum
 *    erro é lançado.
 * 3. O iOS recusa buscar num vídeo que nunca recebeu play(). Por isso o unlock
 *    no primeiro gesto do usuário.
 */
export function useVideoScrub(itemsRef, segments) {
  const videoRef = useRef(null);
  const wantRef = useRef(0);
  const tickingRef = useRef(false);
  const unlockedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Nem todo serviço tem cena no filme — um serviço novo entra antes de haver
  // material gravado. A duração total vem do último segmento que existe, e não
  // do último item da lista, que pode não ter nenhum.
  const comVideo = segments.filter(Boolean);
  const total = comVideo.length ? comVideo[comVideo.length - 1].b : 1;

  const applyTime = useCallback(() => {
    const v = videoRef.current;
    if (!v || v.readyState < 1) return;
    // Usar a flag do próprio elemento evita o estado preso que uma flag manual
    // sofre quando o navegador funde dois eventos `seeked` em um só.
    if (v.seeking) return;
    if (Math.abs(v.currentTime - wantRef.current) < 0.015) return;
    try {
      v.currentTime = wantRef.current;
    } catch {
      /* ignora: o vídeo ainda não aceita busca */
    }
  }, []);

  const scrub = useCallback(() => {
    tickingRef.current = false;
    const items = itemsRef.current.filter(Boolean);
    if (!items.length || !segments.length) return;

    const focus = window.innerHeight * 0.52;
    let idx = 0;
    let p = 0;
    let found = false;

    for (let i = 0; i < items.length; i++) {
      const r = items[i].getBoundingClientRect();
      if (r.top <= focus) {
        idx = i;
        p = clamp((focus - r.top) / r.height);
        found = true;
      }
    }
    if (!found) {
      idx = 0;
      p = 0;
    }

    setActiveIndex(idx);

    // Serviço sem cena: o vídeo congela onde estava em vez de saltar para o
    // segmento de outro item. Quem cuida de esconder o painel é o componente.
    const seg = segments[idx];
    if (!seg) return;

    wantRef.current = seg.a + (seg.b - seg.a) * p;
    applyTime();
    setProgress((wantRef.current / total) * 100);
  }, [itemsRef, segments, applyTime, total]);

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(scrub);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    scrub();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrub]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onSeeked = () => applyTime();
    v.addEventListener('seeked', onSeeked);
    v.addEventListener('loadedmetadata', onSeeked);
    v.addEventListener('loadeddata', onSeeked);
    return () => {
      v.removeEventListener('seeked', onSeeked);
      v.removeEventListener('loadedmetadata', onSeeked);
      v.removeEventListener('loadeddata', onSeeked);
    };
  }, [applyTime]);

  useEffect(() => {
    const unlock = () => {
      const v = videoRef.current;
      if (unlockedRef.current || !v) return;
      unlockedRef.current = true;
      const pr = v.play();
      if (pr && pr.then) pr.then(() => v.pause()).catch(() => {});
      else {
        try {
          v.pause();
        } catch {
          /* noop */
        }
      }
    };
    const evs = ['touchstart', 'pointerdown', 'keydown', 'scroll'];
    evs.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true }));
    return () => evs.forEach((e) => window.removeEventListener(e, unlock));
  }, []);

  return { videoRef, activeIndex, progress };
}

export default useVideoScrub;
