/**
 * SEO aplicado em tempo de execução.
 *
 * O site é uma SPA servida por um index.html estático, então título, descrição,
 * Open Graph e dados estruturados precisam refletir o conteúdo que veio do CMS.
 * O index.html já traz valores iniciais para o caso de o JS não rodar — aqui só
 * atualizamos quando o content.json chega com algo diferente.
 */

function meta(seletor, attr, valor) {
  if (!valor) return;
  let el = document.head.querySelector(seletor);
  if (!el) {
    el = document.createElement('meta');
    const [k, v] = seletor.replace(/[[\]"']/g, '').split('=');
    el.setAttribute(k.replace('meta', '').trim() || 'name', v);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, valor);
}

export function aplicarSeo(content, assetUrl) {
  const { seo, contato, identidade } = content;
  const url = window.location.origin + window.location.pathname;
  const imagem = url.replace(/\/$/, '') + assetUrl(identidade.logo).replace(/^.*?(\/[^/]+)$/, '$1');

  document.title = seo.titulo;
  document.documentElement.lang = 'pt-BR';

  meta('meta[name="description"]', 'content', seo.descricao);
  meta('meta[property="og:title"]', 'content', seo.titulo);
  meta('meta[property="og:description"]', 'content', seo.descricao);
  meta('meta[property="og:type"]', 'content', 'website');
  meta('meta[property="og:url"]', 'content', url);
  meta('meta[property="og:image"]', 'content', imagem);
  meta('meta[property="og:locale"]', 'content', 'pt_BR');
  meta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  meta('meta[name="theme-color"]', 'content', identidade.corPrimaria);

  // Dados estruturados de empresa local: é o que faz o Google entender endereço,
  // telefone e horário, em vez de tratar tudo como texto solto.
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Evolutionis Serviços Ltda.',
    description: seo.descricao,
    url,
    image: imagem,
    telephone: `+${contato.whatsapp}`,
    email: contato.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contato.endereco,
      addressLocality: 'São Roque',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    makesOffer: content.servicos.itens.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.titulo, description: s.desc },
    })),
  };

  if (seo.cidades && seo.cidades.length) {
    dados.areaServed = seo.cidades.map((c) => ({ '@type': 'City', name: c }));
  }

  let script = document.getElementById('ld-json');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ld-json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(dados);
}

export default aplicarSeo;
