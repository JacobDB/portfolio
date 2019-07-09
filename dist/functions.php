<?php
if (!defined("KOSHER")) { http_response_code(403); die("Forbidden"); }

$styles  = array();
$scripts = array();

if ($styles_core = glob("{$_SERVER["DOCUMENT_ROOT"]}/assets/styles/core.*.css")) {
    $styles["core"] = $styles_core[0];
}

if ($scripts_core = glob("{$_SERVER["DOCUMENT_ROOT"]}/assets/scripts/core.*.js")) {
    $scripts["core"] = $scripts_core[0];
}

if ($scripts_fontawesome = glob("{$_SERVER["DOCUMENT_ROOT"]}/assets/scripts/fontawesome.*.js")) {
    $scripts["fontawesome"] = $scripts_fontawesome[0];
}

if ($scripts_service_worker = glob("{$_SERVER["DOCUMENT_ROOT"]}/assets/scripts/service-worker.js")) {
    $scripts["service-worker"] = $scripts_service_worker[0];
}

function strip_server_path($path) {
    return str_replace($_SERVER["DOCUMENT_ROOT"], "", $path);
}
