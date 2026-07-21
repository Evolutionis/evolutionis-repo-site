async function applyCMSContent() {
  try {
    const res = await fetch('content.json?t=' + Date.now(), {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!res.ok) return;
    const data = await res.json();

    // Identidade Visual
    if (data.identidade) {
      if (data.identidade.corPrimaria) {
        document.documentElement.style.setProperty('--color-primary', data.identidade.corPrimaria);
        document.documentElement.style.setProperty('--color-primary-dark', data.identidade.corPrimaria); // Simplified for now
      }
      if (data.identidade.corSecundaria) {
        document.documentElement.style.setProperty('--color-secondary', data.identidade.corSecundaria);
      }
      if (data.identidade.corFundo) {
        document.body.style.backgroundColor = data.identidade.corFundo;
        const heroSection = document.getElementById('inicio');
        if (heroSection) heroSection.style.background = data.identidade.corFundo;
      }
      if (data.identidade.corTexto) {
        document.body.style.color = data.identidade.corTexto;
      }
      if (data.identidade.logo) {
        const logoContainer = document.querySelector('header a.flex.items-center div.h-10');
        if (logoContainer) {
          const logoSrc = data.identidade.logo.startsWith('/') ? data.identidade.logo.substring(1) : data.identidade.logo;
          logoContainer.innerHTML = `<img src="${logoSrc}" alt="Logo" class="h-full object-contain" />`;
        }
      }
    }

    // Cabeçalho & Menu
    if (data.cabecalho) {
      const desktopLinks = document.querySelectorAll('header nav.hidden.md\\:flex a:not(.bg-primary-600)');
      const mobileLinks = document.querySelectorAll('nav#mobile-menu a:not(.bg-primary-600)');
      const menuKeys = ['menu1', 'menu2', 'menu3', 'menu4', 'menu5'];
      
      desktopLinks.forEach((link, i) => {
        if (data.cabecalho[menuKeys[i]]) link.textContent = data.cabecalho[menuKeys[i]];
      });
      mobileLinks.forEach((link, i) => {
        if (data.cabecalho[menuKeys[i]]) link.textContent = data.cabecalho[menuKeys[i]];
      });

      const desktopBtn = document.querySelector('header nav.hidden.md\\:flex a.bg-primary-600');
      const mobileBtn = document.querySelector('nav#mobile-menu a.bg-primary-600');
      if (data.cabecalho.textoBotao) {
        if (desktopBtn) desktopBtn.textContent = data.cabecalho.textoBotao;
        if (mobileBtn) mobileBtn.textContent = data.cabecalho.textoBotao;
      }
    }

    // Hero
    if (data.hero) {
      const heroSection = document.getElementById('inicio');
      if (heroSection) {
        const badge = heroSection.querySelector('span.inline-block');
        if (badge && data.hero.badge) badge.textContent = data.hero.badge;

        const h1 = heroSection.querySelector('h1');
        if (h1 && data.hero.titulo) h1.innerHTML = data.hero.titulo;

        const p = heroSection.querySelector('p');
        if (p && data.hero.subtitulo) p.textContent = data.hero.subtitulo;

        const links = heroSection.querySelectorAll('div.flex a');
        if (links[0] && data.hero.textoBotao1) {
          // Keep the svg inside the first button
          const svg = links[0].querySelector('svg');
          links[0].innerHTML = '';
          if (svg) links[0].appendChild(svg);
          links[0].appendChild(document.createTextNode(' ' + data.hero.textoBotao1));
        }
        if (links[1] && data.hero.textoBotao2) links[1].textContent = data.hero.textoBotao2;

        if (data.hero.imagemPrincipal) {
          const img = heroSection.querySelector('img.lazy-image');
          if (img) {
            const imgSrc = data.hero.imagemPrincipal.startsWith('/') ? data.hero.imagemPrincipal.substring(1) : data.hero.imagemPrincipal;
            img.src = imgSrc;
            img.setAttribute('data-full-src', imgSrc);
          }
        }
      }
    }

    // Rodapé
    if (data.rodape) {
      const copy = document.querySelector('footer p.text-gray-400.text-sm');
      if (copy && data.rodape.textoDireitos) copy.textContent = data.rodape.textoDireitos;
    }

  } catch (e) {
    console.error('Erro ao carregar conteúdo do CMS:', e);
  }
}

document.addEventListener('DOMContentLoaded', applyCMSContent);
