import { useEffect, useState } from 'react';

/** Progresso total da página (0-100) + estado do cabeçalho e do botão flutuante. */
export function useScrollUi() {
  const [progress, setProgress] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [showWa, setShowWa] = useState(false);

  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
      setStuck(el.scrollTop > 14);
      setShowWa(el.scrollTop > 520);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    run();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { progress, stuck, showWa };
}

/** Qual seção está em foco, para a trilha lateral e o menu. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0, rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/** Esconde um elemento enquanto a seção indicada estiver visível. */
export function useHiddenNear(id, threshold = 0.16) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setHidden(e.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, threshold]);
  return hidden;
}

/** Revela um elemento quando ele entra na tela (uma vez só). */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv:not(.in)');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  });
}
