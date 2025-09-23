<?php $akordian_redux_demo = get_option('redux_demo'); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta property="og:title" content="">
	<meta property="og:type" content="">
	<meta property="og:url" content="">
	<meta property="og:image" content="">
	<link rel="preload" href="wp-content/themes/akordian/assets/img/background.jpg" as="image">
	<?php if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) {?>
	<link rel="icon" href="<?php if(isset($akordian_redux_demo['favicon']['url'])){?><?php echo esc_url($akordian_redux_demo['favicon']['url']); ?><?php }?>">
	<?php }?> 
	<?php wp_head(); ?>
</head>
<body class="single-post">
	<div class="mouse regular"><div></div></div>
	<nav class="mobile-nav">
		<?php 
			wp_nav_menu( 
			array( 
				'theme_location'  => 'primary',
				'container'       => '',
				'menu_class'      => '',
				'menu_id'         => '',
				'menu'            => '',
				'container_class' => '',
				'container_id'    => '',
				'echo'            => true,
				'fallback_cb'     => 'wp_bootstrap_navwalker::fallback',
				// 'walker'          => new akordian_wp_bootstrap_navwalker(),
				'before'          => '',
				'after'           => '',
				'link_before'     => '',
				'link_after'      => '',
				'items_wrap'      => '<ul  class="%2$s">%3$s</ul>',
				'depth'           => 0,        
			)
		); ?>
	</nav>
