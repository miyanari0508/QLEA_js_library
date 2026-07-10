document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#pickup');
  if (!root) return;
  if (typeof Swiper === 'undefined') {
    return;
  }

  const DELAY = 5000;

  root.querySelectorAll('.pickup-nav').forEach((btn) => {
    const svg = btn.querySelector('svg');
    if (!svg) return;

    const inner = document.createElement('span');
    inner.className = 'pickup-nav-inner';

    const clone = svg.cloneNode(true);
    svg.classList.add('pickup-arrow');
    clone.classList.add('pickup-arrow', 'pickup-arrow--clone');

    btn.appendChild(inner);
    inner.append(svg, clone);
  });

  function resetBars() {
    this.pagination.bullets.forEach((b) => {
      const bar = b.querySelector('.dot-bar');
      if (bar) bar.style.animation = 'none';
    });
  }

  function runBar() {
    const bullet = this.pagination.bullets[this.realIndex];
    const bar = bullet && bullet.querySelector('.dot-bar');
    if (!bar) return;
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = `dotBarFill ${DELAY}ms linear forwards`;
  }

  const swiper = new Swiper(root.querySelector('.js-pickup'), {
    loop: true,
    slidesPerView: 'auto',
    speed: 600,
    centeredSlides: true,
    autoplay: { delay: DELAY, disableOnInteraction: false },
    navigation: {
      nextEl: root.querySelector('.js-next'),
      prevEl: root.querySelector('.js-prev'),
    },
    pagination: {
      el: root.querySelector('.js-dots'),
      clickable: true,
      bulletElement: 'button',
      bulletClass: 'dot',
      bulletActiveClass: 'is-active',
      renderBullet: (i, cls) => `<button class="${cls}" type="button" aria-label="スライド${i + 1}へ"><span class="dot-bar"></span></button>`,
    },
    on: {
      init: runBar,
      slideChangeTransitionStart: resetBars,
      slideChangeTransitionEnd: runBar,
    },
  });

  const hoverEl = root.querySelector('.pickup-body');
  if (hoverEl) {
    hoverEl.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
      root.querySelectorAll('.dot-bar').forEach((b) => (b.style.animationPlayState = 'paused'));
    });
    hoverEl.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
      root.querySelectorAll('.dot-bar').forEach((b) => (b.style.animationPlayState = 'running'));
    });
  }
});