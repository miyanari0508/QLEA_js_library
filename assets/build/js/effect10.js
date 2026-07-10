(function () {
  'use strict';

  const AUTOPLAY = true;   // 自動再生を無効にする場合は false に変更
  const INTERVAL = 3500;   // 自動再生時のスライド切り替え間隔（ms）

  const slider = document.getElementById('slider');
  const track  = document.getElementById('track');
  const btn    = document.getElementById('cursorBtn');
  if (!slider || !track) return;

  // 無限ループを作成：[クローン] + [オリジナル] + [クローン]（3セット）、中央のセットから開始 
  const originals = [...track.querySelectorAll('.slide')];
  const N = originals.length;
  const pre  = document.createDocumentFragment();
  const post = document.createDocumentFragment();
  originals.forEach(s => pre.appendChild(s.cloneNode(true)));
  originals.forEach(s => post.appendChild(s.cloneNode(true)));
  track.insertBefore(pre, track.firstChild);
  track.appendChild(post);

  const slides = [...track.querySelectorAll('.slide')]; 
  let active = N;       
  let animating = false;
  let SM = 0, LG = 0, GAP = 0;

  function applyActive() {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === active));
  }

  function measure() {
    const activeEl = slides[active];
    const otherEl  = slides[active === 0 ? 1 : 0];
    LG  = activeEl.getBoundingClientRect().width;
    SM  = otherEl.getBoundingClientRect().width;
    GAP = parseFloat(getComputedStyle(track).columnGap) || 0;
  }

  function position() {
    const x = slider.clientWidth / 2 - (active * (SM + GAP) + LG / 2);
    track.style.transform = `translateX(${x}px)`;
  }

  function snap() {
    track.classList.add('no-anim');
    applyActive();
    position();
    void track.offsetWidth;         
    track.classList.remove('no-anim');
  }

  function go(dir) {
    if (animating) return;
    animating = true;
    active += dir;
    applyActive();
    position();
  }
  const next = () => go(1);
  const prev = () => go(-1);

  track.addEventListener('transitionend', e => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    animating = false;
    if (active >= 2 * N) { active -= N; snap(); }
    else if (active < N) { active += N; snap(); }
  });

  // ボタンをマウスに追従（即時）＋左右位置に応じて向きを変更
  slider.addEventListener('mousemove', e => {
    const r = slider.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
  
    btn.style.translate = `calc(${x}px - 50%) calc(${y}px - 50%)`;
    btn.textContent = (x > r.width / 2) ? 'Next' : 'Prev';
  });
  slider.addEventListener('mouseenter', () => { btn.classList.add('show'); stop(); });
  slider.addEventListener('mouseleave', () => { btn.classList.remove('show'); play(); });
  slider.addEventListener('click', e => {
    const r = slider.getBoundingClientRect();
    (e.clientX - r.left) > r.width / 2 ? next() : prev();
  });

  // キーボード
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  // 固定ボタン（タブレット／モバイル）
  const navPrev = document.getElementById('navPrev');
  const navNext = document.getElementById('navNext');
  navPrev && navPrev.addEventListener('click', e => { e.stopPropagation(); prev(); });
  navNext && navNext.addEventListener('click', e => { e.stopPropagation(); next(); });

  // 自動再生（ホバー時に停止、マウスが離れたら再開）
  let timer = null;
  function play() { stop(); if (AUTOPLAY) timer = setInterval(next, INTERVAL); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  function init() {
    applyActive();
    measure();
    snap();
    play();
  }

  window.addEventListener('resize', () => { measure(); snap(); });
  window.addEventListener('load', () => { measure(); snap(); }); 

  init();
})();