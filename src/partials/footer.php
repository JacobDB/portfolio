<?php if (!defined("KOSHER")) { http_response_code(403); die("Forbidden"); } ?>

            <div class="footer-block" role="contentinfo">
                <div class="footer__inner">
                    <nav class="footer__icon-list__container icon-list__container">
                        <?php include("partials/icon-list.php"); ?>
                    </nav>
                </div>
            </div>

        </div><!--/.page__container-->

        <?php if (isset($scripts["core"])): ?><script defer="defer" src="<?php echo strip_server_path($scripts["core"]); ?>" type="text/javascript"></script><?php endif; ?>

        <?php if (isset($scripts["fontawesome"])): ?><script defer="defer" src="<?php echo strip_server_path($scripts["fontawesome"]); ?>" type="text/javascript"></script><?php endif; ?>

        <?php if (isset($scripts["service-worker"])): ?><script type="text/javascript">
            if ("serviceWorker" in navigator) {
                window.addEventListener("load", function () {
                    navigator.serviceWorker.register("/assets/scripts/service-worker.js", { scope: "/" }).then(function (registration) {
                        // attempt to update the service worker
                        registration.update();
                    });
                });
            }
        </script><?php endif; ?>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-25595621-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-25595621-1');
        </script>

    </body>

</html>
