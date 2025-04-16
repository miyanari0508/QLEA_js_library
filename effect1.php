<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageEffect1">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <section>
      <div class="js_sunbeem" id="" data-src="<?php echo h($path_img) ?>/img1.jpg"></div>
      <div class="js_sunbeem" id="" data-src="<?php echo h($path_img) ?>/img3.jpg"></div>
    </section>
  </main>
</body>
<script src="<?php echo h($path_lib) ?>/kgl.js"></script>
<script src="<?php echo h($path_js) ?>/sunbeem.js"></script>

<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".js_sunbeem").forEach(elm => {
      const effect = new SunbeamEffect(elm);
      effect.init();
    })
  })
</script>

</html>