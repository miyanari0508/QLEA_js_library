<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>

<!-- ____________________//head____________________ -->

<body id="pageEffect12">
    <!-- ______main______________//header____________________ -->
    <!-- ____________________content____________________ -->
    <main>
        <div class="effect12" id="effect12">
            <div class="effect12_stage">
                <div class="effect12_slide is-active">
                    <div class="effect12_box">
                        <div class="effect12_txtBox">
                            <h2 class="effect12_ttl">Page.<span class="num">1</span></h2>
                            <p class="effect12_txt">テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
                        </div>
                        <figure class="effect12_imgBox">
                            <img class="js-image" src="<?php echo h($path_img) ?>/img1.jpg" alt="">
                        </figure>
                    </div>
                </div>
                <div class="effect12_slide">
                    <div class="effect12_box">
                        <div class="effect12_txtBox">
                            <h2 class="effect12_ttl">Page.<span class="num">2</span></h2>
                            <p class="effect12_txt">テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
                        </div>
                        <figure class="effect12_imgBox">
                            <img class="js-image" src="<?php echo h($path_img) ?>/img2.jpg" alt="">
                        </figure>
                    </div>
                </div>
                <div class="effect12_slide">
                    <div class="effect12_box">
                        <div class="effect12_txtBox">
                            <h2 class="effect12_ttl">Page.<span class="num">3</span></h2>
                            <p class="effect12_txt">テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
                        </div>
                        <figure class="effect12_imgBox">
                            <img class="js-image" src="<?php echo h($path_img) ?>/img3.jpg" alt="">
                        </figure>
                    </div>
                </div>

            </div>
            <button type="button" class="effect12_nav effect12_nav--prev" aria-label="前へ">
                <img class="icon" src="<?php echo h($path_img) ?>/icon-arrow.svg" alt="">
            </button>
            <button type="button" class="effect12_nav effect12_nav--next" aria-label="次へ">
                <img class="icon" src="<?php echo h($path_img) ?>/icon-arrow.svg" alt="">
            </button>
        </div>
        <div id="container"></div>
    </main>
<?php include(dirname(__FILE__) . '/inc/footer.php'); ?>
</body>
<script src="<?php echo h($path_lib) ?>/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="<?php echo h($path_js) ?>/effect12.js"></script>
</html>