
/**
 * スクロール連動アニメーション
 * --------------------------------------------------------------------------
 * 【クラスの追加方法】
 * targetSelector 内に「.クラス名,」の形式でカンマ区切りで追加してください。
 * （新規でアニメーションを制作する場合、class名にanimeの文字を含めてもらえれば自動でjsが適用されます）
 * --------------------------------------------------------------------------
 */
const initScrollAnimation = () => {
  const targetSelector = [
    '[class*="anime"]',
  ].join(',');

  const fadeInTargets = document.querySelectorAll(targetSelector);

  if (fadeInTargets.length === 0) return;
  const options = {
    root: null,
    rootMargin: "-100px 0px",
    threshold: 0
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scrollin');
      } else {
      }
    });
  }, options);

  fadeInTargets.forEach(target => observer.observe(target));
};
initScrollAnimation();

// HTML 4.01 replacement for details/summary.
document.addEventListener("DOMContentLoaded", function () {
  var accordions = document.querySelectorAll(".house_accordion");
  for (var i = 0; i < accordions.length; i++) {
    (function (accordion, index) {
      var button = accordion.querySelector(".accordion_btn");
      var content = accordion.querySelector(".accordion_grid");
      if (!button || !content || button.classList.contains("html4-summary")) return;
      content.id = content.id || "house-accordion-content-" + index;
      button.setAttribute("aria-controls", content.id);
      button.setAttribute("aria-expanded", "false");
      content.setAttribute("aria-hidden", "true");
      button.addEventListener("click", function () {
        var open = accordion.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
        content.setAttribute("aria-hidden", open ? "false" : "true");
      });
    })(accordions[i], i);
  }
});

/**
 * ページ内アンカーへのスムーススクロール。
 * 固定ヘッダーの高さと「動きを減らす」設定を考慮する。
 */
(function () {
  function findAnchorTarget(hash) {
    if (!hash || hash === '#') return document.documentElement;
    var name;
    try {
      name = decodeURIComponent(hash.substring(1));
    } catch (error) {
      return null;
    }
    return document.getElementById(name) || document.getElementsByName(name)[0] || null;
  }

  function headerOffset() {
    var headers = document.querySelectorAll('header, #header, #headerBox');
    var offset = 0;
    for (var i = 0; i < headers.length; i++) {
      var style = window.getComputedStyle(headers[i]);
      var rect = headers[i].getBoundingClientRect();
      var top = parseFloat(style.top) || 0;
      if ((style.position === 'fixed' || style.position === 'sticky') &&
          style.display !== 'none' && style.visibility !== 'hidden' &&
          rect.top <= top + 1 && rect.bottom > 0) {
        offset = Math.max(offset, rect.bottom);
      }
    }
    return offset;
  }

  function scrollToTarget(target, moveFocus) {
    var top = target === document.documentElement || target === document.body
      ? 0
      : target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    var reducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (moveFocus && target !== document.documentElement && target !== document.body) {
      var temporaryTabIndex = !target.hasAttribute('tabindex');
      if (temporaryTabIndex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (temporaryTabIndex) {
        target.addEventListener('blur', function () {
          target.removeAttribute('tabindex');
        }, { once: true });
      }
    }
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey) return;
    var node = event.target.nodeType === 1 ? event.target : event.target.parentElement;
    var link = node && node.closest('a[href]');
    if (!link || link.hasAttribute('download') ||
        (link.target && link.target.toLowerCase() !== '_self')) return;
    var href = link.getAttribute('href');
    if (!href || href.indexOf('#') === -1) return;
    var url;
    try {
      url = new URL(href, document.baseURI);
    } catch (error) {
      return;
    }
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname ||
        url.search !== window.location.search) return;
    var target = findAnchorTarget(url.hash);
    if (!target) return;

    event.preventDefault();
    if (url.hash !== window.location.hash) {
      window.history.pushState(null, '', url.href);
    }
    scrollToTarget(target, true);
  });

  // 別ページからアンカー付きURLで到着した場合もヘッダー位置を補正する。
  window.addEventListener('load', function () {
    if (!window.location.hash) return;
    var target = findAnchorTarget(window.location.hash);
    if (target) scrollToTarget(target, false);
  });
})();
