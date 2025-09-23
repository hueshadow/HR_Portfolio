<?php
$akordian_redux_demo = get_option('redux_demo');
get_header(); ?>
<main style="display: none;">
	<section class="page active loaded fullwidth">
		<div id="map" style="display:none"></div>

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
		</header>

		<div class="content grid" style="display: block;">
			<div class="notfound section-padding text-center">
				<div class="v-middle">
					<div class="row justify-content-center">
						<div class="c6">
							<h1>
								<?php if(isset($akordian_redux_demo['404_heading']) && $akordian_redux_demo['404_heading']!=''){?>
								<?php echo htmlspecialchars_decode(esc_attr($akordian_redux_demo['404_heading']));?>
								<?php }else{?>
								<?php echo esc_html__( '404', 'akordian' );
								}?>
							</h1>
							<h2>
								<?php if(isset($akordian_redux_demo['404_title']) && $akordian_redux_demo['404_title']!=''){?>
								<?php echo htmlspecialchars_decode(esc_attr($akordian_redux_demo['404_title']));?>
								<?php }else{?>
								<?php echo esc_html__( 'Page Not Found!', 'akordian' );
								}?>
							</h2>
							<span>
								<a href="<?php echo esc_url(home_url('/')); ?>">
									<?php if(isset($akordian_redux_demo['404_text_btn'])){?>
										<?php echo esc_attr($akordian_redux_demo['404_text_btn']);?>
									<?php }else{?>
										<?php echo esc_html__( 'Back to home', 'akordian' );?>
									<?php } ?>
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<?php get_footer(404); ?>