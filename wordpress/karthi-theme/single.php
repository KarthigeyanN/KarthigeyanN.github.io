<?php
/**
 * Single post template.
 *
 * @package Karthi_Theme
 */

get_header();
?>

<article <?php post_class( 'post' ); ?>>
	<h1><?php the_title(); ?></h1>
	<p class="meta">
		<span><?php echo esc_html( get_the_date() ); ?></span>
		<?php if ( has_category() ) : ?>
			<span>&middot;</span>
			<span><?php the_category( ', ' ); ?></span>
		<?php endif; ?>
	</p>

	<div class="content entry-content">
		<?php
		the_content();

		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'karthi-theme' ),
				'after'  => '</div>',
			)
		);
		?>
	</div>
</article>

<?php
if ( comments_open() || get_comments_number() ) :
	?>
	<div class="comments-area">
		<?php comments_template(); ?>
	</div>
	<?php
endif;

get_footer();