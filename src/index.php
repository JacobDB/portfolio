<?php
define("KOSHER", true);

$page_slug = isset($_GET["page"]) ? $_GET["page"] : "front-page";
$page_meta = json_decode(file_get_contents("pages/{$page_slug}/meta.json"));

include("functions.php");
include("partials/header.php");
include("pages/{$page_slug}/content.php");
include("partials/footer.php");
