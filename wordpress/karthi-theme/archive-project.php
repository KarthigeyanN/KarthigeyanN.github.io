<?php
/**
 * Projects archive template.
 *
 * @package Karthi_Theme
 */

get_header();
?>

<div class="featured projects-archive">
	<div class="section-header">
		<h1><?php esc_html_e( 'Projects', 'karthi-theme' ); ?></h1>
		<p><?php esc_html_e( "Things I've built and contributed to", 'karthi-theme' ); ?></p>
	</div>

	<?php if ( have_posts() ) : ?>
		<div class="grid">
			<?php
			while ( have_posts() ) :
				the_post();
				$demo_url   = karthi_get_project_demo_url();
				$source_url = karthi_get_project_source_url();
				$tags       = get_the_terms( get_the_ID(), 'project_tag' );
				?>
				<div class="card">
					<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
					<p><?php echo esc_html( get_the_excerpt() ); ?></p>
					<?php if ( $tags && ! is_wp_error( $tags ) ) : ?>
						<div class="card-tags">
							<?php foreach ( $tags as $tag ) : ?>
								<span class="tag"><?php echo esc_html( $tag->name ); ?></span>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
					<div class="card-links">
						<?php if ( $demo_url ) : ?>
							<a href="<?php echo esc_url( $demo_url ); ?>" class="btn btn-sm"><?php esc_html_e( 'Live Demo', 'karthi-theme' ); ?> &rarr;</a>
						<?php endif; ?>
						<?php if ( $source_url ) : ?>
							<a href="<?php echo esc_url( $source_url ); ?>" class="btn btn-sm btn-outline"><?php esc_html_e( 'Source Code', 'karthi-theme' ); ?></a>
						<?php endif; ?>
					</div>
				</div>
				<?php
			endwhile;
			?>
		</div>

		<div class="pagination">
			<?php
			the_posts_pagination(
				array(
					'mid_size'  => 2,
					'prev_text' => '&larr;',
					'next_text' => '&rarr;',
				)
			);
			?>
		</div>
	<?php else : ?>
		<p><?php esc_html_e( 'No projects found.', 'karthi-theme' ); ?></p>
	<?php endif; ?>
</div>

<?php
get_footer();