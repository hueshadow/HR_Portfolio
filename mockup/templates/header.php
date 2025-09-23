<header>
	<span class="toggle-nav"><i></i></span>
	<div class="logo-page">
		<a href="<?php echo esc_url(home_url('/')); ?>">
			<?php if (isset($akordian_redux_demo['logo_light']['url']) && $akordian_redux_demo['logo_light']['url'] != '') {?>
				<img src="<?php echo esc_url($akordian_redux_demo['logo_light']['url']); ?>" alt="<?php bloginfo( 'name' ); ?>">
			<?php } else{ ?>
				<img src="<?php echo get_template_directory_uri();?>/assets/img/logo.png" alt="<?php bloginfo( 'name' ); ?>">
			<?php } ?>
		</a>
	</div>
	<?php if(isset($akordian_redux_demo['enabled_social']) && $akordian_redux_demo['enabled_social'] == true){ ?>
		<ul class="social">
			<?php if (isset($akordian_redux_demo['social_1']) && $akordian_redux_demo['social_1'] != ''): ?>
				<li>
					<?php echo $akordian_redux_demo['social_1']; ?>
				</li>
			<?php endif ?>
			<?php if (isset($akordian_redux_demo['social_2']) && $akordian_redux_demo['social_2'] != ''): ?>
				<li>
					<?php echo $akordian_redux_demo['social_2']; ?>
				</li>
			<?php endif ?>
			<?php if (isset($akordian_redux_demo['social_3']) && $akordian_redux_demo['social_3'] != ''): ?>
				<li>
					<?php echo $akordian_redux_demo['social_3']; ?>
				</li>
			<?php endif ?>
			<?php if (isset($akordian_redux_demo['social_4']) && $akordian_redux_demo['social_4'] != ''): ?>
				<li>
					<?php echo $akordian_redux_demo['social_4']; ?>
				</li>
			<?php endif ?>
		</ul>
	<?php } ?>
</header>