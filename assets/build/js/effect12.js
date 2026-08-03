(function () {
  'use strict';

  // #effect12 セクションが無ければ何もしない
  var root = document.getElementById('effect12');
  if (!root) return;

  // ライブラリ未読み込みなら中断（エラーで固まらないようにする）。
  if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
    return;
  }

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
    '  float rad = 0.1;',            
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
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 300, 1000);
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

  // 1枚の画像から mesh を作る。
  Sketch.prototype.createMesh = function (o) {
    var material = this.material.clone();
    var texture = new THREE.Texture(o.image);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    var imageAspect = o.iHeight / o.iWidth;
    var a1, a2;
    if (o.height / o.width > imageAspect) {
      a1 = (o.width / o.height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (o.height / o.width) / imageAspect;
    }

    material.uniforms.resolution.value.set(o.width, o.height, a1, a2);
    material.uniforms.texture1.value = texture;

    var mesh = new THREE.Mesh(this.geometry, material);
    // scale を画像の実ピクセルサイズにする
    mesh.scale.set(o.width, o.height, o.width / 2);
    mesh.visible = false;               // 最初は非表示 
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
    this.angle = 0.30;                 // 広がりの傾き（参考サイト準拠）
    this.duration = 1.7;               // 1枚の巻き広げ時間(秒) 
    this.current = 0;                  // 現在のスライド番号 
    this.currentFlip = 0;              // 現在の向き(0=通常,1=反転)
    this.isAnimating = false;          // アニメ中の連打防止 

    // 必要な DOM を集める。
    this.slides = Array.prototype.slice.call(el.querySelectorAll('.effect12_slide'));
    this.texts  = this.slides.map(function (s) { return s.querySelector('.effect12_txtBox'); });
    this.images = this.slides.map(function (s) { return s.querySelector('.js-image'); });
    this.prevBtn = el.querySelector('.effect12_nav--prev');
    this.nextBtn = el.querySelector('.effect12_nav--next');

    // 画像ごとに mesh を1つずつ作る。
    this.meshes = this.images.map(function (img) {
      var b = img.getBoundingClientRect();
      return sketch.createMesh({
        width: b.width,
        height: b.height,
        image: img,
        iWidth: img.naturalWidth || b.width,
        iHeight: img.naturalHeight || b.height
      });
    });

    // ボタン：右=次へ、左=前へ。
    this.prevBtn.addEventListener('click', function () { self.go(-1); });
    this.nextBtn.addEventListener('click', function () { self.go(1); });

    // 毎フレーム mesh を画像の現在位置へ合わせる（スクロール/リサイズ追従）。
    sketch.onFrame = function () { self.reposition(); };

    this.updateNav();
    this.enter(0, 1);                  // 最初の1枚を自動で巻き広げる（左→右）
  }

  // mesh を画面上の画像位置・サイズに合わせる。
  Slider.prototype.positionMesh = function (index, flip) {
    var b = this.images[index].getBoundingClientRect();
    var mesh = this.meshes[index];
    var w = b.width, h = b.height;
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
    var flip = dir === 1 ? 0 : 1;      // 前へ(左ボタン)のときだけ反転 
    var mesh = this.meshes[index];
    var text = this.texts[index];

    this.current = index;
    this.currentFlip = flip;

    // 巻き前の初期状態にセットしてから表示。
    mesh.material.uniforms.angle.value = this.angle;
    mesh.material.uniforms.flipX.value = flip;
    mesh.material.uniforms.progress.value = 0;
    this.positionMesh(index, flip);
    mesh.visible = true;

    // progress を 0→1 へ補間 = 巻きがほどける本体アニメ。
    this.isAnimating = true;
    gsap.to(mesh.material.uniforms.progress, {
      value: 1,
      duration: this.duration,
      ease: 'power2.out',
      onComplete: function () { self.isAnimating = false; }
    });

    // 文字は少し遅れて opacity フェードイン。
    gsap.fromTo(text,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.45, ease: 'power2.out' }
    );

    this.updateNav();
  };

  // ボタン操作の入口。step=+1(次) / -1(前)。
  Slider.prototype.go = function (step) {
    if (this.isAnimating) return;      // アニメ中は無視
    var next = this.current + step;
    if (next < 0 || next >= this.slides.length) return;  // 端では止める（ループしない）

    var prev = this.current;
    // 今のスライドを消してから、新しいスライドを巻き広げる。
    this.meshes[prev].visible = false;
    gsap.to(this.texts[prev], { opacity: 0, y: 0, duration: 0.3, ease: 'power1.out' });

    this.enter(next, step > 0 ? 1 : -1);
  };

  // 端のボタンを隠す（先頭で左を、末尾で右を）。
  Slider.prototype.updateNav = function () {
    this.prevBtn.classList.toggle('is-hidden', this.current === 0);
    this.nextBtn.classList.toggle('is-hidden', this.current === this.slides.length - 1);
  };

  // 画像の naturalWidth と表示サイズが必要なので、読み込み完了を待つ。
  function whenImagesReady(imgs, cb) {
    var pending = imgs.length;
    if (!pending) return cb();
    imgs.forEach(function (img) {
      if (img.complete && img.naturalWidth) {
        if (--pending === 0) cb();
      } else {
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
      var sketch = new Sketch(container);
      new Slider(el, sketch);
      el.classList.add('is-loaded');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();