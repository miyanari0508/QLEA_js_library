<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageEffect2">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <section>
      <div class="fog_wrap">
        <div class="js_fog">
          <img src="<?php echo h($path_img) ?>/img2.jpg">
        </div>
      </div>
    </section>
  </main>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="<?php echo h($path_lib) ?>/pixi.js"></script>
<script src="<?php echo h($path_js) ?>/fog.js"></script>

<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".js_fog").forEach(elm => {
      const fogEffect = new FogEffect(elm);
      fogEffect.init();
      fogEffect.animateEffect("start");
    })
  })


</script>

</html>