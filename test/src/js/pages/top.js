document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.mv_fade-slider .mv_slide');
    const slide1Text = document.querySelector('.mv_slide_01 .mv_text');
    const items = document.querySelectorAll('.guarantee_mrt');
    const fixLink = document.querySelector('.bunjyo_link_wrap');
    const skipBtn = document.getElementById('js-mv-skip');
    const breadCrumbs = document.querySelector('.c-breadcrumbs');
    const mvFadeSlider = document.querySelector('.mv_fade-slider');
    const header = document.querySelector('header');
    const isMobile = window.innerWidth < 768;

    const setMvHeight = () => {
        if (!breadCrumbs || !header || !mvFadeSlider) return;
        const breadCrumbsHeight = breadCrumbs.offsetHeight;
        const headersHeight = header.offsetHeight;
        if (isMobile) {
            mvFadeSlider.style.height = `calc(100dvh - (${breadCrumbsHeight}px + ${headersHeight}px))`;
        }
    };

    setMvHeight();

    if (fixLink) {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const bottomThreshold = 20;

            const isTop = scrollTop < 50;
            const isBottom = windowHeight + scrollTop >= documentHeight - bottomThreshold;

            if (isTop || isBottom) {
                fixLink.classList.add('is-hidden');
            } else {
                fixLink.classList.remove('is-hidden');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    items.forEach(item => {
        const ttl = item.querySelector('.guarantee_mrt_ttl');
        if (!ttl) return;

        ttl.addEventListener('click', () => {
            if (window.innerWidth <= 767) {
                const isOpen = item.classList.contains('is-open');
                const btn = item.querySelector('.guarantee_mrt_btn');

                item.classList.toggle('is-open');

                if (btn) {
                    btn.setAttribute('aria-expanded', !isOpen);
                    btn.setAttribute('aria-label', !isOpen ? '閉じる' : '開く');
                }
            }
        });
    });

    if (!slides.length) return;

    const INTERVAL_TIME = 4000;
    const TEXT_DELAY = 500;
    let currentIndex = 0;
    let timer = null;
    let textTimer = null;
    if (slide1Text) {
        textTimer = setTimeout(() => {
            slide1Text.classList.add('is-animated');
        }, TEXT_DELAY);
    }
    timer = setInterval(() => {
        const currentSlide = slides[currentIndex];
        currentSlide.classList.remove('is-active');
        currentSlide.classList.add('is-passed');

        currentIndex++;

        if (currentIndex >= slides.length) {
            slides[slides.length - 1].classList.add('is-active');
            clearInterval(timer);
            if (skipBtn) skipBtn.classList.add('is-hidden');
            return;
        }

        slides[currentIndex].classList.add('is-active');
    }, INTERVAL_TIME);
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            clearInterval(timer);
            clearTimeout(textTimer);
            if (slide1Text) {
                slide1Text.classList.add('is-animated');
            }
            slides.forEach((slide, index) => {
                if (index === slides.length - 1) {
                    slide.classList.remove('is-passed');
                    slide.classList.add('is-active');
                } else {
                    slide.classList.remove('is-active');
                    slide.classList.add('is-passed');
                }
            });
            skipBtn.classList.add('is-hidden');
        });
    }
});

// CONCEPT MOVIE
document.addEventListener('DOMContentLoaded', () => {
    const MP_PC = 'db5ec474cad8451fac49fbdc6a2173e0'; 
    const MP_SP = '724da54c0018424da382fde834158ac2'; 
    const mq = window.matchMedia('(max-width: 767px)'); 

    const box = document.querySelector('.js-movie');
    if (!box || !window.streaksplayer) return;
    const getMp = () => (mq.matches ? MP_SP : MP_PC);

    const video = document.createElement('video');
    video.id = 'bunjyo_concept_movie';
    video.className = 'bunjyo_movie_player logica-player lgcp-default-skins';
    video.setAttribute('data-media-player-id', getMp());
    box.appendChild(video);
    const player = window.streaksplayer(video.id, { playsinline: true });

    const overlay = player.el().querySelector('.lgcp-cued-thumbnail-overlay-image');
    if (overlay) overlay.insertBefore(box.querySelector('.bunjyo_movie_thumb'), overlay.firstChild);

    const load = () => {
        player.pause();
        player.hasStarted(false);
        player.loadVideo({ mediaPlayerId: getMp() }, (err) => { if (!err) player.poster(''); });
    };

    load();
    mq.addListener(load); 
});

