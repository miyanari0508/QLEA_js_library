<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageEffect9">
    <div id="webgl"></div>
    <!-- ______main______________//header____________________ -->
    <!-- ____________________content____________________ -->
    <main>
        <section class="p-home-what" data-background-white="">
            <div class="p-home-what__images" style="translate: none; rotate: none; scale: none; transform: translate3d(7.4447%, 0px, 0px);">
                <div class="p-home-what__image-cover" aria-hidden="true">
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image01.webp" alt="">
                    </div>
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image02.webp" alt="">
                    </div>
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image03.webp" alt="">
                    </div>
                </div>
                <div class="p-home-what__image-cover" aria-hidden="true">
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image01.webp" alt="">
                    </div>
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image02.webp" alt="">
                    </div>
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image03.webp" alt="">
                    </div>
                </div>
                <div class="p-home-what__image-cover" aria-hidden="true">
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image01.webp" alt="">
                    </div>
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image02.webp" alt="">
                    </div>
                    <div class="p-home-what__image" data-image-item="">
                        <img src="<?php echo h($path_img) ?>/effect9/photo-image03.webp" alt="">
                    </div>
                </div>
            </div>
        </section>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="<?php echo h($path_lib) ?>/three.min.js"></script>
<script src="<?php echo h($path_js) ?>/effect9.js"></script>
</html>