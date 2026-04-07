/**
 * Kinesio Caseros - Micro-interacciones y formulario
 */

/** Debe coincidir con los enlaces wa.me en index.html */
const WHATSAPP_NUMBER = '5491127412326';

// Micro-interacciones: animación al hacer scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.animationDelay = `${index * 0.1}s`;
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Formulario: enviar a WhatsApp
function initForm() {
  const form = document.getElementById('formulario');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.querySelector('[name="nombre"]').value.trim();
    const whatsapp = form.querySelector('[name="whatsapp"]').value.trim();
    const motivo = form.querySelector('[name="motivo"]').value.trim();

    const mensaje = `Hola! Soy *${nombre}*${whatsapp ? `. Mi WhatsApp: ${whatsapp}` : ''}. Me gustaría consultar sobre: ${motivo}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    form.reset();
  });
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initForm();
  initSmoothScroll();
});
