<?php include(dirname(__FILE__) . '/config.php'); ?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ja">
<!-- ____________________head____________________ -->

<head>
  <?php include(dirname(__FILE__) . '/gtm_h.php'); ?>

  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no">

  <title><?= h(str_replace(array("\r", "\n"), '', $title)) ?>｜ヘーベルハウス｜ハウスメーカー・住宅メーカー・注文住宅</title>

  <meta name="description" content="<?= h(str_replace(array("\r", "\n"), '', $description)) ?>">
  <link rel="canonical" href="<?= h($head_url) ?>/<?= h($page_url) ?>/">
  <meta name="keywords" content="土地,分譲,宅地,建築条件付き分譲戸建,ハウスメーカー,住宅メーカー,住宅展示場,モデルハウス,注文住宅,旭化成ホームズ,ヘーベルハウス,heabel haus,戸建">
  <meta name="robots" content="index, follow">

  <meta property="og:title" content="<?= h(str_replace(array("\r", "\n"), '', $title)) ?>">
  <meta property="og:description" content="<?= h(str_replace(array("\r", "\n"), '', $description)) ?>">
  <meta property="og:type" content="<?= h(str_replace(array("\r", "\n"), '', $og_type)) ?>">
  <meta property="og:url" content="<?= h(str_replace(array("\r", "\n"), '', $head_url)) ?>/<?= h(str_replace(array("\r", "\n"), '', $page_url)) ?> ">
  <meta property="og:image" content="<?= h(str_replace(array("\r", "\n"), '', $og_image)); ?>">
  <meta property="og:locale" content="ja_JP">
  <link rel="shortcut icon" href="https://www.asahi-kasei.co.jp/hebel/favicon.ico">
  <link rel="stylesheet" type="text/css" href="<?= h($path_css); ?>cat-bunjyo_project.css">
</head>
<!-- ____________________//head____________________ -->

<body id="<?= h($body_id) ?>" class="<?= h($body_class) ?>">
  <?php include(dirname(__FILE__) . '/gtm_b_top.php'); ?>