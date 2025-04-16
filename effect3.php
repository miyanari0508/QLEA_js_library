<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageEffect3">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <section>
      <!-- HOVER EFFECT -->
      <div class="grid">
        <div class="hover-div" data-displacement="<?php echo h($path_img) ?>/displacement/1.jpg" data-intensity="-0.65"
          data-speedin="1.5" data-speedout="1.2">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img1.jpg">
          <img src="<?php echo h($path_img) ?>/img3.jpg">
        </div>
        <div class="hover-div" data-displacement="<?php echo h($path_img) ?>/displacement/2.jpg" data-intensity="-0.65"
          data-speedin="1.5" data-speedout="1.2">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img2.jpg">
          <img src="<?php echo h($path_img) ?>/img1.jpg">
        </div>
      </div>
      <!-- LOADING EFFECT -->
      <div class="grid">
        <div class="loading-div" data-displacement="<?php echo h($path_img) ?>/displacement/4.png" data-intensity="-0.2"
          data-intensity="-0.65" data-speed="1.5">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img2.jpg">
        </div>

        <div class="loading-div" data-displacement="<?php echo h($path_img) ?>/displacement/3.jpg" data-intensity="-0.2"
          data-intensity="0.5" data-speed="1.5">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img3.jpg">
        </div>
      </div>
      <!-- HOVER EFFECT -->
      <div class="grid">
        <div class="hover-div" data-displacement="<?php echo h($path_img) ?>/displacement/3.jpg" data-intensity="-0.65"
          data-speedin="1.5" data-speedout="1.2">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img2.jpg">
          <img src="<?php echo h($path_img) ?>/img3.jpg">
        </div>
        <div class="hover-div" data-displacement="<?php echo h($path_img) ?>/displacement/4.png" data-intensity="-0.65"
          data-speedin="1.5" data-speedout="1.2">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img3.jpg">
          <img src="<?php echo h($path_img) ?>/img1.jpg">
        </div>
      </div>
      <!-- LOADING EFFECT -->
      <div class="grid">
        <div class="loading-div" data-displacement="<?php echo h($path_img) ?>/displacement/1.jpg" data-intensity="0.2"
          data-intensity="-0.65" data-speed="1.5">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img3.jpg">
        </div>

        <div class="loading-div" data-displacement="<?php echo h($path_img) ?>/displacement/2.jpg" data-intensity="-0.2"
          data-intensity="0.5" data-speed="1.5">
          <img class="initialImg" src="<?php echo h($path_img) ?>/img1.jpg">
        </div>
      </div>
    </section>
  </main>
</body>
<script src="<?php echo h($path_lib) ?>/three.min.js"></script>
<script src="<?php echo h($path_lib) ?>/TweenMax.min.js"></script>
<script src="<?php echo h($path_js) ?>/hoverdistortion.js"></script>
<script src="<?php echo h($path_js) ?>/loadingdistortion.js"></script>
<script type="text/javascript">
  document.querySelectorAll('.hover-div').forEach(elm => {
    const imgs = Array.from(elm.querySelectorAll('img'));
    new HoverEffect({
      parent: elm,
      intensity: elm.dataset.intensity || undefined,
      speedIn: elm.dataset.speedin || undefined,
      speedOut: elm.dataset.speedout || undefined,
      easing: elm.dataset.easing || undefined,
      hover: elm.dataset.hover || undefined,
      image1: imgs[0].getAttribute('src'),
      image2: imgs[1].getAttribute('src'),
      displacementImage: elm.dataset.displacement
    });
  })

  document.querySelectorAll('.loading-div').forEach(elm => {
    const imgs = Array.from(elm.querySelectorAll('img'));
    new LoadingDistortionEffect({
      parent: elm,
      image: imgs[0].getAttribute('src'),
      displacementImage: elm.dataset.displacement,
      intensity: elm.dataset.intensity || undefined,
      speed: elm.dataset.speed || undefined,

    });
  })

</script>

</html>