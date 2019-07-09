<?php if (!defined("KOSHER")) { http_response_code(403); die("Forbidden"); } ?>

<?php
$projects = json_decode(file_get_contents("pages/front-page/projects.json"));
$posts    = json_decode(file_get_contents("https://dev.to/api/articles?username=jacobdb"));
?>

<?php if ($projects || $posts): ?>
    <div class="content-block">
        <div class="content__inner">

            <?php if ($projects) :?>

                <h2 class="content__title title title--h2">Featured Projects</h2>

                <div class="content__featured-projects featured-projects">
                    <?php foreach ($projects as $project): ?>
                        <article class="featured-projects__project project">

                            <?php if ($project->image): ?>
                                <figure class="project__figure">

                                    <?php if ($project->link): ?>
                                        <a class="project__link link" href="<?php echo $project->link->url; ?>" rel="noopener"<?php if ($project->link->target): ?> target="<?php echo $project->link->target; ?>"<?php endif; ?><?php if ($project->link->title): ?> title="<?php echo $project->link->title; ?>"<?php endif; ?>>
                                    <?php endif; ?>

                                    <img alt="<?php echo $project->image->alt; ?>" class="project__image" src="<?php echo $project->image->src->{"1x"}; ?>" srcset="<?php echo $project->image->src->{"1x"}; ?> 1x, <?php echo $project->image->src->{"2x"}; ?> 2x, <?php echo $project->image->src->{"3x"}; ?> 3x" loading="lazy" />

                                    <?php if ($project->link): ?>
                                        </a>
                                    <?php endif; ?>

                                </figure>
                            <?php endif; ?>

                            <div class="project__content">

                                <?php if ($project->title): ?>
                                    <header class="project__header">
                                        <h3 class="project__title title title--h3">

                                            <?php if ($project->link): ?>
                                                <a class="title__link link" href="<?php echo $project->link->url; ?>" rel="noopener"<?php if ($project->link->target): ?> target="<?php echo $project->link->target; ?>"<?php endif; ?><?php if ($project->link->title): ?> title="<?php echo $project->link->title; ?>"<?php endif; ?>>
                                            <?php endif; ?>

                                            <?php echo $project->title; ?>

                                            <?php if ($project->link): ?>
                                                </a>
                                            <?php endif; ?>

                                        </h3>
                                    </header>
                                <?php endif; ?>

                                <?php if ($project->description): ?>
                                    <p class="project__text text">
                                        <?php echo $project->description; ?>
                                    </p>
                                <?php endif; ?>

                                <?php if ($project->link): ?>
                                    <p class="project__text text">
                                        <a class="project__link link" href="<?php echo $project->link->url; ?>" rel="noopener"<?php if ($project->link->target): ?> target="<?php echo $project->link->target; ?>"<?php endif; ?>>
                                            <?php
                                            if ($project->link->title) {
                                                echo $project->link->title;
                                            } else {
                                                echo "Visit Site &rarr;";
                                            }
                                            ?>
                                        </a>
                                    </p>
                                <?php endif; ?>

                                <?php if ($project->tags): ?>
                                    <ul class="project__tag-list tag-list">
                                        <?php foreach ($project->tags as $tag): ?>
                                            <li class="tag-list__item">
                                                <?php echo $tag; ?>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>

                            </div><!--/.project__content-->

                        </article><!--/.featured-projects__project-->
                    <?php endforeach; // ($projects as $project) ?>
                </div><!--/.content__featured-projects-->

                <p class="content__text text" style="text-align:center;">
                    <a class="text__link link" href="/projects.txt" target="_blank">
                        View full projects list
                    </a>
                </p>

            <?php endif; // ($projects) ?>

            <?php if ($posts): ?>

                <h2 class="content__title title title--h2">Latest Posts</h2>

                <?php foreach ($posts as $post): ?>
                    <article class="content__article article">
                        <header class="article__header">

                            <h3 class="article__title title title--h3">
                                <a class="title__link link" href="<?php echo $post->url; ?>" rel="noopener" target="_blank">
                                    <?php echo $post->title; ?>
                                </a>
                            </h3>

                            <ul class="article__meta-list meta-list">

                                <?php $date = new DateTime($post->published_at); ?>

                                <li class="meta-list__item">
                                    <a class="meta-list__link link" href="<?php echo $post->url; ?>" rel="noopener" target="_blank">
                                        <time datetime="<?php echo $date->format("c"); ?>">
                                            <i class="meta-list__icon fas fa-clock"></i>
                                            <span class="__visuallyhidden">Posted on</span>
                                            <?php echo $date->format("M j Y"); ?>
                                        </time>
                                    </a>
                                </li>

                                <li class="meta-list__item">
                                    <a class="meta-list__link link" href="<?php echo $post->url; ?>#reaction-butt-like" rel="noopener" target="_blank">
                                        <i class="meta-list__icon fas fa-heart"></i>
                                        <?php echo $post->positive_reactions_count; ?>
                                        <span class="__visuallyhidden">Likes</span>
                                    </a>
                                </li>

                                <li class="meta-list__item">
                                    <a class="meta-list__link link" href="<?php echo $post->url; ?>#comments" rel="noopener" target="_blank">
                                        <i class="meta-list__icon fas fa-comment"></i>
                                        <?php echo $post->comments_count; ?>
                                        <span class="__visuallyhidden">Comments</span>
                                    </a>
                                </li>

                            </ul><!--/.article__meta-list-->

                        </header><!--/.article__header-->
                    </article><!--/.content__article-->
                <?php endforeach; //($posts as $post) ?>

                <hr class="content__divider divider" />

            <?php endif; // ($posts) ?>

        </div><!--/.content__inner-->
    </div><!--/.content-block-->
<?php endif; // ($projects || $posts) ?>
