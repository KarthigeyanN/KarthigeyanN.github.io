<?php
/**
 * Single project template.
 *
 * @package Karthi_Theme
 */

get_header();
?>

<article <?php post_class( 'project-page' ); ?>>
	<h1><?php the_title(); ?></h1>

	<?php
	$demo_url   = karthi_get_project_demo_url();
	$source_url = karthi_get_project_source_url();
	$tags       = get_the_terms( get_the_ID(), 'project_tag' );
	?>

	<?php if ( $tags && ! is_wp_error( $tags ) ) : ?>
		<div class="project-tags">
			<?php foreach ( $tags as $tag ) : ?>
				<span class="tag"><?php echo esc_html( $tag->name ); ?></span>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

	<p class="project-desc"><?php echo esc_html( get_the_excerpt() ); ?></p>

	<?php if ( $demo_url || $source_url ) : ?>
		<div class="project-links">
			<?php if ( $demo_url ) : ?>
				<a href="<?php echo esc_url( $demo_url ); ?>" class="btn btn-primary"><?php esc_html_e( 'Live Demo', 'karthi-theme' ); ?> &rarr;</a>
			<?php endif; ?>
			<?php if ( $source_url ) : ?>
				<a href="<?php echo esc_url( $source_url ); ?>" class="btn btn-outline"><?php esc_html_e( 'Source Code', 'karthi-theme' ); ?></a>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="demo-frame entry-content">
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
get_footer();