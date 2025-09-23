<?php
$akordian_redux_demo = get_option('redux_demo');
get_header('page'); ?>
<main>
	<section class="page active loaded fullwidth" id="blog">
		<div id="map" style="display:none"></div>
		
		<?php include_once('templates/header.php'); ?>

		<div class="content grid" style="display: block;">
			<div class="page-header c12">
				<h1 data-value="Blog">Blog</h1>
				<span class="toggle-sidebar"><i></i></span>
				<hr>
			</div>
			<?php  
			$wp_query = new \WP_Query(array('post_type' => 'post','paged' => $paged,  'orderby' => 'ID', 'order' => 'ASC'));
			while($wp_query->have_posts()): $wp_query->the_post();
				$blog_content = get_post_meta(get_the_ID(),'_cmb_content_excerpt_1', true);
			?>
				<div class="blog-recent-post-item row">
					<div class="c12 end">
						<?php if (wp_get_attachment_url(get_post_thumbnail_id()) !='')  { ?>
							<a class="recent-post-img" href="<?php the_permalink(); ?>">
								<img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id());?>" alt="<?php the_title(); ?>">
								<span class="date"><span class="day"><?php echo get_the_date('j'); ?></span> <?php echo get_the_date('F Y'); ?></span>
							</a>
						<?php } ?>
						<h2 class="gamma entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<p>
							<?php if ( '' !== wp_specialchars_decode($blog_content)): ?>
								<?php print wp_specialchars_decode($blog_content); ?>
							<?php else:?>
								<?php if(isset($akordian_redux_demo['blog_excerpt'])){?>
								<?php echo esc_attr(akordian_excerpt($akordian_redux_demo['blog_excerpt'])); ?>
								<?php }else{?>
								<?php echo esc_attr(akordian_excerpt(80)); 
								}?>
							<?php endif ?>
						</p>
						<div class="entry-meta">
							<span>By <?php echo get_the_author_posts_link(); ?></span>
							<span><time class="entry-date"><?php the_time(get_option( 'date_format' ));?></time></span>
							<span class="cat-links">
								<?php echo  get_the_category_list();?>
							</span>
							<?php comments_number( esc_html__('0 Comments', 'akordian'), esc_html__('1 Comment', 'akordian'), esc_html__('% Comments', 'akordian') ); ?>
							<a class="readmore" href="<?php the_permalink(); ?>">Read more</a>
						</div>
					</div>
				</div>
			<?php endwhile; ?>
			<div class="c12">
				<?php akordian_pagination(); ?>
			</div>
			<?php if ( is_active_sidebar( 'sidebar-1' ) ){?>
				<div id="sidebar">
					<?php get_sidebar(); ?>
				</div>
			<?php } ?>
			<?php include_once('templates/footer.php'); ?>

		</div><!--END CONTENT-->
	</section><!--END BLOG--> 
</main>
<?php get_footer(); ?>