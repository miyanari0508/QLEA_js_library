<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageEffect10">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <div class="slider" id="slider">
      <div class="track" id="track">
        <div class="slide">
          <div class="slide-bg">
            <img src="<?php echo h($path_img) ?>/effect10/img_01.png" alt="">
          </div>
          <div class="slide-content">
            <h3>TEXT TEXT TEXT TEXT TEXT<br>TEXT TEXT TEXT TEXT TEXT TEXT</h3>
            <p>text text text text text text text text text text text text text text text text text text text text text text</p>
          </div>
        </div>
        <div class="slide">
          <div class="slide-bg">
            <img src="<?php echo h($path_img) ?>/effect10/img_02.png" alt="">
          </div>
          <div class="slide-content">
            <h3>TEXT TEXT TEXT TEXT TEXT<br>TEXT TEXT TEXT TEXT TEXT TEXT</h3>
            <p>text text text text text text text text text text text text text text text text text text text text text text</p>
          </div>
        </div>
        <div class="slide">
          <div class="slide-bg">
            <img src="<?php echo h($path_img) ?>/effect10/img_03.png" alt="">
          </div>
          <div class="slide-content">
            <h3>TEXT TEXT TEXT TEXT TEXT<br>TEXT TEXT TEXT TEXT TEXT TEXT</h3>
            <p>text text text text text text text text text text text text text text text text text text text text text text</p>
          </div>
        </div>
        <div class="slide">
          <div class="slide-bg">
            <img src="<?php echo h($path_img) ?>/effect10/img_04.png" alt="">
          </div>
          <div class="slide-content">
            <h3>TEXT TEXT TEXT TEXT TEXT<br>TEXT TEXT TEXT TEXT TEXT TEXT</h3>
            <p>text text text text text text text text text text text text text text text text text text text text text text</p>
          </div>
        </div>
        <div class="slide">
          <div class="slide-bg">
            <img src="<?php echo h($path_img) ?>/effect10/img_05.png" alt="">
          </div>
          <div class="slide-content">
            <h3>TEXT TEXT TEXT TEXT TEXT<br>TEXT TEXT TEXT TEXT TEXT TEXT</h3>
            <p>text text text text text text text text text text text text text text text text text text text text text text</p>
          </div>
        </div>
        <div class="slide">
          <div class="slide-bg">
            <img src="<?php echo h($path_img) ?>/effect10/img_06.png" alt="">
          </div>
          <div class="slide-content">
            <h3>TEXT TEXT TEXT TEXT TEXT<br>TEXT TEXT TEXT TEXT TEXT TEXT</h3>
            <p>text text text text text text text text text text text text text text text text text text text text text text</p>
          </div>
        </div>
      </div>

      <div class="cursor-btn" id="cursorBtn" aria-hidden="true">Next</div>
      <button class="nav-btn nav-prev" id="navPrev" type="button" aria-label="Previous">&#8249;</button>
      <button class="nav-btn nav-next" id="navNext" type="button" aria-label="Next">&#8250;</button>
    </div>
  </main>
</body>
<script src="<?php echo h($path_js) ?>/effect10.js"></script>

</html>