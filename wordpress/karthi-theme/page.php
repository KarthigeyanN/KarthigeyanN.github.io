<?php
/**
 * Default page template.
 *
 * @package Karthi_Theme
 */

get_header();
?>

<div class="page-content">
	<h1><?php the_title(); ?></h1>

	<div class="entry-content">
		<?php
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
		?>
	</div>
</div>

<?php
get_footer();