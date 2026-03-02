<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageEffect4">
    <!-- ______main______________//header____________________ -->
    <!-- ____________________content____________________ -->
    <main>
        <section>
            <section>
                <img src="<?php echo h($path_img) ?>/img1.jpg">
                <!-- LOADING EFFECT -->
                <div class="grid">
                    <a href="<?php echo h($path) ?>/effect4.php" class="img-box">
                        <div class="loading-div" data-displacement="<?php echo h($path_img) ?>/displacement/4.png" data-intensity="-3.5" data-speed="2.2">
                            <img class="initialImg" src="<?php echo h($path_img) ?>/img4.png">
                        </div>
                    </a>
                    <a href="<?php echo h($path) ?>/effect4.php" class="img-box">
                        <div class="loading-div" data-displacement="<?php echo h($path_img) ?>/displacement/4.png" data-intensity="-3.5" data-speed="2.2">
                            <img class="initialImg" src="<?php echo h($path_img) ?>/img2.jpg">
                        </div>
                    </a>
                </div>
            </section>
        </section>
    </main>
</body>
<script src="<?php echo h($path_lib) ?>/three.min.js"></script>
<script src="<?php echo h($path_lib) ?>/TweenMax.min.js"></script>
<script src="<?php echo h($path_js) ?>/loadingdistortion2.js"></script>

<script type="text/javascript">
    document.querySelectorAll('.loading-div').forEach(elm => {
        const imgs = Array.from(elm.querySelectorAll('img'));
        new LoadingDistortionEffect({
            parent: elm,
            image: imgs[0].getAttribute('src'),
            displacementImage: elm.dataset.displacement,
            intensity: elm.dataset.intensity || undefined,
            speed: elm.dataset.speed || undefined,
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    elm.classList.add('act-scroll');
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.5
        });
        observer.observe(elm);
    });
</script>

</html>