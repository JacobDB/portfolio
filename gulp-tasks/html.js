// JavaScript Document

// Scripts written by Jacob Bearce @ https://jacob.rocks/

module.exports = {
    html(gulp, plugins, custom_notifier, ran_tasks, on_error) {
        // copy binaries
        const COPY_BINARIES = (html_directory, source = [`${global.settings.paths.src}/**/*`, `!${global.settings.paths.src}{/assets,/assets/**}`, `!${global.settings.paths.src}/**/*.{jpg,png,svg}`]) => {
            return gulp.src(source)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // check if source is newer than destination
                .pipe(plugins.gulpif(!plugins.argv.dist, plugins.newer(html_directory)))
                // check if a file is a binary
                .pipe(plugins.is_binary())
                // skip file if it's not a binary
                .pipe(plugins.through.obj((file, enc, next) => {
                    if (!file.isBinary()) {
                        next();
                        return;
                    }

                    // go to next file
                    next(null, file);
                }))
                // output to compiled directory
                .pipe(gulp.dest(html_directory));
        };

        // copy composer
        const COPY_COMPOSER = (html_directory, source = [`${global.settings.paths.vendor}/**/*`]) => {
            return gulp.src(source)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // check if source is newer than destination
                .pipe(plugins.gulpif(!plugins.argv.dist, plugins.newer(`${html_directory}/functions`)))
                // output to compiled directory
                .pipe(gulp.dest(`${html_directory}/functions`));
        };

        // process HTML
        const PROCESS_HTML = (html_directory, source = [`${global.settings.paths.src}/**/*`, `${global.settings.paths.src}/**/.*`, `!${global.settings.paths.src}{/assets,/assets/**}`, `!${global.settings.paths.src}/**/*.{jpg,png,svg}`]) => {
            return gulp.src(source)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // check if source is newer than destination
                .pipe(plugins.gulpif(!plugins.argv.dist, plugins.newer(html_directory)))
                // check if file is a binary
                .pipe(plugins.is_binary())
                // skip file if it's a binary
                .pipe(plugins.through.obj((file, enc, next) => {
                    if (file.isBinary()) {
                        next();
                        return;
                    }

                    // go to next file
                    next(null, file);
                }))
                // output to compiled directory
                .pipe(gulp.dest(html_directory));
        };

        // html task, copies binaries, converts includes & variables in HTML
        return new Promise ((resolve) => {
            // set HTML directory
            const HTML_DIRECTORY = plugins.argv.dist ? global.settings.paths.dist : global.settings.paths.dev;

            // process all non-asset files
            const BINARIES = COPY_BINARIES(HTML_DIRECTORY);
            const COMPOSER = COPY_COMPOSER(HTML_DIRECTORY);
            const HTML     = PROCESS_HTML(HTML_DIRECTORY);

            // merge both steams back in to one
            plugins.merge(BINARIES, COMPOSER, HTML)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // notify that task is complete, if not part of default or watch
                .pipe(plugins.gulpif(plugins.argv._.includes("html"), plugins.notify({
                    appIcon:  plugins.path.resolve("./src/assets/media/logo-favicon.png"),
                    title:    "Success!",
                    message:  "HTML task complete!",
                    notifier: process.env.BURNTTOAST === "true" ? custom_notifier : false,
                    onLast:   true,
                })))
                // push task to ran_tasks array
                .on("data", () => {
                    // mark the task as ran
                    if (!ran_tasks.includes("html")) {
                        ran_tasks.push("html");
                    }
                })
                .on("end", () => {
                    resolve();
                });
        });
    }
};
