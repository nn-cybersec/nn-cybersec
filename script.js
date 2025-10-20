// Мобильное меню
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
}

// Плавная прокрутка по якорям
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    siteNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Год в футере
document.getElementById('year')?.append(new Date().getFullYear());

// Переключение дней в программе
document.querySelectorAll('.day-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      // вкладки
      document.querySelectorAll('.day-tab').forEach(t => {
        const active = t === btn;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      // панели
      document.querySelectorAll('.day-panel').forEach(p => {
        const isTarget = p.id === `day-${day}`;
        p.classList.toggle('is-active', isTarget);
        p.toggleAttribute('hidden', !isTarget);
      });
    });
  });

  // Плавная прокрутка с учётом фиксированного хедера
(function(){
    const HEADER_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
  
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
  
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
  
      e.preventDefault();
  
      const rect = target.getBoundingClientRect();
      const offsetTop = window.pageYOffset + rect.top - HEADER_H + 1; // +1px, чтобы заголовок не «лип»
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  
      // закрываем мобильное меню (если открыто)
      document.getElementById('site-nav')?.classList.remove('open');
      document.querySelector('.nav-toggle')?.setAttribute('aria-expanded','false');
    });
  })();

  // Плавное появление блоков при прокрутке
(function(){
    const io = new IntersectionObserver((entries) => {
      for (const e of entries){
        if (e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  
    // Какие элементы анимируем
    const selectors = [
      '.hero', '.hero-inner > *',
      '.section', '.section .container > *',
      '.card', '.card-grid > *',
      '.timeline .slot',
      '.day-tabs', '.day-panel .timeline'
    ];
  
    // Назначаем класс .reveal и наблюдаем
    document.querySelectorAll(selectors.join(',')).forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  })();
  