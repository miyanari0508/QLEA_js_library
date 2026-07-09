class SunbeamEffect {
    constructor(container) {
        this.container = container;
        this.speed = 0.4;
        this.maxStrength = 13;
        this.minStrength = 3;
        this.maxRadius = window.innerWidth < 768 ? 0.08 : 0.3;
        this.minRadius = window.innerWidth < 768 ? 0.01 : 0.05;
        this.shader = `
           precision highp float;

            uniform vec2 resolution;
            uniform sampler2D image;
            uniform vec2 imageResolution;
            uniform float progress;

            vec2 adjustRatio(vec2 uv, vec2 inputResolution, vec2 outputResolution) {
                vec2 ratio = vec2(
                    min((outputResolution.x / outputResolution.y) / (inputResolution.x / inputResolution.y), 1.),
                    min((outputResolution.y / outputResolution.x) / (inputResolution.y / inputResolution.x), 1.)
                );
                return uv * ratio + (1. - ratio) * 0.5;
            }

            void main() {

                vec2 uv = gl_FragCoord.st / resolution;
                uv.y = 1. - uv.y;

                uv = adjustRatio(uv, imageResolution, resolution);

                // 背景画像は固定
                gl_FragColor = texture2D(image, uv);

            }
        `;
    }

    loadImage(srcs, isCrossOrigin) {
        if (!Array.isArray(srcs)) {
            srcs = [srcs];
        }

        const promises = srcs.map(src => {
            const img = document.createElement('img');
            if (isCrossOrigin) img.crossOrigin = 'anonymous';
            img.src = src;

            return new Promise(resolve => {
                img.onload = () => resolve(img);
            });
        });

        return Promise.all(promises);
    }

    mix(x, y, a) {
        return x * (1 - a) + y * a;
    }

    async init() {

        const imageSrc = this.container.getAttribute("data-src");
        if (!imageSrc) return;

        const [img] = await this.loadImage(imageSrc, true);

        const webgl = new Kgl({
            programs: {
                mask: {
                    fragmentShader: this.shader,
                    uniforms: {
                        image: img,
                        imageResolution: [img.width, img.height],
                        progress: 0,
                    }
                }
            },
            effects: ['godray'],
            framebuffers: ['mask', 'cache', 'output'],
            tick: time => {

                // ゆっくり0～1を往復
                const progress = Math.sin(time * 0.18) * 0.5 + 0.5;

                // 光が少しだけ左右に揺れる
                const lightX =
                    webgl.canvas.width * 0.1 +
                    Math.sin(time * 0.5) * webgl.canvas.width * 0.08;

                // 高さは固定
                const lightY = webgl.canvas.height * 1.15;

                // 光の強さ
                const strength =
                    8 +
                    Math.sin(time * 0.27) * 2;

                // 光の広がり
                const radius =
                    0.18 +
                    Math.sin(time * 0.20) * 0.03;

                webgl.bindFramebuffer('mask');

                webgl.programs['mask'].draw({
                    progress
                });

                webgl.effects['godray'].draw(
                    'mask',
                    'cache',
                    'output',
                    strength,
                    [lightX, lightY],
                    radius,
                    true
                );

            }
        });

        this.container.appendChild(webgl.canvas);
    }
}
