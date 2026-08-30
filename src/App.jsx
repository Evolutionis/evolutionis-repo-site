import { useEffect, useMemo } from 'react';
import { useContent } from './hooks/useContent';
import { useScrollUi, useProgressBar, useActiveSection, useHiddenNear, useReveal } from './hooks/useScrollUi';
import { aplicarSeo } from './seo';

import Nav from './components/secoes/Nav';
import ScrollRail from './components/secoes/ScrollRail';
import Hero from './components/secoes/Hero';
import Operacao from './components/secoes/Operacao';
import Servicos from './components/secoes/Servicos';
import Acompanhamento from './components/secoes/Acompanhamento';
import Clientes from './components/secoes/Clientes';
import Diferenciais from './components/secoes/Diferenciais';
import Depoimentos from './components/secoes/Depoimentos';
import Contato from './components/secoes/Contato';
import Rodape from './components/secoes/Rodape';
import WhatsAppFloat from './components/secoes/WhatsAppFloat';
import AvisoAtualizacao from './components/AvisoAtualizacao';

const IDS = ['inicio', 'operacao', 'servicos', 'acompanhe', 'clientes', 'diferenciais', 'depoimentos', 'contato'];

export default function App() {
  const { content, assetUrl } = useContent();
  const { stuck, showWa } = useScrollUi();
  const barraRef = useProgressBar();
  const ids = useMemo(() => IDS, []);
  const ativo = useActiveSection(ids);

  // O botão flutuante cobria o botão de enviar do formulário; some perto do contato.
  const perto = useHiddenNear('contato');
  // re-varre quando o conteúdo do CMS chega; nunca a cada render
  useReveal([content]);

  // As duas cores da marca vêm do CMS e entram como variáveis CSS, para o
  // painel poder ajustar a identidade sem novo deploy do código.
  useEffect(() => {
    const r = document.documentElement;
    const { corPrimaria, corSecundaria } = content.identidade;
    if (corPrimaria) {
      r.style.setProperty('--brand', corPrimaria);
      r.style.setProperty('--accent', corPrimaria);
    }
    if (corSecundaria) r.style.setProperty('--tint', corSecundaria);
  }, [content.identidade]);

  useEffect(() => {
    aplicarSeo(content, assetUrl);
  }, [content, assetUrl]);

  const logo = assetUrl(content.identidade.logo);

  return (
    <>
      <div id="progress"><i ref={barraRef} /></div>

      <Nav cabecalho={content.cabecalho} logo={logo} ativo={ativo} stuck={stuck} />
      <ScrollRail ativo={ativo} />

      <main>
        <Hero hero={content.hero} />
        <Operacao operacao={content.operacao} />
        <Servicos servicos={content.servicos} assetUrl={assetUrl} />
        <Acompanhamento acompanhamento={content.acompanhamento} />
        <Clientes clientes={content.clientes} />
        <Diferenciais diferenciais={content.diferenciais} />
        <Depoimentos depoimentos={content.depoimentos} />
        <Contato contato={content.contato} />
      </main>

      <Rodape rodape={content.rodape} contato={content.contato} logo={logo} />
      <WhatsAppFloat contato={content.contato} visivel={showWa && !perto} />
      <AvisoAtualizacao />
    </>
  );
}
