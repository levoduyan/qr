<?php

$folder = __DIR__ .'/../temp/'.$_SESSION['csrf_token'].'/';

$nod = $main->get('nod');

if ($act == 'create') {
    $data_qr     = $main->post('data_qr');
    $is_batch    = $main->post('is_batch', 0);

    if (!file_exists($folder)) {
        mkdir($folder, 0777, true);
    }
    // else{
    //     // Xóa tất cả file trong thư mục temp
    //     $files = glob($folder . '*'); // Lấy tất cả file trong thư mục
    //     foreach ($files as $file) {
    //         if (is_file($file)) {
    //             unlink($file); // Xóa file
    //         }
    //     }
    // }

    if($is_batch){
        $lines = explode("\n", $data_qr);
        $qrList = [];

        if($lines && count($lines) > 0){

            foreach ($lines as $line) {
                $line = trim($line);
                
                if (!empty($line)) {
                    $fileName = $folder . md5($line) . ".png";
                    QRcode::png($line, $fileName, QR_ECLEVEL_L, 5);
                    $qrList[] = [
                        'text' => $line,
                        'file' => $_SESSION['csrf_token'] . '/' . md5($line) . ".png"
                    ];
                }
            }
        }

        echo 'done##', $main->toJsonData(200, 'success', $qrList);
    } else {

        $fileName = $folder . md5($data_qr) . ".png";

        QRcode::png($data_qr, $fileName, QR_ECLEVEL_L, 5);

        $generatedQR[] = [
            'text' => $data_qr,
            'file' => $_SESSION['csrf_token'] . '/' . md5($data_qr) . ".png"
        ];

        echo 'done##', $main->toJsonData(200, 'success', $generatedQR);
    }

} else {
    echo "Lỗi: Không tìm thấy hành động phù hợp!";
}