<?php

/**
 * サイト共通設定ファイル (config.php)
 * -----------------------------------------------------------
 * 1. 基本情報・SNS設定
 * 2. 外部リンク設定
 * 3. パス・URLの自動計算（基本編集不要）
 * 4. 共通関数
 * 5. パスワード認証設定
 * -----------------------------------------------------------
 */



session_start(); // セッション開始
/* ==========================================================================
   1. 基本情報・SNS設定 (各サイトに合わせて変更)
   ========================================================================== */
$site_name = "ヘーベルハウス";
$og_image  = "https://www.asahi-kasei.co.jp/hebel/common/img/bunjyo-project/ogp.jpg"; // 絶対パス推奨
$og_type   = "website"; // 下層ページで "article" に上書き可
$head_url  = "https://www.asahi-kasei.co.jp/hebel/lineup/bunjyo-project"; // canonical用

/* ==========================================================================
   2. 外部リンク設定
   ========================================================================== */
$link_request = "https://example.com/contact/"; // 資料請求
$link_reserve = "https://example.com/reserve/"; // 来場予約

/* ==========================================================================
   3. システム設定（基本はそのままでOK）
   ========================================================================== */

// --- 現在のURL・ルートURLの取得 ---
$protocol     = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://');
$host         = $_SERVER['HTTP_HOST'];
$uri          = explode('?', $_SERVER['REQUEST_URI'])[0];

$url          = $protocol . $host . $uri; // canonical用
$root_url     = $protocol . $host . '/';  // ファビコン等用

// --- ディレクトリ階層の判定 ($root) ---
// 特定のディレクトリ配下にある場合は "../"、それ以外は "./" をセット
$sub_dirs = [
   'limited',
   // 新しいディレクトリをここに追加
];

$root = './';

// 現在のアクセスURL（$uri）に、リストアップしたフォルダ名が含まれているかチェック
foreach ($sub_dirs as $dir) {
   // フォルダ名の前後をスラッシュで囲って判定することで、部分一致による誤作動を防ぎます
   if (strpos($uri, '/' . $dir . '/') !== false) {
      $root = '../';
      break;
   }
}
// --- 資産パスの設定 ---
$path_css = $root . 'assets/css/';
$path_js  = $root . 'assets/js/';
$path_js_page  = $root . 'assets/js/pages/';
$path_img = $root . 'assets/img/';
$path_lib = $root . 'assets/lib/';

// --- アイコンパスの設定 ---
$favicon_path          = $root_url . 'favicon.ico';
$apple_touch_icon_path = $root_url . 'apple-touch-icon.png';

/* ==========================================================================
   4. 共通関数
   ========================================================================== */

/**
 * エスケープ関数
 * 使用例: <?= h($title); ?>
 */
function h($s)
{
   return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
}

/* ==========================================================================
   5. パスワード認証設定
   ========================================================================== */

// --- パスワード認証設定 ---
$password = "test"; // 設定したいパスワード

// ログアウト処理（?logout=1 でアクセスした時）
if (isset($_GET['logout'])) {
   session_destroy();
   header('Location: ' . explode('?', $url)[0]);
   exit;
}

// 認証チェック
$is_authenticated = false;
if (isset($_SESSION['auth']) && $_SESSION['auth'] === $password) {
   $is_authenticated = true;
}

// フォームから送信された時の処理
if (isset($_POST['post_password'])) {
   if ($_POST['post_password'] === $password) {
      $_SESSION['auth'] = $password;
      header('Location: ' . $url); // リロードして認証済み状態にする
      exit;
   } else {
      $auth_error = "パスワードが正しくありません。";
   }
}
