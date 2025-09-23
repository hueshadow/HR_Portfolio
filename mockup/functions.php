<?php 
$akordian_redux_demo = get_option('redux_demo');
require_once get_template_directory() . '/framework/widget/recent-post.php';
require_once get_template_directory() . '/framework/wp_bootstrap_navwalker.php';
require_once get_template_directory() . '/framework/class-ocdi-importer.php';
function akordian_theme_setup(){  
/*
 * This theme uses a custom image size for featured images, displayed on
 * "standard" posts and pages.
 */
	add_theme_support( 'custom-header' );
	add_theme_support( 'custom-background' );
	$lang = get_template_directory_uri() . '/languages';
	load_theme_textdomain('akordian', $lang);
	add_theme_support( 'post-thumbnails' ); 
	add_filter('wpcf7_autop_or_not', '__return_false');
	// Adds RSS feed links to <head> for posts and comments.
	add_theme_support( 'automatic-feed-links' );
	// Switches default core markup for search form, comment form, and comments
	// to output valid HTML5.
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list' ) );
	// This theme uses wp_nav_menu() in one location. 
	register_nav_menus( array(
	'primary' 		=>  esc_html__( 'Single Navigation Menu.', 'akordian' ),
	'home' 			=>  esc_html__( 'Home Navigation Menu.', 'akordian' ),
	'page' 			=>  esc_html__( 'Other Page Navigation Menu.', 'akordian' ),
	));
}
add_action( 'after_setup_theme', 'akordian_theme_setup' );
if ( ! isset( $content_width ) ) $content_width = 900;
function akordian_theme_scripts_styles(){
	$akordian_redux_demo = get_option('redux_demo');
	$protocol = is_ssl() ? 'https' : 'http';
	wp_enqueue_style('lineicons', get_template_directory_uri().'/assets/css/vendor/lineicons.css');
	wp_enqueue_style('magnific-popup', get_template_directory_uri().'/assets/css/vendor/magnific-popup.css');
	wp_enqueue_style('imagehover', get_template_directory_uri().'/assets/css/vendor/imagehover.css');
	wp_enqueue_style('leaflet', get_template_directory_uri().'/assets/css/vendor/leaflet.css');
	wp_enqueue_style('akordian-main', get_template_directory_uri().'/assets/css/main.css');
	wp_enqueue_style('fontawesome', get_template_directory_uri().'/assets/font-awesome/css/all.min.css');

	wp_enqueue_style('akordian-css', get_stylesheet_uri(), array(), '2023-08-02');
	if(isset($akordian_redux_demo['chosen-color']) && $akordian_redux_demo['chosen-color'] == true){
	wp_enqueue_style( 'color', get_template_directory_uri().'/framework/color.php');
	}
	wp_enqueue_style( 'googlefonts-1', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans&family=Space+Mono:wght@400;700', array(), null );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) )
	wp_enqueue_script( 'comment-reply' );
	wp_enqueue_script( 'jquery');
	wp_enqueue_script('akordian-jquery', get_template_directory_uri().'/assets/js/jquery-3.6.4.min.js', array(), false, true);
	wp_enqueue_script('akordian-plugins', get_template_directory_uri().'/assets/js/plugins.js', array(), false, true);
	wp_enqueue_script('typed', get_template_directory_uri().'/assets/js/typed.min.js', array(), false, true);
	wp_enqueue_script('tiny-slider', get_template_directory_uri().'/assets/js/tiny-slider.min.js', array(), false, true);
	wp_enqueue_script('shuffle', get_template_directory_uri().'/assets/js/shuffle.min.js', array(), false, true);
	wp_enqueue_script('magnific-popup', get_template_directory_uri().'/assets/js/magnific-popup.min.js', array(), false, true);
	wp_enqueue_script('number-to-work', get_template_directory_uri().'/assets/js/convert-number-to-words.min.js', array(), false, true);
	wp_enqueue_script('visible', get_template_directory_uri().'/assets/js/visible.min.js', array(), false, true);
	wp_enqueue_script('leaflet', get_template_directory_uri().'/assets/js/leaflet.js', array(), false, true);
	wp_enqueue_script('akordian-main', get_template_directory_uri().'/assets/js/main.js', array(), false, true);
	if(is_page_template('page-templates/home.php'))
	{
		wp_enqueue_script('akordian-menu', get_template_directory_uri().'/assets/js/mobilenav-home.js', array(), false, true);
	}
}
add_action( 'wp_enqueue_scripts', 'akordian_theme_scripts_styles' );
// Widget Sidebar
function akordian_widgets_init() 
{
	register_sidebar( array(
		'name'          => esc_html__( 'Primary Sidebar', 'akordian' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Appears in the sidebar section of the site.', 'akordian' ),
		'before_widget' => '<aside class="%2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>'
	) );
}
add_action( 'widgets_init', 'akordian_widgets_init' );
function akordian_search_form( $form ) {
	$form = '
		<form role="search" id="searchform" class="searchform">
			<div>
				<input type="text" name="s" placeholder="'.esc_attr__('Search for:', 'akordian').'" value="' . get_search_query() . '">
				<button type="submit"><i class="lni lni-search-alt"></i></button>
			</div>
		</form>
	';
	return $form;
}
add_filter( 'get_search_form', 'akordian_search_form' );
// Comment Form
function akordian_theme_comment($comment, $args, $depth) {
	$GLOBALS['comment'] = $comment; ?> 
	<?php
	if(get_avatar($comment,$size='44' )!=''){?>
		<li class="comment even thread-odd thread-alt depth-1">
			<article class="comment">
				<span class="comment-avartar" style="background:url(<?php echo get_avatar_url($comment ); ?>) no-repeat center center;"></span>
				<div class="comment-holder">
					<div class="comment-header">
						<cite class="fn"><?php printf( get_comment_author_link()) ?></cite>
						<time><?php comment_date(get_option( 'date_format' )); ?></time>
					</div>
					<div class="comment-text">
						<p><?php comment_text(); ?></p>
						<?php comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
					</div>
				</div>
			</article>
		</li>
	<?php }else{?>
		<li class="comment even thread-odd thread-alt depth-1">
			<article class="comment">
				<div class="comment-holder">
					<div class="comment-header">
						<cite class="fn"><?php printf( get_comment_author_link()) ?></cite>
						<time><?php comment_date(get_option( 'date_format' )); ?></time>
					</div>
					<div class="comment-text">
						<p><?php comment_text(); ?></p>
						<?php comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
					</div>
				</div>
			</article>
		</li>
<?php }?>
<?php
}
function akordian_excerpt() {
	$akordian_redux_demo = get_option('redux_demo');
	if(isset($akordian_redux_demo['blog_excerpt'])){
	$limit = $akordian_redux_demo['blog_excerpt'];
	}else{
	$limit = 80;
	}
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt)>=$limit) {
	array_pop($excerpt);
	$excerpt = implode(" ",$excerpt).'...';
	} else {
	$excerpt = implode(" ",$excerpt);
	}
	$excerpt = preg_replace('`[[^]]*]`','',$excerpt);
	return $excerpt;
}
function akordian_pagination($pages='') {
	global $wp_query, $wp_rewrite;
	$wp_query->query_vars['paged'] > 1 ? $current = $wp_query->query_vars['paged'] : $current = 1;
	if($pages==''){
		global $wp_query;
		 $pages = $wp_query->max_num_pages;
		 if(!$pages)
		 {
			 $pages = 1;
		 }
	}
	$pagination = array(
		'base'          => str_replace( 999999999, '%#%', get_pagenum_link( 999999999 ) ),
		'format'        => '',
		'current'       => max( 1, get_query_var('paged') ),
		'total'         => $pages,
		'prev_text'     => wp_specialchars_decode('<i class="fas fa-angle-left"></i>',ENT_QUOTES),
		'next_text'     => wp_specialchars_decode('<i class="fas fa-angle-right"></i>',ENT_QUOTES),
		'type'          => 'list',
		'end_size'      => 3,
		'mid_size'      => 3
);
	$return = paginate_links( $pagination );
	echo str_replace( "<ul class='page-numbers'>", '<ul class="blog-pagination-wrap text-center mb-60">', $return );
}


/**
 * This file represents an example of the code that themes would use to register
 * the required plugins.
 *
 * It is expected that theme authors would copy and paste this code into their
 * functions.php file, and amend to suit.
 *
 * @package    TGM-Plugin-Activation
 * @subpackage Example
 * @version    2.6.1
 * @author     Thomas Griffin <thomasgriffinmedia.com>
 * @author     Gary Jones <gamajo.com>
 * @copyright  Copyright (c) 2014, Thomas Griffin
 * @license    http://opensource.org/licenses/gpl-2.0.php GPL v2 or later
 * @link       https://github.com/thomasgriffin/TGM-Plugin-Activation
 */
/**
 * Include the TGM_Plugin_Activation class.
 */
require_once get_template_directory() . '/framework/class-tgm-plugin-activation.php';
add_action( 'tgmpa_register', 'akordian_theme_register_required_plugins' );
/**
 * Register the required plugins for this theme.
 *
 * In this example, we register two plugins - one included with the TGMPA library
 * and one from the .org repo.
 *
 * The variable passed to tgmpa_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into tgmpa_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */
function akordian_theme_register_required_plugins(){
	/**
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(
		// This is an example of how to include a plugin from the WordPress Plugin Repository.
		array(
            'name'      => esc_html__( 'One Click Demo Import', 'akordian' ),
            'slug'      => 'one-click-demo-import',
            'required'  => true,
        ), 
      array(
            'name'      => esc_html__( 'Classic Editor', 'akordian' ),
            'slug'      => 'classic-editor',
            'required'  => true,
        ), 
      array(
            'name'      => esc_html__( 'Classic Widgets', 'akordian' ),
            'slug'      => 'classic-widgets',
            'required'  => true,
        ),
      array(
            'name'      => esc_html__( 'Widget Importer & Exporter', 'akordian' ),
            'slug'      => 'widget-importer-&-exporter',
            'required'  => true,
        ), 
      array(
            'name'      => esc_html__( 'Contact Form 7', 'akordian' ),
            'slug'      => 'contact-form-7',
            'required'  => true,
        ), 
      array(
            'name'      => esc_html__( 'SVG Support', 'akordian' ),
            'slug'      => 'svg-support',
            'required'  => true,
        ), 
      array(
            'name'      => esc_html__( 'WP Maximum Execution Time Exceeded', 'akordian' ),
            'slug'      => 'wp-maximum-execution-time-exceeded',
            'required'  => true,
        ), 
      array(
            'name'                     => esc_html__( 'Elementor', 'akordian' ),
            'slug'                     => 'elementor',
            'required'                 => true,
            'source'                   => get_template_directory() . '/framework/plugins/elementor.zip',
        ),
      array(
            'name'                     => esc_html__( 'Akordian Common', 'akordian' ),
            'slug'                     => 'akordian-common',
            'required'                 => true,
            'source'                   => get_template_directory() . '/framework/plugins/akordian-common.zip',
        ),
      array(
            'name'                     => esc_html__( 'Akordian Elementor', 'akordian' ),
            'slug'                     => 'akordian-elementor',
            'required'                 => true,
            'source'                   => get_template_directory() . '/framework/plugins/akordian-elementor.zip',
        ),
	);
	/**
	 * Array of configuration settings. Amend each line as needed.
	 * If you want the default strings to be available under your own theme domain,
	 * leave the strings uncommented.
	 * Some of the strings are added into a sprintf, so see the comments at the
	 * end of each line for what each argument will be.
	 */
	$config = array(
		'default_path' => '',                      // Default absolute path to pre-packaged plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.
		'strings'      => array(
			'page_title'                      => esc_html__( 'Install Required Plugins', 'akordian' ),
			'menu_title'                      => esc_html__( 'Install Plugins', 'akordian' ),
			'installing'                      => esc_html__( 'Installing Plugin: %s', 'akordian' ), // %s = plugin name.
			'oops'                            => esc_html__( 'Something went wrong with the plugin API.', 'akordian' ),
			'notice_can_install_required'     => _n_noop( 'This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'akordian' ), // %1$s = plugin name(s).
			'notice_can_install_recommended'  => _n_noop( 'This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.', 'akordian' ), // %1$s = plugin name(s).
			'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'akordian' ), // %1$s = plugin name(s).
			'notice_can_activate_required'    => _n_noop( 'The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'akordian' ), // %1$s = plugin name(s).
			'notice_can_activate_recommended' => _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'akordian' ), // %1$s = plugin name(s).
			'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'akordian' ), // %1$s = plugin name(s).
			'notice_ask_to_update'            => _n_noop( 'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'akordian' ), // %1$s = plugin name(s).
			'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'akordian' ), // %1$s = plugin name(s).
			'install_link'                    => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'akordian' ),
			'activate_link'                   => _n_noop( 'Begin activating plugin', 'Begin activating plugins', 'akordian' ),
			'return'                          => esc_html__( 'Return to Required Plugins Installer', 'akordian' ),
			'plugin_activated'                => esc_html__( 'Plugin activated successfully.', 'akordian' ),
			'complete'                        => esc_html__( 'All plugins installed and activated successfully. %s', 'akordian' ), // %s = dashboard link.
			'nag_type'                        => 'updated' // Determines admin notice type - can only be 'updated', 'update-nag' or 'error'.
		)
	);
	tgmpa( $plugins, $config );
}
?>