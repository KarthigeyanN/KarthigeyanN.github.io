<?php
/**
 * Main blog index template.
 *
 * @package Karthi_Theme
 */

get_header();
?>

<div class="blog-list">
	<h1><?php esc_html_e( 'Blog', 'karthi-theme' ); ?></h1>

	<?php if ( have_posts() ) : ?>
		<ul class="post-list">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<li>
					<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					<span class="post-meta"><?php echo esc_html( get_the_date() ); ?></span>
				</li>
				<?php
			endwhile;
			?>
		</ul>

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
		<p><?php esc_html_e( 'No posts yet. Check back soon!', 'karthi-theme' ); ?></p>
	<?php endif; ?>
</div>

<?php
get_footer();