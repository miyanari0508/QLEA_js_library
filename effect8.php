<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>

<body id="pageEffect8">
    <main id="main">
        <div data-name="bg-images" class="bg-images">
            <div data-name="kv-video-wrap" class="kv-video-wrap">
                <video data-name="kv-video-pc" class="kv-video _pc" poster="<?php echo h($path_img) ?>/effect8/poster-kv-video.webp" loop playsinline webkit-playsinline muted>
                    <source src="<?php echo h($path_img) ?>/effect8/kv-video.mp4" type="video/mp4">
                </video>
                <video data-name="kv-video-sp" class="kv-video _sp" poster="<?php echo h($path_img) ?>/effect8/poster-kv-video.webp" loop playsinline webkit-playsinline muted>
                    <source src="<?php echo h($path_img) ?>/effect8/kv-video.mp4" type="video/mp4">
                </video>
            </div>

            <div data-name="wrap-kv-bgs" class="wrap-kv-bgs">
                <div data-name="bg-fullpicture" class="bg-picture mask">
                    <picture>
                        <img class="_pc" data-name="GOLF" src="<?php echo h($path_img) ?>/effect8/bg-golf.jpg" alt="GOLF" />
                        <img class="_sp" data-name="GOLF" src="<?php echo h($path_img) ?>/effect8/bg-golf-sp.jpg" alt="GOLF" />
                    </picture>
                </div>
                <div data-name="bg-fullpicture" class="bg-picture">
                    <picture>
                        <img class="_pc" data-name="GOURMET" src="<?php echo h($path_img) ?>/effect8/bg-gourmet.jpg" alt="GOURMET" />
                        <img class="_sp" data-name="GOURMET" src="<?php echo h($path_img) ?>/effect8/bg-gourmet-sp.jpg" alt="GOURMET" />
                    </picture>
                </div>
                <div data-name="bg-fullpicture" class="bg-picture">
                    <picture>
                        <img class="_pc" data-name="WELLNESS" src="<?php echo h($path_img) ?>/effect8/bg-wellness.jpg" alt="WELLNESS" />
                        <img class="_sp" data-name="WELLNESS" src="<?php echo h($path_img) ?>/effect8/bg-wellness-sp.jpg" alt="WELLNESS" />
                    </picture>
                </div>
                <div data-name="bg-fullpicture" class="bg-picture">
                    <picture>
                        <img class="_pc" data-name="FACILITIES" src="<?php echo h($path_img) ?>/effect8/bg-facilities.jpg" alt="FACILITIES" />
                        <img class="_sp" data-name="FACILITIES" src="<?php echo h($path_img) ?>/effect8/bg-facilities-sp.jpg" alt="FACILITIES" />
                    </picture>
                </div>
            </div>

            <div data-name="ttls-contents" class="ttls-contents">
                <h3 data-name="GOLF">GOLF</h3>
                <h3 data-name="GOURMET">GOURMET</h3>
                <h3 data-name="WELLNESS">WELLNESS</h3>
                <h3 data-name="FACILITIES">FACILITIES</h3>
                <h3 data-name="NEWS">NEWS</h3>
            </div>
        </div>

        <div data-name="fv-contents" class="fv-contents">
            <div data-name="fv-contents-logos" class="fv-logo">GORA KADAN FUJI GOLF</div>
            <div data-name="fv-news-wrap" class="fv-news-wrap">Scroll to explore</div>
        </div>
        <div class="scroll-cue" aria-hidden="true"></div>

        <div class="w-home-contents">
            <section data-name="content-home" class="content-home">
                <div data-name="inner-content-home" class="inner-content-home">
                    <div class="flex">
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-golf.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-facilities.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-golf.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-facilities.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-golf.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-facilities.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-golf.jpg">
                        </div>
                        <div class="img">
                            <img src="<?php echo h($path_img) ?>/effect8/bg-facilities.jpg">
                        </div>
                    </div>
                </div>
            </section>

            <section data-name="content-home" class="content-home">
                <div data-name="inner-content-home" class="inner-content-home"></div>
            </section>

            <section data-name="content-home" class="content-home">
                <div data-name="inner-content-home" class="inner-content-home"></div>
            </section>

            <section data-name="content-home" class="content-home">
                <div data-name="inner-content-home" class="inner-content-home"></div>
            </section>

            <section data-name="content-home" class="content-home">
                <div data-name="inner-content-home" class="inner-content-home"></div>
            </section>
        </div>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<script src="<?php echo h($path_js) ?>/effect8.js"></script>

</html>