<?php 
$akordian_redux_demo = get_option('redux_demo');
get_header(); ?>
<?php 
while (have_posts()): the_post();
?>
<main>
	<section class="page active loaded fullwidth">

		<?php include_once('templates/header.php'); ?>
		
		<div class="content grid" style="display: block;">
			<div class="page-header c12">
				<h1 class="beta"><?php the_title(); ?></h1>
				<span class="toggle-sidebar"><i></i></span>
				<hr class="enabled">
			</div>
			<div class="blog-recent-post-item row">
				<div class="c12 end">
					<?php if (wp_get_attachment_url(get_post_thumbnail_id()) !='')  { ?>
						<img class="feature" src="<?php echo wp_get_attachment_url(get_post_thumbnail_id());?>"/>
					<?php } ?>
					<div class="entry-meta">
						<span>By <?php echo get_the_author_posts_link(); ?></span>
						<span><time class="entry-date"><?php the_time(get_option( 'date_format' ));?></time></span>
						<?php comments_number( esc_html__('0 Comments', 'akordian'), esc_html__('1 Comment', 'akordian'), esc_html__('% Comments', 'akordian') ); ?>
					</div>
					<?php the_content(); ?>
					<div class="entry-meta">
						<span class="cat-links">
							<?php echo  get_the_category_list();?>
						</span>
					</div>
				</div>
			</div>
			<?php comments_template(); ?>

			<?php if ( is_active_sidebar( 'sidebar-1' ) ){?>
				<div id="sidebar">
					<?php get_sidebar(); ?>
				</div>
			<?php } ?>

			<?php include_once('templates/footer.php'); ?>
		</div>
	</section>
</main>
<?php endwhile; ?>
<?php get_footer(); ?>