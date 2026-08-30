import { useEffect, useState } from 'react';
import { DEFAULTS } from '../data/defaults';

/**
 * Mescla o content.json publicado pelo CMS sobre o conteúdo padrão.
 *
 * A mescla é profunda mas conservadora: um valor só substitui o padrão quando
 * existe de fato e não é string vazia. Isso importa porque o painel salva campos
 * em branco quando o usuário ainda não preencheu — sem essa guarda, publicar
 * pela primeira vez apagaria seções inteiras do site.
 */
function merge(base, over) {
  if (over === null || over === undefined) return base;
  if (Array.isArray(base)) return Array.isArray(over) && over.length ? over : base;
  if (typeof base === 'object' && typeof over === 'object') {
    const out = { ...base };
    for (const k of Object.keys(over)) {
      out[k] = k in base ? merge(base[k], over[k]) : over[k];
    }
    return out;
  }
  if (typeof over === 'string' && over.trim() === '') return base;
  return over;
}

function assetUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}

export function useContent() {
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    let alive = true;
    const base = import.meta.env.BASE_URL || '/';

    // `cache: no-store` é deliberado. O service worker também trata este arquivo
    // como network-first: sem isso, publicar no CMS não apareceria para quem já
    // visitou o site, porque o cache serviria a versão antiga por dias.
    fetch(`${base}content.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && data) setContent(merge(DEFAULTS, data));
      })
      .catch(() => {
        /* offline ou arquivo ausente: o padrão já está na tela */
      });

    return () => {
      alive = false;
    };
  }, []);

  return { content, assetUrl };
}

export default useContent;
