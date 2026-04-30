<?php
$dir = __DIR__ . '/../temp';
$now = time();
$expire = 1 * 60 * 60; // 1 tiếng

function deleteOldFiles($dir, $now, $expire) {
    if (!is_dir($dir)) return;

    $files = scandir($dir);

    foreach ($files as $file) {
        if ($file == '.' || $file == '..') continue;

        $filePath = $dir . '/' . $file;

        if (is_dir($filePath)) {
            // Gọi đệ quy vào thư mục con
            deleteOldFiles($filePath, $now, $expire);

            // Sau khi xóa file bên trong, nếu thư mục rỗng thì xóa luôn
            if (count(scandir($filePath)) == 2) {
                rmdir($filePath);
                error_log("Cronjob Cleanup: Đã xóa thư mục rỗng: $filePath");
            }
        } else {
            $fileTime = filemtime($filePath);

            if (($now - $fileTime) >= $expire) {
                unlink($filePath);
                error_log("Cronjob Cleanup: Đã xóa file: $filePath");
            }
        }
    }
}

// chạy
deleteOldFiles($dir, $now, $expire);