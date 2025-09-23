<?php
/*
 * Template Name: Home Akordian Template
 * Description: A Page Template with a Page Builder design.
 */
$akordian_redux_demo = get_option('redux_demo');
get_header('home'); ?>
<main style="display: none;">
	<?php if (have_posts()){ ?>
		<?php while (have_posts()) : the_post()?>
			<?php the_content(); ?>
			<?php endwhile; ?>
		<?php }else {
		echo esc_html__( 'Home Akordian Templates', 'akordian' );
	}?>
</main>
<?php get_footer(); ?>