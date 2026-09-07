<?php

if ($act == 'csrf') {

    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    echo 'done##', $main->toJsonData(200, 'success', ['csrf_token' => $_SESSION['csrf_token']]);
}