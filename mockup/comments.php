<?php
/**
 * The template for displaying Comments.
 *
 * The area of the page that contains comments and the comment form.
 * If the current post is protected by a password and the visitor has not yet
 * entered the password we will return early without loading the comments.
 */
if ( post_password_required() )
		return;
?>
<div id="comments" class="comments-area">
<?php if ( have_comments() ) : ?>
	<div class="row">
		<div class="c12 end">
			<h4 class="total-comment"><?php comments_number( esc_html__('0 Comments', 'akordian'), esc_html__('1 Comment', 'akordian'), esc_html__('% Comments', 'akordian') ); ?></h4>
		</div>
	</div>
	<div class="row">
		<div class="c12 end">
			<ul class="commentlist">
				<?php wp_list_comments('callback=akordian_theme_comment'); ?>
			</ul>
		</div>
	</div>
<?php endif; ?>
<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
?>
	<div class="text-center">
		<ul class="pagination">
			<li>
				<?php
				paginate_comments_links( array(
					'prev_text' => wp_specialchars_decode('<i class="ti-angle-left"></i>',ENT_QUOTES), 
					'next_text' => wp_specialchars_decode('<i class="ti-angle-right"></i>',ENT_QUOTES)
				));?>
			</li>
		</ul>
	</div>
<?php endif;?>
<?php
	if ( is_singular() ) wp_enqueue_script( "comment-reply" );
			$aria_req = ( $req ? " aria-required='true'" : '' );
			$comment_args = array(
				'id_form' => 'commentform',
				'class_form' => 'comment-form',
				'title_reply'=>esc_html__( 'Leave A Comment', 'akordian' ),
				'title_reply_before' =>'<div class="row"><div class="c12 end"><h3 id="reply-title" class="comment-reply-title">',
				'title_reply_after' => '</h3></div></div>',
				'fields' => apply_filters( 'comment_form_default_fields', array(

						'author' 	=> '<div class="row"><div class="c4"><input id="author" name="author" type="text" placeholder="'.esc_attr__('Name(Required)', 'akordian').'" value="" size="30" aria-required="true"></div>',

						'email'		=> '<div class="c4"><input id="email" name="email" type="text" placeholder="'.esc_attr__('Email(Required)', 'akordian').'" value="" size="30" aria-required="true"></div>',

						'website'	=> '<div class="c4 end"><input id="url" name="url" type="text" placeholder="'.esc_attr__('Website', 'akordian').'" value="" size="30"></div></div>',

				) ),
					'comment_field' => '<div class="row"><div class="c12 end"><textarea id="message" name="comment" placeholder="'.esc_attr__('Leave A Comment', 'akordian').'" cols="45" rows="8" aria-required="true"></textarea></div></div>', 
				'label_submit' => esc_html__( 'Post A Comment', 'akordian' ),
				'submit_button' => '<div class="row"><div class="c2 %3$s"><button>%4$s</button></div></div>',
				'submit_field' => '%1$s %2$s',
				'comment_notes_before' => '',
				'comment_notes_after' => '',
		)
?>
<?php if ( comments_open() ) : ?>
<?php comment_form($comment_args); ?>
<?php endif; ?> 
</div>