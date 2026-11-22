import { useEffect } from 'react';
import { isValidHexColor } from '../lib/sanitize';

// As duas cores da marca vêm do CMS e entram como variáveis CSS, para o
// painel poder ajustar a identidade sem novo deploy do código.
//
// Só entra hexadecimal de 6 dígitos: o valor vai para o CSSOM, e um texto
// como "red; } body { display:none" seria interpretado como regra, não como
// cor. Valor recusado significa manter o padrão já definido em tokens.css —
// a marca fica correta em vez de sumir.
//
// Era um useEffect dentro do App; virou hook porque as páginas de serviço
// precisam da mesma regra.
export function useCoresMarca(identidade) {
  useEffect(() => {
    const r = document.documentElement;
    const { corPrimaria, corSecundaria } = identidade;
    if (isValidHexColor(corPrimaria)) {
      r.style.setProperty('--brand', corPrimaria);
      r.style.setProperty('--accent', corPrimaria);
    }
    if (isValidHexColor(corSecundaria)) r.style.setProperty('--tint', corSecundaria);
  }, [identidade]);
}
