<?php

$folder = '/../temp/';

$nod = $main->get('nod');

if ($act == 'create') {
    $data_qr = $main->post('data_qr');
    $create_more = $main->post('create_more');

    $lines = explode("\n", $data_qr);
    $qrList = [];

    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);
    }
    else{
        // Xóa tất cả file trong thư mục temp
        $files = glob($folder . '*'); // Lấy tất cả file trong thư mục
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file); // Xóa file
            }
        }
    }

    if($lines && count($lines) > 0){

        foreach ($lines as $line) {
            $line = trim($line);
            
            if (!empty($line)) {
                $fileName = $folder . md5($line) . ".png";
                QRcode::png($line, $fileName, QR_ECLEVEL_L, 10);
                $qrList[] = [
                    'text' => $line,
                    'file' => $fileName
                ];
            }
        }

        echo 'done##', $main->toJsonData(200, 'success', $qrList);
    }
    
} else {
    echo "Lỗi: Không tìm thấy hành động phù hợp!";
}