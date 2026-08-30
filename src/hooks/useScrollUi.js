import { useEffect, useRef, useState } from 'react';

/**
 * Estado do cabeçalho e do botão flutuante.
 *
 * Só guarda valores que mudam ao cruzar um limiar. O progresso da rolagem NÃO
 * entra aqui de propósito: ele muda a cada quadro, e mantê-lo em estado do App
 * re-renderizava a árvore inteira dezenas de vezes por segundo — o que chegava
 * a destruir o observer de revelação antes de ele disparar, deixando seções
 * invisíveis para sempre. Quem precisa do progresso é a barra, que escreve
 * direto no DOM por ref.
 */
export function useScrollUi() {
  const [stuck, setStuck] = useState(false);
  const [showWa, setShowWa] = useState(false);

  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      const top = document.documentElement.scrollTop;
      setStuck(top > 14);
      setShowWa(top > 520);
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

  return { stuck, showWa };
}

/** Barra de progresso: atualiza a largura por ref, sem re-renderizar o App. */
export function useProgressBar() {
  const ref = useRef(null);

  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (ref.current) ref.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    run();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return ref;
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
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [id, threshold]);
  return hidden;
}

/**
 * Revela elementos ao entrarem na tela.
 *
 * `deps` existe para re-varrer quando o conteúdo do CMS chega e novos elementos
 * podem ter surgido. Nunca deixe sem array de dependências: o efeito passaria a
 * rodar a cada render e o observer viveria menos que o tempo até o callback,
 * deixando trechos da página presos em opacidade zero.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );

    document.querySelectorAll('.rv:not(.in)').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 55}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
