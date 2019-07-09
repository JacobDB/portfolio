<?php if (!defined("KOSHER")) { http_response_code(403); die("Forbidden"); } ?>

<!doctype html>

<html class="no-javascript" lang="en-US">

    <head>

        <?php if ($page_meta->title): ?><title><?php echo $page_meta->title; ?></title><?php endif; ?>

        <?php if ($page_meta->description): ?><meta content="<?php echo $page_meta->description; ?>" name="description" /><?php endif; ?>

        <?php if ($page_meta->robots): ?><meta content="<?php echo $page_meta->robots; ?>" name="robots" /><?php endif; ?>

        <meta content="text/html;charset=utf-8" http-equiv="content-type" />
        <meta content="width=device-width, initial-scale=1, viewport-fit=cover" name="viewport" />

        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />

        <meta content="#005ECB" name="theme-color" />
        <meta content="#005ECB" name="msapplication-navbutton-color" />

        <link href="/assets/media/favicon.png" rel="shortcut icon" />
        <link color="#005ECB" href="/assets/media/safari/mask-icon.svg" rel="mask-icon" />
        <link href="/assets/media/ios/touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
        <link href="/assets/media/ios/touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
        <link href="/assets/media/ios/touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/assets/media/ios/touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/assets/media/ios/touch-icon-1024x1024.png" rel="apple-touch-icon" sizes="1024x1024" />

        <link href="/manifest.json" rel="manifest" />

        <?php if (isset($styles["core"])): ?><style type="text/css"><?php echo file_get_contents($styles["core"]); ?></style><?php endif; ?>

    </head>

    <body>

        <div class="page__container" id="page-container">

            <?php if ($page_meta->intro !== false): ?>
                <div class="header-block" role="banner">
                    <div class="header__inner">

                        <h1 class="header__titlet title">Jacob Bearce</h1>

                        <p class="header__text text">I'm a Chicago-based front-end developer with over 10 years of experience working with varying platforms. I specialize in fully custom, accessible, and highly performant WordPress themes, with a focus on progressive web app features.</p>

                        <p class="header__text text">Currently Lead Developer at <a class="text__link link" href="https://www.weblinxinc.com/" rel="noopener" target="_blank">Weblinx, Inc.</a></p>

                        <nav class="header__icon-list__container icon-list__container">
                            <?php include("partials/icon-list.php"); ?>
                        </nav>

                        <hr class="header__divider divider" />

                    </div>
                </div><!--/.header-block-->
            <?php endif; ?>
