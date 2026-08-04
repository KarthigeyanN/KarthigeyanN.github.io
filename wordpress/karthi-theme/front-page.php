<?php
/**
 * Front page template (hero + featured projects).
 *
 * @package Karthi_Theme
 */

get_header();
?>

<section class="hero">
	<h1><?php bloginfo( 'name' ); ?></h1>
	<p class="tagline"><?php echo esc_html( get_bloginfo( 'description' ) ); ?></p>
	<p class="subtitle">Building elegant solutions at the intersection of software engineering and scientific thinking. Passionate about clean code, machine learning, and open source.</p>

	<?php
	$projects_url = get_post_type_archive_link( 'project' );
	$about_page   = get_page_by_path( 'about' );
	$blog_page    = get_page_by_path( 'blog' );
	$about_url    = $about_page ? get_permalink( $about_page->ID ) : home_url( '/about/' );
	$blog_url     = $blog_page ? get_permalink( $blog_page->ID ) : home_url( '/blog/' );
	?>
	<div class="hero-buttons">
		<a href="<?php echo esc_url( $projects_url ); ?>" class="btn btn-primary"><?php esc_html_e( 'View Projects', 'karthi-theme' ); ?> &rarr;</a>
		<a href="<?php echo esc_url( $about_url ); ?>" class="btn"><?php esc_html_e( 'About Me', 'karthi-theme' ); ?></a>
		<a href="<?php echo esc_url( $blog_url ); ?>" class="btn btn-outline"><?php esc_html_e( 'Read Blog', 'karthi-theme' ); ?></a>
	</div>
</section>

<section class="featured">
	<div class="section-header">
		<h2><?php esc_html_e( 'Featured Projects', 'karthi-theme' ); ?></h2>
		<p><?php esc_html_e( 'Some of my recent work and side projects', 'karthi-theme' ); ?></p>
	</div>

	<?php
	$projects_query = new WP_Query(
		array(
			'post_type'      => 'project',
			'posts_per_page' => 6,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);

	if ( $projects_query->have_posts() ) :
		?>
		<div class="grid">
			<?php
			while ( $projects_query->have_posts() ) :
				$projects_query->the_post();
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
			wp_reset_postdata();
			?>
		</div>
	<?php else : ?>
		<p><?php esc_html_e( 'No projects found. Add projects from the WordPress admin.', 'karthi-theme' ); ?></p>
	<?php endif; ?>
</section>

<?php
get_footer();