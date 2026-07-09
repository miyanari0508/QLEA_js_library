(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);

  // スムーススクロール本体（Lenis）
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });
  window.lenisInit = { lenis };

  // Lenis と ScrollTrigger を同期
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // SP 判定のブレークポイント
  let isSp = window.innerWidth <= 767;

  /* =========================================================
   * 背景切り替え ＋ タイトル（スクロール連動）
   * ======================================================= */
  function initScroll() {
    let vh = window.innerHeight;
    const sections = document.querySelectorAll('[data-name="content-home"]');
    const titles = document.querySelectorAll('[data-name="ttls-contents"] h3');
    const pics = document.querySelectorAll('[data-name="bg-fullpicture"]');
    const wrapKvBgs = document.querySelector('[data-name="wrap-kv-bgs"]');
    const kvVideo = isSp
      ? document.querySelector('[data-name="kv-video-sp"]')
      : document.querySelector('[data-name="kv-video-pc"]');

    const playVideo = () =>
      kvVideo && kvVideo.paused && kvVideo.play().catch(() => {});
    const pauseVideo = () => kvVideo && !kvVideo.paused && kvVideo.pause();

    // resize 時に kill() するため triggers に集約
    const triggers = [];

    sections.forEach((section, i) => {
      const isLast = i === sections.length - 1;
      const isFirst = i === 0;
      const title = titles[i];
      const cur = pics[i]; // 現在の背景 
      const next = pics[i + 1]; // 次の背景 
      if (title) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "clamp(top-=" + vh + " bottom)",
            end: "clamp(top+=150 top)",
            scrub: true,
          },
        });

        // 最初のセクションは開始・終了位置を変える
        if (isFirst) {
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "clamp(top-=" + 0.8 * vh + " center)",
              end: "clamp(top+=" + 0.35 * vh + " center)",
              scrub: true,
            },
          });
        }
        triggers.push(tl.scrollTrigger);

        const hasPic = cur && cur.querySelector("img");
        const fadeDur = hasPic ? (isFirst ? 4 : 3.5) : 4;
        const outDelay = isFirst ? 2 : 3;

        // ぼかしフェードで表示→消去、縦スライド付き
        tl.fromTo(
          title,
          { opacity: 0, filter: "blur(14px)" },
          { opacity: 1, filter: "blur(0px)", duration: fadeDur }
        )
          .to(title, {
            opacity: 0,
            filter: "blur(14px)",
            duration: fadeDur,
            delay: outDelay,
          })
          .fromTo(title, { yPercent: 50 }, { yPercent: -150, duration: 10 }, "0");

        // 背景画像のパララックス
        if (hasPic) {
          tl.fromTo(
            cur.querySelector("img"),
            { scale: 1.1, yPercent: 5 },
            { scale: 1.1, yPercent: -7, duration: 10 },
            "0"
          );
        }
      }

      if (isFirst && cur && next) {
        // 最初の背景：マスクを広げて消す（動画の再生／停止もここ）
        const st1 = gsap.to(cur, {
          maskSize: "300% 200%",
          maskPosition: "0% 85%",
          webkitMaskSize: "300% 200%",
          webkitMaskPosition: "0% 85%",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "clamp(top-=" + vh + " bottom)",
            end: "clamp(top-=50 center)",
            scrub: isSp ? 3 : 2,
            onEnterBack: playVideo,
            onLeave: pauseVideo,
          },
        }).scrollTrigger;
        // 次の背景：clip-path で表示
        const st2 = gsap.to(next, {
          clipPath: "inset(0% 0% 0 0)",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        }).scrollTrigger;
        triggers.push(st1, st2);
      } else if (next) {
        // 中間：次の背景を clip-path で表示
        const st = gsap.to(next, {
          clipPath: "inset(0% 0% 0 0)",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        }).scrollTrigger;
        triggers.push(st);
      } else if (!isLast) {
        // 次がない：背景スタックをワイプして動画を見せる
        const st = gsap.to(wrapKvBgs, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            onEnter: playVideo,
            onLeaveBack: pauseVideo,
          },
        }).scrollTrigger;
        triggers.push(st);
      }
    });

    // FV の UI（ロゴ・スクロール案内）をフェードアウト
    const fvLogo = document.querySelector('[data-name="fv-contents-logos"]');
    const fvNewsWrap = document.querySelector('[data-name="fv-news-wrap"]');
    const scrollCue = document.querySelector(".scroll-cue");
    const fvTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "clamp(" + vh + " 90%)",
          end: "clamp(" + vh + " 50%)",
          scrub: true,
        },
      })
      .to(fvNewsWrap, { autoAlpha: 0, y: -30, duration: 0.5 })
      .to(scrollCue, { autoAlpha: 0, duration: 0.5 }, "<")
      .to(fvLogo, { autoAlpha: 0, filter: "blur(20px)", y: -30, duration: 0.5 }, "<+0.1");
    triggers.push(fvTl.scrollTrigger);

    return triggers;
  }

  /* =========================================================
   * inner-content-home の拡大・縮小
   * ======================================================= */
  function initInnerContents() {
    const inners = document.querySelectorAll('[data-name="inner-content-home"]');

    inners.forEach((inner) => {
      const section = inner.closest('[data-name="content-home"]') || inner;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 0〜0.45 で拡大、0.7〜1 で少し縮小
      tl.fromTo(
        inner,
        { scale: 0.82, y: 80 },
        { scale: 1, y: 0, duration: 0.45, ease: "power1.out" },
        0
      ).to(inner, { scale: 0.88, y: -60, duration: 0.3, ease: "power1.in" }, 0.7);
    });
  }

  // resize 再構築用の状態
  let currentTriggers = [];
  let resizeTimer = null;
  let lastWidth = window.innerWidth;

  function rebuildOnResize() {
    const newWidth = window.innerWidth;
    // 横幅が変わらない（縦だけ変化）なら refresh のみ
    if (newWidth === lastWidth) {
      ScrollTrigger.refresh();
      return;
    }
    lastWidth = newWidth;
    isSp = window.innerWidth <= 767;
    currentTriggers.forEach((st) => st && st.kill());
    currentTriggers = initScroll();
    ScrollTrigger.refresh();
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuildOnResize, 200);
  });

  // KV 動画を準備でき次第再生（旧ローディングが担っていた処理）
  function playKvVideo() {
    const kvVideo = isSp
      ? document.querySelector('[data-name="kv-video-sp"]')
      : document.querySelector('[data-name="kv-video-pc"]');
    if (!kvVideo) return;
    const play = () => kvVideo.paused && kvVideo.play().catch(() => {});
    if (kvVideo.readyState >= 3) play();
    else kvVideo.addEventListener("canplay", play, { once: true });
  }

  // 起動処理
  function boot() {
    // 先頭へスクロール（旧ローディングが担っていた処理）
    setTimeout(() => lenis.scrollTo(0, { immediate: true }), 500);

    playKvVideo();

    currentTriggers = initScroll();
    initInnerContents();
    ScrollTrigger.refresh();

    // 画像の読み込み完了後に再計測（高さズレ防止）
    const imgs = document.querySelectorAll(".inner-content-home img");
    if (imgs.length) {
      let loaded = 0;
      const onImgDone = () => {
        loaded++;
        if (loaded === imgs.length) ScrollTrigger.refresh();
      };
      imgs.forEach((img) => {
        if (img.complete) {
          onImgDone();
        } else {
          img.addEventListener("load", onImgDone, { once: true });
          img.addEventListener("error", onImgDone, { once: true });
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();