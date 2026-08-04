# WordPress Publication Package — Karthi Portfolio

This package converts the original Jekyll portfolio into a complete, self-contained **WordPress theme** ready for publication. It preserves the site's design (dark/light theme toggle, particle network background, scientific grid, glassmorphism nav, card grid) and content (About, Blog, Projects, Contact).

## 📦 What's Included

```
wordpress/
├── karthi-theme/               # The WordPress theme (zip this folder to install)
│   ├── style.css               # Theme header + all styles (light/dark themes)
│   ├── functions.php           # Setup, enqueue, Projects CPT, auto-seeding
│   ├── header.php              # Site header + nav + theme toggle
│   ├── footer.php              # Footer with social links
│   ├── front-page.php          # Home: hero + featured projects grid
│   ├── index.php               # Blog listing
│   ├── single.php              # Single blog post
│   ├── page.php                # Default page template
│   ├── archive-project.php     # Projects archive (/projects/)
│   ├── single-project.php      # Single project page
│   └── assets/
│       ├── js/theme.js         # Dark/light theme toggle (localStorage)
│       └── js/particles.js     # Animated particle network background
│
├── content-import.xml          # WXR file: blog posts (optional import)
└── README.md                   # This guide
```

## 🚀 Quick Start (5 Minutes)

### Option A — Self-Hosted WordPress (Recommended)

1. **Install WordPress** on your server or locally (e.g., LocalWP, XAMPP, or a host like SiteGround, Bluehost, Kinsta).
2. **Install the theme:**
   - Zip the `karthi-theme` folder → `karthi-theme.zip`
   - In wp-admin go to **Appearance → Themes → Add New → Upload Theme**
   - Upload `karthi-theme.zip` and click **Activate**
3. **Automatic setup happens on activation.** The theme automatically:
   - Creates the **Home**, **About**, **Blog**, and **Contact** pages
   - Sets Home as the static front page and Blog as the posts page
   - Creates a **Primary Menu** with Home / Projects / Blog / About / Contact as native WordPress menu items (page links and the post-type archive), so links always work regardless of permalink structure or site URL
   - Seeds the **Projects** custom post type with your 4 projects (ML Model Explorer, 3D Molecular Viewer, fpocket-rewritten, synthecomb)
   - Seeds your 2 blog posts (Welcome, Predicting Solubility)
   - Flushes rewrite rules so the `/projects/` archive page resolves immediately
4. **Upgrading from v1.0.0?** After activating the new theme version, visit **wp-admin** (any admin page). A one-time repair routine automatically converts the old hardcoded custom-URL menu links into native WordPress menu items. Then go to **Settings → Permalinks** and click **Save Changes** to flush rewrite rules.
5. **Set your site title & tagline:** Go to **Settings → General** and set:
   - Site Title: `Karthi`
   - Tagline: `Engineer • Developer • Scientific Thinker`
6. **Update the contact form:** Edit the **Contact** page and replace `https://formspree.io/f/your-form-id` with your real Formspree endpoint (or install a form plugin like WPForms / Contact Form 7).
7. **Update social links:** Edit `footer.php` to point GitHub / LinkedIn / Email to your real profiles.

### Option B — WordPress.com

1. Create a WordPress.com site (free or paid).
2. Go to **Appearance → Themes → Upload Theme** (requires the Business plan) and upload `karthi-theme.zip`.
3. Activate and follow steps 3–6 above.

### Option C — Import Content via WXR (Optional)

If you prefer to import content through the standard WordPress importer instead of the automatic seeding:

1. Install the **WordPress Importer** plugin (**Plugins → Add New → "WordPress Importer"**).
2. Activate the **karthi-theme** first so the `project` post type exists (otherwise the Projects menu item won't resolve).
3. Go to **Tools → Import → WordPress**.
4. Upload `content-import.xml`.
5. Assign posts to your user account.

The WXR file now includes:
- The **Home**, **About**, **Blog**, and **Contact** pages
- A **Primary Menu** with native menu items (Home → page, Projects → post-type archive, Blog/About/Contact → pages)
- Your **2 blog posts**

#### After importing the WXR file

1. Go to **Settings → Reading** and set:
   - **Your homepage displays:** A static page → **Home**
   - **Posts page:** → **Blog**
2. Go to **Settings → Permalinks** and click **Save Changes** to flush rewrite rules.
3. Go to **Appearance → Menus** and make sure **Primary Menu** is assigned to the **Primary Menu** location (bottom of the page under *Menu Settings* → *Display location*).

> ⚠️ **Note:** The Projects archive menu item only works if the `project` post type is registered. Make sure the theme is active before importing.
>
> ⚠️ **Note:** After importing the WXR file, go to **Appearance → Menus** and verify each item's URL is correct. The importer preserves native menu item types, so page links and the Projects archive link will automatically point to the correct URLs on your installation.
>
> **Note:** The theme's automatic seeding already creates the pages, menu, and posts on activation. Use the WXR import only if you want a clean, separate import path.

## 🎨 Customization

### Colors & Theme

Edit the CSS variables at the top of `karthi-theme/style.css`:

```css
:root {           /* Light theme */
  --accent: #0077ff;
  --accent-secondary: #7c3aed;
  --bg: #ffffff;
  --text: #111111;
}

[data-theme="dark"] {  /* Dark theme */
  --accent: #60a5fa;
  --accent-secondary: #a78bfa;
  --bg: #0a0e17;
  --text: #e6edf3;
}
```

### Projects

- **Add a project:** In wp-admin go to **Projects → Add New**. Fill in the title, description (excerpt), content, and the **Project Links** meta box (Live Demo URL + Source Code URL). Add tags in the **Project Tags** box.
- **Featured on home:** The front page automatically shows the 6 most recent projects.

### Blog

- **Write a post:** **Posts → Add New**. The blog listing and single-post templates are styled automatically.
- **Categories & tags** are supported.

### Particles

Adjust particle behavior in `karthi-theme/assets/js/particles.js`:

```javascript
const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
// Change 60 to increase/decrease max particles
// Connection distance threshold: 120 (px)
```


### Menu

Manage the navigation in **Appearance → Menus**. The theme registers a **Primary Menu** location.

**Recommended setup for menu links that always work:**

- **Home** → Add from **Pages** (or leave as a Custom Link to `home_url()` — WordPress resolves it)
- **Projects** → Add from **Post Type Archive → Projects** (not a Custom Link, so it always points to the live archive URL)
- **Blog / About / Contact** → Add from **Pages** (not Custom Links, so they always point to the correct page URLs)

Avoid adding the pages as **Custom Links** with hardcoded URLs like `https://yoursite.com/about/`. If your permalink structure or site URL changes, hardcoded custom links break. Native page/post-type menu items are resolved by WordPress automatically and never break.

## 🧩 Recommended Plugins

| Purpose | Plugin |
|---|---|
| Contact form | WPForms Lite or Contact Form 7 |
| SEO | Yoast SEO or Rank Math |
| Caching | WP Super Cache or LiteSpeed Cache |
| Security | Wordfence |
| Backups | UpdraftPlus |

## 🔧 Troubleshooting

| Issue | Fix |
|---|---|
| Theme doesn't seed content | Deactivate and reactivate the theme. Seeding runs once on activation. To force re-seed, delete the `karthi_theme_seeded` option from the database (wp_options table). |
| Menu links were hardcoded (installed with v1.0.0) | Update the theme files, then visit **wp-admin** once. The one-time repair routine (`karthi_repair_menu_links`) converts custom-URL items to native WordPress menu items. Then go to **Settings → Permalinks** and click **Save Changes** to flush rewrite rules. |
| Menu links broken after changing site URL/domain | Remove the Primary Menu items in **Appearance → Menus** and re-add them using the **Pages** and **Post Type Archive (Projects)** checkboxes so WordPress generates the URLs dynamically. Or deactivate/reactivate the theme after deleting the `karthi_theme_seeded` option. |
| Projects menu link points to Blog or another page | The theme now forces the Projects menu item's URL at render time via the `karthi_fix_projects_menu_link` filter (`wp_nav_menu_objects`). Just update the theme files and refresh the page — no database changes needed. If it still points to the wrong URL, go to **Appearance → Menus**, delete the Projects item, and re-add it from **Post Type Archive → Projects**. |
| Projects menu link 404s | Go to **Settings → Permalinks** and click **Save Changes** to flush rewrite rules. Also verify the `project` post type is active by checking **Projects** appears in the admin sidebar. |
| Particles not showing | Ensure JavaScript is enabled. The canvas is fixed behind content by design. |
| Theme toggle not persisting | Check that `localStorage` is available (private browsing may block it). |
| Contact form not sending | Replace the Formspree endpoint in the Contact page with your real form ID. |

## 📄 License

MIT License — free to use, modify, and publish.

---

Built with ❤️ by Karthi — ported from the original Jekyll portfolio.