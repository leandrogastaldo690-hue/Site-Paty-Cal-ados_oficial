document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header muda ao rolar ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Revelar seções ao rolar ---------- */
  const revealTargets = document.querySelectorAll(
    '.about-copy, .about-index, .section-head, .product-card, .perks-copy, .perk, .insta-inner, .contact-inner'
  );
  revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    io.observe(el);
  });

  /* ---------- Formulário de contato ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const whats = form.whats.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !whats || !mensagem) {
        formNote.textContent = 'Preencha todos os campos antes de enviar.';
        return;
      }

      // Envia a mensagem pronta direto para o WhatsApp da loja.
      const numeroLoja = '5500000000000'; // TODO: trocar pelo número real da Paty Calçados
      const texto = `Olá! Meu nome é ${nome}.%0AWhatsApp: ${whats}%0A%0A${encodeURIComponent(mensagem)}`;
      const link = `https://wa.me/${numeroLoja}?text=${texto}`;

      formNote.textContent = 'Abrindo o WhatsApp para você enviar sua mensagem...';
      window.open(link, '_blank', 'noopener');
      form.reset();
    });
  }

});
