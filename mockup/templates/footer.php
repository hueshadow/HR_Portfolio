<?php
$wp_query = new \WP_Query(array('post_type' => 'footer'));
while($wp_query->have_posts()): $wp_query->the_post();
?>
	<?php the_content(); ?>
<?php endwhile; ?>