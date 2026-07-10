(function () {
  'use strict';

  // ----- 設定 ----------------
  var CONFIG = {
    container:      '#webgl',              // Canvasを配置する要素
    imageSelector:  '[data-image-item] img',
    blackMaskAlpha: 0.15,                  // モノクロ画像に重ねる暗いオーバーレイの不透明度
    borderRadius:   16,                    // 角丸（px、控えめ）
    enterDuration:  2.0,                   // ホバー時の色が広がる時間（秒）
    leaveDuration:  1.6,                   // ホバー解除時に色が戻る時間（秒）
    mouseLerp:      0.08,                  // マウス追従の遅延量（変形）
    maxPixelRatio:  1.5
  };

  var VERT = [
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    'precision mediump float;',
    'uniform sampler2D u_texture;',
    'uniform vec2  u_resolution;',
    'uniform vec2  u_planeSize;',
    'uniform vec2  u_imageSize;',
    'uniform float u_progress;',
    'uniform float u_uvX;',
    'uniform float u_uvY;',
    'uniform float u_smoothWidth;',
    'uniform float u_time;',
    'uniform vec2  u_mouse;',
    'uniform vec2  u_trackedMouse;',
    'uniform float u_leave;',
    'uniform float u_gridEffectAmount;',
    'uniform float u_blackMaskAlpha;',
    'uniform float u_borderRadius;',
    'varying vec2 vUv;',
    // アスペクト比を維持（object-fit: cover）
    'vec2 imageAspect(vec2 planeSize, vec2 imgSize, vec2 p) {',
    '  vec2 ratio = vec2(',
    '    min((planeSize.x / planeSize.y) / (imgSize.x / imgSize.y), 1.0),',
    '    min((planeSize.y / planeSize.x) / (imgSize.y / imgSize.x), 1.0)',
    '  );',
    '  return vec2((p.x-0.5)*ratio.x + 0.5, (p.y-0.5)*ratio.y + 0.5);',
    '}',
    'void main() {',
    '  vec2 uv = imageAspect(u_planeSize, u_imageSize, vUv);',
    // マウスの移動方向に応じて軽く変形
    '  vec2 mouseUV        = (u_mouse.xy + 1.0) * 0.5;',
    '  vec2 trackedMouseUV = (u_trackedMouse.xy + 1.0) * 0.5;',
    '  vec2 mouseDirection = mouseUV - trackedMouseUV;',
    '  float distToMouse   = length(uv - mouseUV);',
    '  float strength      = smoothstep(0.8, 0.0, distToMouse);',
    '  vec2  uvOffset      = strength * mouseDirection * 0.115 * u_gridEffectAmount;',
    '  vec2  newUv         = uv - uvOffset;',
    '  vec4 colorTex = texture2D(u_texture, newUv);',
    // モノクロ + 暗いオーバーレイ
    '  float gray = dot(colorTex.rgb, vec3(0.299, 0.587, 0.114));',
    '  float alpha = colorTex.a < 0.1 ? colorTex.a : 1.0;',
    '  vec3 maskedGray = mix(vec3(gray), vec3(0.0), u_blackMaskAlpha);',
    '  vec4 grayTex = vec4(maskedGray, alpha);',
    '  vec4 fullTex = vec4(colorTex.rgb, alpha);',
    // カーソル位置から広がる色の波紋
    '  vec2 coord = vec2(u_uvX, u_uvY);',
    '  float dist = length(newUv - coord);',
    '  float maxDistance = max(length(vec2(0.0)-coord), length(vec2(1.0)-coord));',
    '  maxDistance = max(maxDistance, max(length(vec2(0.0,1.0)-coord), length(vec2(1.0,0.0)-coord)));',
    '  float adjustedProgress = u_progress * maxDistance * 1.2;',
    '  float smoothRange = u_smoothWidth * 0.2;',
    '  float t1 = smoothstep(adjustedProgress - smoothRange*0.5, adjustedProgress + smoothRange*0.5, dist);',
    '  float curvedDistance = pow(dist / maxDistance, 0.8);',
    '  float t2 = smoothstep(adjustedProgress - smoothRange, adjustedProgress + smoothRange, curvedDistance * maxDistance);',
    '  float finalT = smoothstep(0.0, 1.0, mix(t1, t2, 0.1));',
    '  vec4 Tex;',
    '  if (u_leave > 0.0) { Tex = mix(fullTex, grayTex, finalT); }',
    '  else { Tex = mix(grayTex, fullTex, u_progress); }',
    // 角を丸くする
    '  vec2 alphaUv = vUv - 0.5;',
    '  float br = min(u_borderRadius, min(u_resolution.x, u_resolution.y) * 0.5);',
    '  vec2 off = vec2(br) / u_resolution;',
    '  vec2 alphaXY = smoothstep(vec2(0.5-off), vec2(0.5-off-0.001), abs(alphaUv));',
    '  float alphaMask = min(1.0, alphaXY.x + alphaXY.y);',
    '  vec2 aspect = u_resolution / max(u_resolution.x, u_resolution.y);',
    '  vec2 alphaUv2 = abs(vUv - 0.5);',
    '  float radius = br / max(u_resolution.x, u_resolution.y);',
    '  alphaUv2 = (alphaUv2 - 0.5) * aspect + radius;',
    '  float roundAlpha = smoothstep(radius + 0.001, radius, length(alphaUv2));',
    '  alphaMask = min(1.0, alphaMask + roundAlpha);',
    '  Tex.a *= alphaMask;',
    '  gl_FragColor = Tex;',
    '}'
  ].join('\n');

  var instance = null;

  function HoverRevealEffect(container, images) {
    this.container = container;
    this.images = Array.prototype.slice.call(images);
    this.meshes = [];
    this.raf = null;
    this.hovered = null;

    this.mouse   = new THREE.Vector2(-2, -2);  
    this.tracked = new THREE.Vector2(0, 0);    
    this.raycaster = new THREE.Raycaster();
    this.loader = new THREE.TextureLoader();

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onResize    = this._onResize.bind(this);
    this._loop        = this._loop.bind(this);
  }

  HoverRevealEffect.prototype._setupStage = function () {
    var w = window.innerWidth, h = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.maxPixelRatio));
    this.renderer.setSize(w, h);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-w/2, w/2, h/2, -h/2, 0.1, 10000);
    this.camera.position.z = 100;
  };

  HoverRevealEffect.prototype._waitImages = function () {
    return Promise.all(this.images.map(function (img) {
      return new Promise(function (res) {
        if (img.complete && img.naturalWidth) res();
        else { img.addEventListener('load', res, { once: true });
               img.addEventListener('error', res, { once: true }); }
      });
    }));
  };

  HoverRevealEffect.prototype._buildMeshes = function () {
    var self = this;
    this.images.forEach(function (img) {
      var tex = self.loader.load(img.currentSrc || img.src);
      tex.minFilter = THREE.LinearFilter;
      var geo = new THREE.PlaneGeometry(1, 1, 20, 20);
      var mat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          u_texture:          { value: tex },
          u_resolution:       { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          u_planeSize:        { value: new THREE.Vector2(1, 1) },
          u_imageSize:        { value: new THREE.Vector2(img.naturalWidth || 1, img.naturalHeight || 1) },
          u_progress:         { value: 0 },
          u_uvX:              { value: 0.5 },
          u_uvY:              { value: 0.5 },
          u_smoothWidth:      { value: 0 },
          u_time:             { value: 0 },
          u_mouse:            { value: new THREE.Vector2(0, 0) },
          u_trackedMouse:     { value: new THREE.Vector2(0, 0) },
          u_leave:            { value: 0 },
          u_gridEffectAmount: { value: 0 },
          u_blackMaskAlpha:   { value: CONFIG.blackMaskAlpha },
          u_borderRadius:     { value: CONFIG.borderRadius }
        }
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.userData.img = img;
      self.meshes.push(mesh);
      self.scene.add(mesh);
    });
  };

  // 毎フレーム、画像の移動やスクロールを含めて、Meshが画像に追従するようにDOMの位置を再取得
  HoverRevealEffect.prototype._syncPositions = function () {
    var wHalf = window.innerWidth / 2, hHalf = window.innerHeight / 2;
    for (var i = 0; i < this.meshes.length; i++) {
      var mesh = this.meshes[i];
      var r = mesh.userData.img.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      mesh.scale.set(r.width, r.height, 1);
      mesh.position.x = -wHalf + r.width / 2 + r.left;
      mesh.position.y =  hHalf - r.height / 2 - r.top;
      var u = mesh.material.uniforms;
      u.u_planeSize.value.set(r.width, r.height);
      u.u_resolution.value.set(window.innerWidth, window.innerHeight);
    }
  };

  HoverRevealEffect.prototype._enter = function (mesh) {
    var u = mesh.material.uniforms;
    gsap.set(u.u_leave,       { value: 1 });
    gsap.set(u.u_smoothWidth, { value: 0.8 });
    gsap.to(u.u_progress,          { value: 1, duration: CONFIG.enterDuration, overwrite: 'auto' });
    gsap.to(u.u_gridEffectAmount,  { value: 1, duration: 0.4, overwrite: 'auto' });
  };

  HoverRevealEffect.prototype._leave = function (mesh) {
    var u = mesh.material.uniforms;
    gsap.set(u.u_leave, { value: 0 });
    gsap.to(u.u_progress,         { value: 0, duration: CONFIG.leaveDuration, overwrite: 'auto' });
    gsap.to(u.u_smoothWidth,      { value: 0, duration: 0.5, overwrite: 'auto' });
    gsap.to(u.u_gridEffectAmount, { value: 0, duration: 0.4, overwrite: 'auto' });
  };

  HoverRevealEffect.prototype._raycast = function () {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var hits = this.raycaster.intersectObjects(this.meshes);
    if (!hits.length) {
      if (this.hovered) { this._leave(this.hovered); this.hovered = null; }
      return;
    }
    var mesh = hits[0].object;
    if (this.hovered && this.hovered !== mesh) this._leave(this.hovered);
    if (this.hovered !== mesh) { this.hovered = mesh; this._enter(mesh); }
    var uv = hits[0].uv; // マウスカーソルに追従する光の中心
    if (uv) {
      mesh.material.uniforms.u_uvX.value = uv.x;
      mesh.material.uniforms.u_uvY.value = uv.y;
    }
  };

  HoverRevealEffect.prototype._loop = function () {
    this.raf = requestAnimationFrame(this._loop);
    this.tracked.x += (this.mouse.x - this.tracked.x) * CONFIG.mouseLerp;
    this.tracked.y += (this.mouse.y - this.tracked.y) * CONFIG.mouseLerp;
    for (var i = 0; i < this.meshes.length; i++) {
      var u = this.meshes[i].material.uniforms;
      u.u_time.value += 0.01;
      u.u_mouse.value.copy(this.mouse);
      u.u_trackedMouse.value.copy(this.tracked);
    }
    this._syncPositions();
    this._raycast();
    this.renderer.render(this.scene, this.camera);
  };

  HoverRevealEffect.prototype._onMouseMove = function (e) {
    this.mouse.x =  e.clientX / window.innerWidth  * 2 - 1;
    this.mouse.y = -e.clientY / window.innerHeight * 2 + 1;
  };

  HoverRevealEffect.prototype._onResize = function () {
    var w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.left = -w/2; this.camera.right = w/2;
    this.camera.top = h/2;  this.camera.bottom = -h/2;
    this.camera.updateProjectionMatrix();
  };

  HoverRevealEffect.prototype.start = function () {
    var self = this;
    this._setupStage();
    return this._waitImages().then(function () {
      self._buildMeshes();
      window.addEventListener('mousemove', self._onMouseMove);
      window.addEventListener('resize', self._onResize);
      self._loop();
    });
  };

  HoverRevealEffect.prototype.destroy = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize', this._onResize);
    this.meshes.forEach(function (m) {
      if (m.geometry) m.geometry.dispose();
      if (m.material) {
        if (m.material.uniforms.u_texture.value) m.material.uniforms.u_texture.value.dispose();
        m.material.dispose();
      }
    });
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode)
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.meshes = [];
    this.scene = null;
    this.camera = null;
  };

  var API = {
    config: CONFIG,
    init: function () {
      // タッチデバイス（ホバー非対応）は通常画像を使用
      if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
      if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
        return;
      }
      var container = document.querySelector(CONFIG.container);
      if (!container) { console.warn('[HoverReveal] Không tìm thấy container', CONFIG.container); return; }
      var images = document.querySelectorAll(CONFIG.imageSelector);
      if (!images.length) return;

      if (instance) instance.destroy();
      instance = new HoverRevealEffect(container, images);
      instance.start();
    },
    destroy: function () { if (instance) { instance.destroy(); instance = null; } }
  };
  window.HoverReveal = API;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', API.init);
  } else {
    API.init();
  }
})();