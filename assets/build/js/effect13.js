(function () {
  'use strict';

  // #effect13 セクションが無ければ何もしない
  var root = document.getElementById('effect13');
  if (!root) return;

  // ライブラリ未読み込みなら中断
  if (typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

  /* ---------- シェーダー ---------- */
  var vertexShader = [
    'uniform float angle;',
    'uniform float progress;',
    'varying vec2 vUv;',
    'varying float vFrontShadow;',
    '',
    'mat4 rotationMatrix(vec3 axis, float angle){',
    '  axis = normalize(axis);',
    '  float s = sin(angle);',
    '  float c = cos(angle);',
    '  float oc = 1.0 - c;',
    '  return mat4(',
    '    oc*axis.x*axis.x + c,        oc*axis.x*axis.y - axis.z*s, oc*axis.z*axis.x + axis.y*s, 0.0,',
    '    oc*axis.x*axis.y + axis.z*s, oc*axis.y*axis.y + c,        oc*axis.y*axis.z - axis.x*s, 0.0,',
    '    oc*axis.z*axis.x - axis.y*s, oc*axis.y*axis.z + axis.x*s, oc*axis.z*axis.z + c,        0.0,',
    '    0.0, 0.0, 0.0, 1.0);',
    '}',
    'vec3 rotate(vec3 v, vec3 axis, float angle){',
    '  mat4 m = rotationMatrix(axis, angle);',
    '  return (m * vec4(v, 1.0)).xyz;',
    '}',
    '',
    'void main(){',
    '  vUv = uv;',
    '  float pi = 3.14159265359;',
    '  float finalAngle = angle;',
    '  vec3 newposition = position;',
    '  float rad = 0.06;',
    '  float rolls = 8.0;',
    '',
    '  newposition = rotate(newposition - vec3(-0.5,0.5,0.0), vec3(0.0,0.0,1.0), -finalAngle) + vec3(-0.5,0.5,0.0);',
    '  float offs = (newposition.x + 0.5) / (sin(finalAngle) + cos(finalAngle));',
    '  float tProgress = clamp((progress - offs*0.99)/0.01, 0.0, 1.0);',
    '  vFrontShadow = clamp((progress - offs*0.95)/0.05, 0.7, 1.0);',
    '',
    '  newposition.z = rad + rad*(1.0 - offs/2.0)*sin(-offs*rolls*pi - 0.5*pi);',
    '  newposition.x = -0.5 + rad*(1.0 - offs/2.0)*cos(-offs*rolls*pi + 0.5*pi);',
    '  newposition = rotate(newposition - vec3(-0.5,0.5,0.0), vec3(0.0,0.0,1.0), finalAngle) + vec3(-0.5,0.5,0.0);',
    '  newposition = rotate(newposition - vec3(-0.5,0.5,rad), vec3(sin(finalAngle),cos(finalAngle),0.0), -pi*progress*rolls);',
    '  newposition += vec3(',
    '    -0.5 + progress*cos(finalAngle)*(sin(finalAngle) + cos(finalAngle)),',
    '     0.5 - progress*sin(finalAngle)*(sin(finalAngle) + cos(finalAngle)),',
    '     rad*(1.0 - progress/2.0)',
    '  );',
    '',
    '  vec3 finalposition = mix(newposition, position, tProgress);',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0);',
    '}'
  ].join('\n');

  var fragmentShader = [
    'uniform float progress;',
    'uniform float flipX;',
    'uniform sampler2D texture1;',
    'uniform vec4 resolution;',
    'varying vec2 vUv;',
    'varying float vFrontShadow;',
    '',
    'void main(){',
    '  vec2 uv2 = vUv;',
    '  if (flipX > 0.5) uv2.x = 1.0 - uv2.x;',
    '  vec2 newUV = (uv2 - vec2(0.5)) * resolution.zw + vec2(0.5);',
    '  gl_FragColor = texture2D(texture1, newUV);',
    '  gl_FragColor.rgb *= vFrontShadow;',
    '  gl_FragColor.a = clamp(progress*5.0, 0.0, 1.0);',
    '}'
  ].join('\n');

  /* ---------- ヘルパー：画像＋文字を canvas に描き込む ---------- */

  // object-fit: cover と同じ計算で画像を描く。
  function drawCover(ctx, img, dx, dy, dw, dh) {
    var iw = img.naturalWidth || dw, ih = img.naturalHeight || dh;
    var ir = iw / ih, dr = dw / dh, sw, sh, sx, sy;
    if (ir > dr) { sh = ih; sw = ih * dr; sx = (iw - sw) / 2; sy = 0; }
    else         { sw = iw; sh = iw / dr; sx = 0; sy = (ih - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  // 要素の実スタイルから canvas 用の font 文字列を作る。
  function cssFont(el) {
    var s = getComputedStyle(el);
    return (s.fontStyle || 'normal') + ' ' + (s.fontWeight || '400') + ' ' + s.fontSize + ' ' + s.fontFamily;
  }

  // 幅に合わせて改行する
  function wrapText(ctx, str, maxW) {
    var lines = [], line = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      var test = line + ch;
      if (ctx.measureText(test).width > maxW && line !== '') { lines.push(line); line = ch; }
      else { line = test; }
    }
    if (line) lines.push(line);
    return lines;
  }

  // タイトル＋本文を描く。位置とスタイルは DOM から読む
  function drawSlideText(ctx, slide, box) {
    var ttl = slide.querySelector('.effect13_ttl');
    var txt = slide.querySelector('.effect13_txt');

    ctx.save();
    ctx.textBaseline = 'top';
    // 画像の上でも読みやすいように影を付ける（不要なら消す）。
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 2;

    // タイトル（Page. と .num はフォントが別）。
    if (ttl) {
      var tr = ttl.getBoundingClientRect();
      var x = tr.left - box.left, y = tr.top - box.top;
      var numEl = ttl.querySelector('.num');
      // .num 以外のテキストノードだけ集める（"Page." 部分）。
      var baseStr = '';
      for (var i = 0; i < ttl.childNodes.length; i++) {
        if (ttl.childNodes[i].nodeType === 3) baseStr += ttl.childNodes[i].textContent;
      }
      if ('letterSpacing' in ctx) ctx.letterSpacing = 'normal';
      ctx.fillStyle = getComputedStyle(ttl).color;
      ctx.font = cssFont(ttl);
      ctx.fillText(baseStr, x, y);
      // 続けて .num をその右に描く。
      if (numEl) {
        var adv = ctx.measureText(baseStr).width;
        ctx.font = cssFont(numEl);
        ctx.fillStyle = getComputedStyle(numEl).color;
        ctx.fillText(numEl.textContent, x + adv, y);
      }
    }

    // 本文。
    if (txt) {
      var pr = txt.getBoundingClientRect();
      var px = pr.left - box.left, py = pr.top - box.top;
      var cs = getComputedStyle(txt);
      ctx.font = cssFont(txt);
      ctx.fillStyle = cs.color;
      if ('letterSpacing' in ctx) ctx.letterSpacing = (cs.letterSpacing === 'normal') ? '0px' : cs.letterSpacing;
      var maxW = txt.clientWidth || (box.width * 0.4);
      var lineH = parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) * 1.2);
      var lines = wrapText(ctx, txt.textContent.trim(), maxW);
      for (var k = 0; k < lines.length; k++) ctx.fillText(lines[k], px, py + k * lineH);
    }

    ctx.restore();
  }

  /* ---------- Sketch：WebGL シーン ---------- */
  function Sketch(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.sortObjects = false;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);
    this.cameraDistance = 400;
    // near を 100 に下げる：フル画面だと巻きの山がカメラに近づくため。
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 100, 1000);
    this.camera.position.set(0, 0, this.cameraDistance);
    this.camera.lookAt(0, 0, 0);
    this.geometry = new THREE.PlaneGeometry(1, 1, 80, 80);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        progress:   { value: 0 },
        angle:      { value: 0 },
        flipX:      { value: 0 },
        texture1:   { value: null },
        resolution: { value: new THREE.Vector4() }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    // 毎フレーム呼ぶコールバック（mesh を画像位置に追従させる用）。
    this.onFrame = null;
    this.resize();
    var self = this;
    window.addEventListener('resize', function () { self.resize(); });
    this._loop = this._loop.bind(this);
    this._loop();
  }

  Sketch.prototype.resize = function () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.fov = 2 * Math.atan(this.width / this.camera.aspect / (2 * this.cameraDistance)) * (180 / Math.PI);
    this.camera.updateProjectionMatrix();
  };

  // canvas から mesh を作る
  Sketch.prototype.createMesh = function (o) {
    var material = this.material.clone();
    var texture = new THREE.Texture(o.source);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    material.uniforms.texture1.value = texture;
    // cover は canvas 側で処理済みなので resolution は 1,1。
    material.uniforms.resolution.value.set(o.width, o.height, 1, 1);

    var mesh = new THREE.Mesh(this.geometry, material);
    // scale を画像の実ピクセルサイズにする。
    mesh.scale.set(o.width, o.height, o.width / 2);
    mesh.visible = false; // 最初は非表示 
    this.scene.add(mesh);
    return mesh;
  };

  // 描画ループ。毎フレーム onFrame → 描画。
  Sketch.prototype._loop = function () {
    if (this.onFrame) this.onFrame();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  };

  /* ---------- Slider：カルーセル制御 ---------- */
  function Slider(el, sketch) {
    var self = this;
    this.el = el;
    this.sketch = sketch;
    this.angle = 0.30;        // 広がりの傾き 
    this.duration = 1.7;      // 1枚の巻き広げ時間(秒) 
    this.current = 0;         // 現在のスライド番号 
    this.currentFlip = 0;     // 現在の向き(0=通常,1=反転)
    this.isAnimating = false; // アニメ中の連打防止

    this.slides = Array.prototype.slice.call(el.querySelectorAll('.effect13_slide'));
    this.images = this.slides.map(function (s) { return s.querySelector('.js-image'); });
    this.prevBtn = el.querySelector('.effect13_nav--prev');
    this.nextBtn = el.querySelector('.effect13_nav--next');

    // 画像ごとに：オフスクリーン canvas ＋ その canvas を texture にした mesh を作る。
    this.meshes = this.images.map(function (img, i) {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var b = img.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(b.width));
      canvas.height = Math.max(1, Math.round(b.height));
      var mesh = sketch.createMesh({ width: b.width, height: b.height, source: canvas });
      // 後で bake するのに必要な参照をまとめて持たせる。
      mesh.userData = {
        canvas: canvas, ctx: ctx,
        slide: self.slides[i], img: img,
        texture: mesh.material.uniforms.texture1.value
      };
      return mesh;
    });

    // ボタン：右=次へ、左=前へ。
    this.prevBtn.addEventListener('click', function () { self.go(-1); });
    this.nextBtn.addEventListener('click', function () { self.go(1); });

    // 毎フレーム mesh を画像の現在位置へ合わせる。
    sketch.onFrame = function () { self.reposition(); };

    // リサイズ時：現在スライドを bake し直す（文字位置と cover が変わるため）。
    window.addEventListener('resize', function () {
      clearTimeout(self._rz);
      self._rz = setTimeout(function () { self.bakeSlide(self.current); }, 150);
    });

    this.updateNav();
    this.enter(0, 1); // 最初の1枚を自動で巻き広げる（左→右）
  }

  // 画像(cover)＋文字を canvas に描いて texture を更新する。
  Slider.prototype.bakeSlide = function (index) {
    var ud = this.meshes[index].userData;
    var b = ud.img.getBoundingClientRect();
    var w = Math.max(1, b.width), h = Math.max(1, b.height);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 高解像度対応：canvas を dpr 倍で持ち、描画は等倍座標に戻す。
    ud.canvas.width = Math.round(w * dpr);
    ud.canvas.height = Math.round(h * dpr);
    ud.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ud.ctx.clearRect(0, 0, w, h);

    drawCover(ud.ctx, ud.img, 0, 0, w, h); // 1) 背景の画像を全面に / 1) 
    drawSlideText(ud.ctx, ud.slide, b);     // 2) 文字を上に重ねる（同じ1枚）/ 2) 

    ud.texture.needsUpdate = true;
  };

  // mesh を画面上の画像位置・サイズに合わせる。
  Slider.prototype.positionMesh = function (index, flip) {
    var b = this.images[index].getBoundingClientRect();
    var mesh = this.meshes[index];
    var w = b.width, h = b.height;
    // flip 時は scale.x を負にして巻き方向だけ反転
    mesh.scale.set(flip ? -w : w, h, w / 2);
    mesh.position.x = -window.innerWidth / 2 + b.left + w / 2;
    mesh.position.y =  window.innerHeight / 2 - b.top - h / 2;
  };

  Slider.prototype.reposition = function () {
    this.positionMesh(this.current, this.currentFlip);
  };

  // 1枚を登場させる。dir=1(次へ:左→右) / dir=-1(前へ:右→左)。
  Slider.prototype.enter = function (index, dir) {
    var self = this;
    var flip = dir === 1 ? 0 : 1; // 前へ(左ボタン)のときだけ反転
    var mesh = this.meshes[index];

    this.current = index;
    this.currentFlip = flip;

    this.bakeSlide(index); // 表示直前に bake 

    // 巻き前の初期状態にセットしてから表示。
    mesh.material.uniforms.angle.value = this.angle;
    mesh.material.uniforms.flipX.value = flip;
    mesh.material.uniforms.progress.value = 0;
    this.positionMesh(index, flip);
    mesh.visible = true;

    // progress を 0→1：画像も文字も一緒に巻きがほどける
    this.isAnimating = true;
    gsap.to(mesh.material.uniforms.progress, {
      value: 1,
      duration: this.duration,
      ease: 'power2.out',
      onComplete: function () { self.isAnimating = false; }
    });

    this.updateNav();
  };

  // ボタン操作の入口。step=+1(次) / -1(前)。
  Slider.prototype.go = function (step) {
    if (this.isAnimating) return; // アニメ中は無視
    var next = this.current + step;
    if (next < 0 || next >= this.slides.length) return; // 端では止める 
    // 今のスライドを消してから、新しいスライドを巻き広げる。
    this.meshes[this.current].visible = false;
    this.enter(next, step > 0 ? 1 : -1);
  };

  // 端のボタンを隠す
  Slider.prototype.updateNav = function () {
    this.prevBtn.classList.toggle('is-hidden', this.current === 0);
    this.nextBtn.classList.toggle('is-hidden', this.current === this.slides.length - 1);
  };

  // 画像の naturalWidth と表示サイズが必要なので、読み込み完了を待つ。
  function whenImagesReady(imgs, cb) {
    var pending = imgs.length;
    if (!pending) return cb();
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth) { if (--pending === 0) cb(); }
      else {
        var done = function () { if (--pending === 0) cb(); };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });
  }

  function init() {
    var el = root;
    var container = document.getElementById('container');
    if (!el || !container) return;

    var imgs = Array.prototype.slice.call(el.querySelectorAll('.js-image'));
    whenImagesReady(imgs, function () {
      // フォント読込後に bake しないと文字が正しいフォントにならない。
      var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      ready.then(function () {
        var sketch = new Sketch(container);
        new Slider(el, sketch);
        el.classList.add('is-loaded');
      });
    });
  }

  // DOM 準備ができ次第 init。
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();