<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageTop">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <section>
      <ul>
        <li>
          <a href="<?php echo h($path) ?>/effect1.php">
            エフェクト：太陽光ゆらゆら
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect2.php">
            エフェクト：雲の中から現れ
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect3.php">
            エフェクト：波紋
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect4.php">
            エフェクト：画像表示
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect5.php">
            キラキラ
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect6.php">
            マウスオーバー波紋
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect7.php">
            背景切り替え
          </a>
        </li>
      </ul>
    </section>
  </main>
</body>

</html>