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