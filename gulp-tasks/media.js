// JavaScript Document

// Scripts written by Jacob Bearce @ https://jacob.rocks/

module.exports = {
    media(gulp, plugins, custom_notifier, ran_tasks, on_error) {
        // task-specific plugins
        const IMAGEMIN = require("gulp-imagemin");
        const WEBP     = require("gulp-webp");

        // media task, compresses images, copies other media
        return new Promise ((resolve) => {
            // set media directory
            const MEDIA_DIRECTORY = plugins.argv.dist ? global.settings.paths.dist : global.settings.paths.dev;

            // copy fonts
            const COPY_FONTS = gulp.src(`${global.settings.paths.src}/assets/media/fonts/**/*.{otf,ttf,woff,woff2}`)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // check if source is newer than destination
                .pipe(plugins.gulpif(!plugins.argv.dist, plugins.newer(`${MEDIA_DIRECTORY}/assets/media/fonts`, { extra: [`${MEDIA_DIRECTORY}/assets/media/fonts/**/*.{otf,ttf,woff,woff2}`] })))
                // output to compiled directory
                .pipe(gulp.dest(`${MEDIA_DIRECTORY}/assets/media/fonts`));

            // process images
            const PROCESS_IMAGES = gulp.src(`${global.settings.paths.src}/**/*.{jpg,png,svg,webp}`)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // check if source is newer than destination
                .pipe(plugins.gulpif(!plugins.argv.dist, plugins.newer(MEDIA_DIRECTORY)))
                // compress images
                .pipe(IMAGEMIN([
                    IMAGEMIN.jpegtran({
                        progressive: true
                    }),
                    IMAGEMIN.svgo({
                        plugins: [
                            { cleanupIDs: false },
                            { removeViewBox: false },
                        ],
                    }),
                ]))
                // output to compiled directory
                .pipe(gulp.dest(MEDIA_DIRECTORY));

            // process images
            const GENERATE_WEBP = gulp.src(`${global.settings.paths.src}/**/*.{jpg,png}`)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // check if source is newer than destination
                .pipe(plugins.gulpif(!plugins.argv.dist, plugins.newer(MEDIA_DIRECTORY)))
                // generate WebP
                .pipe(WEBP())
                // output to compiled directory
                .pipe(gulp.dest(MEDIA_DIRECTORY));

            // merge both streams back in to one
            plugins.merge(COPY_FONTS, PROCESS_IMAGES, GENERATE_WEBP)
                // prevent breaking on error
                .pipe(plugins.plumber({ errorHandler: on_error }))
                // notify that task is complete, if not part of default or watch
                .pipe(plugins.gulpif(plugins.argv._.includes("media"), plugins.notify({
                    appIcon:  plugins.path.resolve("./src/assets/media/logo-favicon.png"),
                    title:    "Success!",
                    message:  "Media task complete!",
                    notifier: process.env.BURNTTOAST === "true" ? custom_notifier : false,
                    onLast:   true,
                })))
                // push task to ran_tasks array
                .on("data", () => {
                    if (!ran_tasks.includes("media")) {
                        ran_tasks.push("media");
                    }
                })
                .on("end", () => {
                    resolve();
                });
        });
    }
};
