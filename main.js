// Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });

    // Form submission with WhatsApp redirect
    // const contactForm = document.getElementById('contact-form');
    // contactForm.addEventListener('submit', (e) => {
    //   e.preventDefault();

    //   const name = document.getElementById('name').value;
    //   const email = document.getElementById('email').value;
    //   const phone = document.getElementById('phone').value;
    //   const service = document.getElementById('service').value;
    //   const message = document.getElementById('message').value;

    //   const whatsappMessage = `Olá! Gostaria de solicitar um orçamento.%0A%0A*Nome:* ${name}%0A*E-mail:* ${email}%0A*Telefone:* ${phone}%0A*Serviço:* ${service}%0A*Mensagem:* ${message}`;

    //   window.open(`https://wa.me/5511917513230?text=${whatsappMessage}`, '_blank');
    // });

    // Progressive image loading with placeholders
    const progressiveImages = document.querySelectorAll('[data-full-src]');
    progressiveImages.forEach((img) => {
      const fullSrc = img.getAttribute('data-full-src');
      if (!fullSrc) return;

      const placeholderSrc = img.getAttribute('data-placeholder');
      if (placeholderSrc) {
        img.setAttribute('src', placeholderSrc);
      }

      img.setAttribute('aria-busy', 'true');

      const loader = new Image();
      loader.src = fullSrc;
      loader.addEventListener('load', () => {
        img.src = fullSrc;
        img.classList.add('lazy-image-loaded');
        img.removeAttribute('aria-busy');
      });

      loader.addEventListener('error', () => {
        img.classList.add('lazy-image-error');
        img.removeAttribute('aria-busy');
      });
    });
