<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</head>

<!-- ____________________//head____________________ -->

<body id="pageEffect11">
    <!-- ______main______________//header____________________ -->
    <!-- ____________________content____________________ -->
    <main>
        <section class="pickup" id="pickup">
            <div class="pickup-head">
                <h2 class="pickup-ttl" lang="en"><span>Pick up</span> <span>News</span></h2>
            </div>

            <div class="pickup-body">
                <div class="pickup-slider swiper js-pickup">
                    <div class="swiper-wrapper">
                        <div class="slide swiper-slide">
                            <a href="#" class="slide-link">
                                <figure class="slide-img">
                                    <img src="<?php echo h($path_img) ?>/effect11/img_01.jpg" alt="">
                                </figure>
                                <h3 class="slide-ttl"><span>text text text text text text text text text text text text text text text</span></h3>
                            </a>
                        </div>
                        <div class="slide swiper-slide">
                            <a href="#" class="slide-link">
                                <figure class="slide-img">
                                    <img src="<?php echo h($path_img) ?>/effect11/img_02.jpg" alt="">
                                </figure>
                                <h3 class="slide-ttl"><span>text text text text text</span></h3>
                            </a>
                        </div>
                        <div class="slide swiper-slide">
                            <a href="#" class="slide-link">
                                <figure class="slide-img">
                                    <img src="<?php echo h($path_img) ?>/effect11/img_03.png" alt="">
                                </figure>
                                <h3 class="slide-ttl"><span>text text text text text</span></h3>
                            </a>
                        </div>
                        <div class="slide swiper-slide">
                            <a href="#" class="slide-link">
                                <figure class="slide-img">
                                    <img src="<?php echo h($path_img) ?>/effect11/img_04.jpg" alt="">
                                </figure>
                                <h3 class="slide-ttl"><span>text text text text text</span></h3>
                            </a>
                        </div>
                        <div class="slide swiper-slide">
                            <a href="#" class="slide-link">
                                <figure class="slide-img">
                                    <img src="<?php echo h($path_img) ?>/effect11/img_05.png" alt="">
                                </figure>
                                <h3 class="slide-ttl"><span>text text text text text</span></h3>
                            </a>
                        </div>
                        <div class="slide swiper-slide">
                            <a href="#" class="slide-link">
                                <figure class="slide-img">
                                    <img src="<?php echo h($path_img) ?>/effect11/img_06.png" alt="">
                                </figure>
                                <h3 class="slide-ttl"><span>text text text text text</span></h3>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pickup-control">
                <button class="pickup-nav js-prev" type="button" aria-label="Previous">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15 4 7 12l8 8" />
                    </svg>
                </button>
                <div class="pickup-dots js-dots"></div>
                <button class="pickup-nav js-next" type="button" aria-label="Next">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 4l8 8-8 8" />
                    </svg>
                </button>
            </div>
        </section>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="<?php echo h($path_js) ?>/effect11.js"></script>

</html>