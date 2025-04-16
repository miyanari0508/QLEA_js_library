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
            エフェクト1
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect2.php">
            エフェクト2
          </a>
        </li>
        <li>
          <a href="<?php echo h($path) ?>/effect3.php">
            エフェクト3
          </a>
        </li>
      </ul>
    </section>
  </main>
</body>

</html>