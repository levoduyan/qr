<?php

$base = __DIR__ . '/src/';

// 1. Load core trước
require_once $base . 'BarcodeGenerator.php';
require_once $base . 'BarcodeGeneratorPNG.php';

// 2. Load Interfaces trước
foreach (glob($base . 'Types/*Interface.php') as $file) {
    require_once $file;
}

// 3. Load các Type còn lại
foreach (glob($base . 'Types/*.php') as $file) {
    if (strpos($file, 'Interface')) continue;
    require_once $file;
}

// 4. Load phần còn lại (nếu có)
foreach (glob($base . '*.php') as $file) {
    if (strpos($file, 'BarcodeGenerator')) continue;
    require_once $file;
}