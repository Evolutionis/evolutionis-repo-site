import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Avisa quando um deploy novo chegou.
 *
 * Sem isso o visitante fica preso na versão em cache até fechar todas as abas —
 * e você publicaria no CMS sem entender por que a mudança não aparece para ele.
 */
export default function AvisoAtualizacao() {
  const {
    needRefresh: [precisa, setPrecisa],
    updateServiceWorker,
  } = useRegisterSW({ onRegisterError: () => {} });

  if (!precisa) return null;

  return (
    <div id="pwa-atualizar" role="status">
      <span>Uma versão nova do site está disponível.</span>
      <button onClick={() => updateServiceWorker(true)}>Atualizar</button>
      <button className="fechar" onClick={() => setPrecisa(false)} aria-label="Dispensar">✕</button>
    </div>
  );
}
