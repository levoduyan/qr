<?php

$models = __DIR__ . '/src';
$routeFiles = scandir($models);
foreach ($routeFiles as $routeFile) {
    $routeFilePath = $models . '/' . $routeFile;
    if (is_file($routeFilePath) && preg_match('/^.*\.(php)$/i', $routeFilePath))
        require_once $routeFilePath;
}
