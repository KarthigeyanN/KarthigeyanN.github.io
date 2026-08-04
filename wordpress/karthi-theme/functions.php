<?php
/**
 * Karthi Portfolio theme functions and definitions.
 *
 * @package Karthi_Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KARTHI_THEME_VERSION', '1.0.0' );

/**
 * Theme setup.
 */
function karthi_theme_setup() {
	load_theme_textdomain( 'karthi-theme', get_template_directory() . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'karthi-theme' ),
		)
	);
}
add_action( 'after_setup_theme', 'karthi_theme_setup' );

/**
 * Enqueue scripts and styles.
 */
function karthi_theme_scripts() {
	// Google Fonts.
	wp_enqueue_style(
		'karthi-google-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
		array(),
		null
	);

	// Theme stylesheet.
	wp_enqueue_style(
		'karthi-theme-style',
		get_stylesheet_uri(),
		array( 'karthi-google-fonts' ),
		KARTHI_THEME_VERSION
	);

	// Theme toggle JS.
	wp_enqueue_script(
		'karthi-theme-js',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		KARTHI_THEME_VERSION,
		true
	);

	// Particles JS.
	wp_enqueue_script(
		'karthi-particles-js',
		get_template_directory_uri() . '/assets/js/particles.js',
		array(),
		KARTHI_THEME_VERSION,
		true
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'karthi_theme_scripts' );

/**
 * Register the Projects custom post type.
 */
function karthi_register_projects_cpt() {
	$labels = array(
		'name'               => __( 'Projects', 'karthi-theme' ),
		'singular_name'      => __( 'Project', 'karthi-theme' ),
		'menu_name'          => __( 'Projects', 'karthi-theme' ),
		'name_admin_bar'     => __( 'Project', 'karthi-theme' ),
		'add_new'            => __( 'Add New', 'karthi-theme' ),
		'add_new_item'       => __( 'Add New Project', 'karthi-theme' ),
		'new_item'           => __( 'New Project', 'karthi-theme' ),
		'edit_item'          => __( 'Edit Project', 'karthi-theme' ),
		'view_item'          => __( 'View Project', 'karthi-theme' ),
		'all_items'          => __( 'All Projects', 'karthi-theme' ),
		'search_items'       => __( 'Search Projects', 'karthi-theme' ),
		'not_found'          => __( 'No projects found.', 'karthi-theme' ),
		'not_found_in_trash' => __( 'No projects found in Trash.', 'karthi-theme' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'projects', 'with_front' => false ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'menu_icon'          => 'dashicons-portfolio',
		'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions' ),
		'show_in_rest'       => true,
	);

	register_post_type( 'project', $args );

	// Project tags taxonomy.
	register_taxonomy(
		'project_tag',
		'project',
		array(
			'label'             => __( 'Project Tags', 'karthi-theme' ),
			'rewrite'           => array( 'slug' => 'project-tag' ),
			'hierarchical'      => false,
			'show_in_rest'      => true,
			'show_admin_column' => true,
		)
	);
}
add_action( 'init', 'karthi_register_projects_cpt' );

/**
 * Add custom meta boxes for project demo URL and source URL.
 */
function karthi_add_project_meta_boxes() {
	add_meta_box(
		'karthi_project_links',
		__( 'Project Links', 'karthi-theme' ),
		'karthi_render_project_meta_box',
		'project',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'karthi_add_project_meta_boxes' );

/**
 * Render the project links meta box.
 *
 * @param WP_Post $post The post object.
 */
function karthi_render_project_meta_box( $post ) {
	wp_nonce_field( 'karthi_project_meta', 'karthi_project_meta_nonce' );

	$demo_url   = get_post_meta( $post->ID, '_karthi_demo_url', true );
	$source_url = get_post_meta( $post->ID, '_karthi_source_url', true );
	?>
	<p>
		<label for="karthi_demo_url"><strong><?php esc_html_e( 'Live Demo URL', 'karthi-theme' ); ?></strong></label><br>
		<input type="url" id="karthi_demo_url" name="karthi_demo_url" value="<?php echo esc_attr( $demo_url ); ?>" class="widefat" placeholder="https://example.com/demo">
	</p>
	<p>
		<label for="karthi_source_url"><strong><?php esc_html_e( 'Source Code URL', 'karthi-theme' ); ?></strong></label><br>
		<input type="url" id="karthi_source_url" name="karthi_source_url" value="<?php echo esc_attr( $source_url ); ?>" class="widefat" placeholder="https://github.com/user/repo">
	</p>
	<?php
}

/**
 * Save project meta box data.
 *
 * @param int $post_id The post ID.
 */
function karthi_save_project_meta( $post_id ) {
	if ( ! isset( $_POST['karthi_project_meta_nonce'] ) ||
		! wp_verify_nonce( sanitize_key( $_POST['karthi_project_meta_nonce'] ), 'karthi_project_meta' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['karthi_demo_url'] ) ) {
		update_post_meta( $post_id, '_karthi_demo_url', esc_url_raw( wp_unslash( $_POST['karthi_demo_url'] ) ) );
	}

	if ( isset( $_POST['karthi_source_url'] ) ) {
		update_post_meta( $post_id, '_karthi_source_url', esc_url_raw( wp_unslash( $_POST['karthi_source_url'] ) ) );
	}
}
add_action( 'save_post_project', 'karthi_save_project_meta' );

/**
 * Seed default content on theme activation.
 */
function karthi_theme_activate() {
	// Only seed once.
	if ( get_option( 'karthi_theme_seeded' ) ) {
		return;
	}

	// 1. Create pages.
	$pages = array(
		'home'    => array(
			'title'   => 'Home',
			'content' => '',
			'template' => 'front-page.php',
		),
		'about'   => array(
			'title'   => 'About',
			'content' => karthi_about_page_content(),
		),
		'blog'    => array(
			'title'   => 'Blog',
			'content' => '',
		),
		'contact' => array(
			'title'   => 'Contact',
			'content' => karthi_contact_page_content(),
		),
	);

	$created_pages = array();

	foreach ( $pages as $slug => $page ) {
		$existing = get_page_by_path( $slug );
		if ( $existing ) {
			$created_pages[ $slug ] = $existing->ID;
			continue;
		}

		$page_id = wp_insert_post(
			array(
				'post_title'   => $page['title'],
				'post_content' => $page['content'],
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_name'    => $slug,
			)
		);

		if ( $page_id && ! is_wp_error( $page_id ) ) {
			if ( ! empty( $page['template'] ) ) {
				update_post_meta( $page_id, '_wp_page_template', $page['template'] );
			}
			$created_pages[ $slug ] = $page_id;
		}
	}

	// 2. Set front page and posts page.
	if ( isset( $created_pages['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $created_pages['home'] );
	}
	if ( isset( $created_pages['blog'] ) ) {
		update_option( 'page_for_posts', $created_pages['blog'] );
	}

	// 3. Create the primary menu and assign it.
	$menu_name = 'Primary Menu';
	$menu      = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu ) {
		$menu_id = wp_create_nav_menu( $menu_name );
	} else {
		$menu_id = $menu->term_id;
	}

	if ( $menu_id && ! is_wp_error( $menu_id ) ) {
		$menu_items = array(
			'home'     => array(
				'title'  => 'Home',
				'type'   => 'custom',
				'url'    => home_url( '/' ),
			),
			'projects' => array(
				'title'  => 'Projects',
				'type'   => 'post_type_archive',
				'object' => 'project',
			),
			'blog'     => array(
				'title'     => 'Blog',
				'type'      => 'post_type',
				'object'    => 'page',
				'object_id' => isset( $created_pages['blog'] ) ? $created_pages['blog'] : 0,
			),
			'about'    => array(
				'title'     => 'About',
				'type'      => 'post_type',
				'object'    => 'page',
				'object_id' => isset( $created_pages['about'] ) ? $created_pages['about'] : 0,
			),
			'contact'  => array(
				'title'     => 'Contact',
				'type'      => 'post_type',
				'object'    => 'page',
				'object_id' => isset( $created_pages['contact'] ) ? $created_pages['contact'] : 0,
			),
		);

		foreach ( $menu_items as $key => $item ) {
			// Skip if already in menu.
			$existing_items = wp_get_nav_menu_items( $menu_id );
			$found          = false;
			if ( $existing_items ) {
				foreach ( $existing_items as $existing_item ) {
					if ( $existing_item->title === $item['title'] ) {
						$found = true;
						break;
					}
				}
			}
			if ( $found ) {
				continue;
			}

			$menu_item_data = array(
				'menu-item-title'  => $item['title'],
				'menu-item-status' => 'publish',
			);

			if ( 'custom' === $item['type'] ) {
				$menu_item_data['menu-item-type']   = 'custom';
				$menu_item_data['menu-item-url']    = $item['url'];
				$menu_item_data['menu-item-object'] = 'custom';
			} elseif ( 'post_type_archive' === $item['type'] ) {
				$menu_item_data['menu-item-type']   = 'post_type_archive';
				$menu_item_data['menu-item-object'] = $item['object'];
				$menu_item_data['menu-item-url']    = get_post_type_archive_link( $item['object'] );
			} elseif ( 'post_type' === $item['type'] ) {
				$menu_item_data['menu-item-type']      = 'post_type';
				$menu_item_data['menu-item-object']    = $item['object'];
				$menu_item_data['menu-item-object-id'] = $item['object_id'];
				$menu_item_data['menu-item-url']       = get_permalink( $item['object_id'] );
			}

			wp_update_nav_menu_item( $menu_id, 0, $menu_item_data );
		}

		// Assign menu to primary location.
		$locations            = get_theme_mod( 'nav_menu_locations', array() );
		$locations['primary'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	// 4. Seed projects.
	karthi_seed_projects();

	// 5. Seed blog posts.
	karthi_seed_posts();

	// 6. Mark as seeded.
	update_option( 'karthi_theme_seeded', 1 );

	// 7. Flush rewrite rules so the /projects/ archive URL resolves.
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'karthi_theme_activate' );

/**
 * Force the Projects menu item to always point to the live project archive.
 *
 * This runs at render time, so the link is correct regardless of what's
 * stored in the database. It fixes menus created by v1.0.0 (hardcoded
 * custom URLs) and any menu item that was accidentally linked to the
 * Blog page instead of the Projects archive.
 *
 * @param array $items Menu items.
 * @return array
 */
function karthi_fix_projects_menu_link( $items ) {
	foreach ( $items as $item ) {
		$is_projects_archive = ( 'post_type_archive' === $item->type && 'project' === $item->object );
		$is_projects_title   = ( 'Projects' === $item->title );

		if ( $is_projects_archive || $is_projects_title ) {
			$archive_url = get_post_type_archive_link( 'project' );
			if ( $archive_url ) {
				$item->url = $archive_url;
			}
		}
	}
	return $items;
}
add_filter( 'wp_nav_menu_objects', 'karthi_fix_projects_menu_link' );

/**
 * Repair seeded menu links.
 *
 * Upgrades menus that were created by v1.0.0 with hardcoded custom URLs
 * to native WordPress menu items (post_type_archive for Projects, and
 * post_type page links for Blog/About/Contact). Runs once on admin_init.
 */
function karthi_repair_menu_links() {
	$installed_version = get_option( 'karthi_theme_version', '1.0.0' );
	if ( version_compare( $installed_version, '1.0.2', '>=' ) ) {
		return;
	}

	$menu_name = 'Primary Menu';
	$menu      = wp_get_nav_menu_object( $menu_name );

	if ( $menu && ! is_wp_error( $menu ) ) {
		$items = wp_get_nav_menu_items( $menu->term_id );

		if ( $items ) {
			foreach ( $items as $item ) {
				$item_data = false;

				switch ( $item->title ) {
					case 'Home':
						$item_data = array(
							'menu-item-title'  => 'Home',
							'menu-item-status' => 'publish',
							'menu-item-type'   => 'custom',
							'menu-item-object' => 'custom',
							'menu-item-url'    => home_url( '/' ),
						);
						break;

					case 'Projects':
						// Convert to a post_type_archive item pointing at the project CPT.
						// This also fixes items that were accidentally created as a
						// page link to the Blog page.
						$item_data = array(
							'menu-item-title'  => 'Projects',
							'menu-item-status' => 'publish',
							'menu-item-type'   => 'post_type_archive',
							'menu-item-object' => 'project',
							'menu-item-url'    => get_post_type_archive_link( 'project' ),
						);
						break;

					case 'Blog':
						$page = get_page_by_path( 'blog' );
						if ( $page ) {
							$item_data = array(
								'menu-item-title'     => 'Blog',
								'menu-item-status'    => 'publish',
								'menu-item-type'      => 'post_type',
								'menu-item-object'    => 'page',
								'menu-item-object-id' => $page->ID,
								'menu-item-url'       => get_permalink( $page->ID ),
							);
						}
						break;

					case 'About':
						$page = get_page_by_path( 'about' );
						if ( $page ) {
							$item_data = array(
								'menu-item-title'     => 'About',
								'menu-item-status'    => 'publish',
								'menu-item-type'      => 'post_type',
								'menu-item-object'    => 'page',
								'menu-item-object-id' => $page->ID,
								'menu-item-url'       => get_permalink( $page->ID ),
							);
						}
						break;

					case 'Contact':
						$page = get_page_by_path( 'contact' );
						if ( $page ) {
							$item_data = array(
								'menu-item-title'     => 'Contact',
								'menu-item-status'    => 'publish',
								'menu-item-type'      => 'post_type',
								'menu-item-object'    => 'page',
								'menu-item-object-id' => $page->ID,
								'menu-item-url'       => get_permalink( $page->ID ),
							);
						}
						break;
				}

				if ( $item_data ) {
					wp_update_nav_menu_item( $menu->term_id, $item->ID, $item_data );
				}
			}
		}
	}

	update_option( 'karthi_theme_version', '1.0.2' );
}
add_action( 'admin_init', 'karthi_repair_menu_links' );

/**
 * Seed the Projects custom post type with default content.
 */
function karthi_seed_projects() {
	$projects = array(
		array(
			'title'       => 'ML Model Explorer',
			'description' => 'ML Model Explorer - Solubility Prediction using Machine Learning techniques.',
			'tags'        => array( 'RDKit', 'ML models', 'JavaScript & Python' ),
			'demo_url'    => home_url( '/projects/ml-model-explorer/' ),
			'source_url'  => 'https://github.com/KarthigeyanN/ML-modex',
			'content'     => '<p>An interactive solubility prediction tool built with RDKit and machine learning. Draw or paste a SMILES string, compute descriptors on the fly, and get an instant solubility prediction.</p>',
		),
		array(
			'title'       => '3D Molecular Viewer',
			'description' => 'Interactive 3D visualization tool for exploring molecular structures.',
			'tags'        => array( 'Python', 'Node.js', 'Three.js' ),
			'demo_url'    => home_url( '/projects/3d-molecular-viewer/' ),
			'source_url'  => 'https://github.com/KarthigeyanN/molViewer',
			'content'     => '<p>An interactive 3D visualization tool for exploring molecular structures, built with Three.js.</p>',
		),
		array(
			'title'       => 'fpocket-rewritten',
			'description' => 'A modern C++ rewrite of the fpocket2 protein pocket detection program.',
			'tags'        => array( 'C++', 'CGAL/Boost library', 'CMake' ),
			'demo_url'    => '',
			'source_url'  => 'https://github.com/KarthigeyanN/fpocket-rewritten',
			'content'     => '<p>A modern C++ rewrite of the fpocket2 protein pocket detection program, leveraging CGAL and Boost libraries.</p>',
		),
		array(
			'title'       => 'synthecomb',
			'description' => 'Combinatorial library generation and analysis tool for drug discovery.',
			'tags'        => array( 'Python', 'RDKit', 'flask' ),
			'demo_url'    => '',
			'source_url'  => 'https://github.com/KarthigeyanN/synthecomb',
			'content'     => '<p>A combinatorial library generation and analysis tool for drug discovery, built with Python, RDKit, and Flask.</p>',
		),
	);

	foreach ( $projects as $project ) {
		$existing = get_page_by_path( sanitize_title( $project['title'] ), OBJECT, 'project' );
		if ( $existing ) {
			continue;
		}

		$post_id = wp_insert_post(
			array(
				'post_title'   => $project['title'],
				'post_content' => $project['content'],
				'post_excerpt' => $project['description'],
				'post_status'  => 'publish',
				'post_type'    => 'project',
			)
		);

		if ( $post_id && ! is_wp_error( $post_id ) ) {
			if ( ! empty( $project['demo_url'] ) ) {
				update_post_meta( $post_id, '_karthi_demo_url', $project['demo_url'] );
			}
			if ( ! empty( $project['source_url'] ) ) {
				update_post_meta( $post_id, '_karthi_source_url', $project['source_url'] );
			}
			if ( ! empty( $project['tags'] ) ) {
				wp_set_object_terms( $post_id, $project['tags'], 'project_tag' );
			}
		}
	}
}

/**
 * Seed default blog posts.
 */
function karthi_seed_posts() {
	$posts = array(
		array(
			'title'   => 'Welcome to My Blog',
			'date'    => '2026-07-17 10:00:00',
			'content' => "Welcome to my personal blog! This is where I'll be sharing my thoughts on software engineering, machine learning, system design, and everything in between.\n\n## What to Expect\n\nI plan to write about:\n\n- **Software Architecture** — Clean code, design patterns, and system design\n- **Machine Learning** — Models, training pipelines, and production ML\n- **DevOps & Infrastructure** — Docker, Kubernetes, CI/CD, and cloud\n- **Open Source** — Contributions, side projects, and lessons learned\n\nStay tuned for more content coming soon!\n\n---\n\n*\"The best way to predict the future is to invent it.\"* — Alan Kay",
		),
		array(
			'title'   => 'Predicting Solubility with Machine Learning',
			'date'    => '2026-07-30 10:00:00',
			'content' => "In this post I'll walk through my ML Model Explorer project — a solubility prediction tool built with RDKit and machine learning.\n\n## Why Solubility?\n\nAqueous solubility is one of the most important physicochemical properties in drug discovery. It affects absorption, distribution, and formulation. Being able to predict it from molecular structure alone can save a lot of time and cost in early-stage screening.\n\n## Approach\n\n1. **Data** — A dataset of molecules labeled with experimental solubility values\n2. **Features** — Computed RDKit fingerprints and molecular descriptors\n3. **Model** — Trained regression models (Random Forest, Gradient Boosting) to map structure to solubility\n4. **Evaluation** — Root mean squared error and R² on a held-out test set\n\n## Demo\n\nThe interactive demo lets you draw or paste a SMILES string, compute descriptors on the fly, and get an instant solubility prediction.\n\nCheck out the live demo and the source code from the [Projects page](/projects).",
		),
	);

	foreach ( $posts as $post ) {
		$existing = get_page_by_path( sanitize_title( $post['title'] ), OBJECT, 'post' );
		if ( $existing ) {
			continue;
		}

		wp_insert_post(
			array(
				'post_title'   => $post['title'],
				'post_content' => $post['content'],
				'post_status'  => 'publish',
				'post_type'    => 'post',
				'post_date'    => $post['date'],
			)
		);
	}
}

/**
 * Default About page content.
 *
 * @return string
 */
function karthi_about_page_content() {
	return '<div class="about-content">
  <h1>About Me</h1>

  <div class="about-text">
    <p>I\'m Karthi — an engineer, developer, and scientific thinker based in the United States. I build software that sits at the intersection of elegant engineering and rigorous scientific thinking.</p>

    <p>With a deep passion for clean architecture, machine learning, and open-source development, I strive to create solutions that are not only functional but beautiful in their design. I believe the best software emerges when we apply the scientific method to engineering challenges.</p>

    <p>When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or diving into research papers on AI and systems design.</p>
  </div>

  <div class="skills">
    <span class="skill-tag">Python</span>
    <span class="skill-tag">JavaScript</span>
    <span class="skill-tag">TypeScript</span>
    <span class="skill-tag">React</span>
    <span class="skill-tag">Node.js</span>
    <span class="skill-tag">Machine Learning</span>
    <span class="skill-tag">Docker</span>
    <span class="skill-tag">Kubernetes</span>
    <span class="skill-tag">Go</span>
    <span class="skill-tag">Rust</span>
    <span class="skill-tag">System Design</span>
    <span class="skill-tag">Computational Drug discovery</span>
  </div>
</div>';
}

/**
 * Default Contact page content.
 *
 * @return string
 */
function karthi_contact_page_content() {
	return '<div class="page-content">
  <h1>Get In Touch</h1>
  <p style="text-align: center; margin-bottom: 2.5rem;">Have a question, project idea, or just want to say hi? Drop me a message!</p>

  <form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Your name" required>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="your@email.com" required>
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" placeholder="What\'s on your mind?" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Send Message &rarr;</button>
  </form>
</div>';
}

/**
 * Fallback menu when no menu is assigned to the primary location.
 */
function karthi_primary_menu_fallback() {
	$pages = array(
		'home'     => array( 'label' => __( 'Home', 'karthi-theme' ), 'url' => home_url( '/' ) ),
		'projects' => array( 'label' => __( 'Projects', 'karthi-theme' ), 'url' => get_post_type_archive_link( 'project' ) ),
		'blog'     => array( 'label' => __( 'Blog', 'karthi-theme' ), 'url' => '' ),
		'about'    => array( 'label' => __( 'About', 'karthi-theme' ), 'url' => '' ),
		'contact'  => array( 'label' => __( 'Contact', 'karthi-theme' ), 'url' => '' ),
	);

	// Resolve page permalinks dynamically so links work with any permalink structure.
	foreach ( array( 'blog', 'about', 'contact' ) as $slug ) {
		$page = get_page_by_path( $slug );
		$pages[ $slug ]['url'] = $page ? get_permalink( $page->ID ) : home_url( '/' . $slug . '/' );
	}

	echo '<ul class="nav-menu">';
	foreach ( $pages as $page ) {
		printf(
			'<li><a href="%s">%s</a></li>',
			esc_url( $page['url'] ),
			esc_html( $page['label'] )
		);
	}
	echo '</ul>';
}

/**
 * Get project demo URL.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function karthi_get_project_demo_url( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	return get_post_meta( $post_id, '_karthi_demo_url', true );
}

/**
 * Get project source URL.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function karthi_get_project_source_url( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	return get_post_meta( $post_id, '_karthi_source_url', true );
}