# Karthi — Personal Portfolio Website

A modern, responsive personal portfolio website built with **Jekyll** and vanilla **HTML/CSS/JavaScript**. Features a dark/light theme toggle, animated particle network background, and a clean scientific aesthetic.

## ✨ Features

- **🌗 Dark/Light Theme** — Toggle with smooth CSS transitions, persisted to `localStorage`
- **✨ Particle Network Background** — Animated connecting particles that respond to the current accent color
- **📐 Scientific Grid Background** — Subtle grid overlay for a technical, engineering feel
- **🎨 Modern UI** — Glassmorphism navigation, gradient text, animated buttons with slide-fill hover effects
- **📱 Fully Responsive** — Optimized for desktop, tablet, and mobile
- **📝 Blog** — Jekyll-powered blog with post listings
- **📬 Contact Form** — Styled form ready for Formspree integration
- **🏗️ Project Showcase** — Card grid with hover effects, tags, and links
- **⚡ Fast Loading** — Google Fonts preconnected, deferred JavaScript, minimal dependencies

## 🚀 Quick Start

### Option 1: Open Directly (No Build Required)

Simply open `index.html` in your browser. All pages are fully self-contained with relative paths.

### Option 2: Jekyll Server (For Blog & Templating)

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Open in browser
open http://localhost:4000
```

## 📁 Project Structure

```
PersonalWebsite/
├── index.html                 # Home page (standalone)
├── _config.yml                # Jekyll configuration
├── Gemfile                    # Ruby dependencies
├── README.md
│
├── about/
│   ├── index.html             # About page (standalone)
│   └── index.md               # About page (Jekyll)
│
├── blog/
│   ├── index.html             # Blog listing (standalone)
│   ├── index.md               # Blog listing (Jekyll)
│   └── _posts/
│       └── 2026-07-17-welcome.md
│
├── contact/
│   ├── index.html             # Contact page (standalone)
│   └── index.md               # Contact page (Jekyll)
│
├── projects/
│   ├── index.html             # Projects listing (standalone)
│   └── project-demo/
│       ├── index.html         # Demo page (standalone)
│       ├── scripts.js
│       └── style.css
│
├── assets/
│   ├── css/
│   │   ├── base.css           # Core styles (typography, layout, animations)
│   │   ├── theme.css          # CSS variables for light/dark themes
│   │   └── science.css        # Component styles (nav, footer, cards, forms)
│   ├── js/
│   │   ├── theme.js           # Theme toggle logic
│   │   └── particles.js       # Particle network animation
│   └── images/
│
├── _data/
│   ├── featured.yml           # Legacy (unused)
│   └── projects.yml           # Projects data
│
├── _includes/
│   ├── footer.html            # Footer component (Jekyll)
│   ├── header.html            # Navigation component (Jekyll)
│   ├── particles.html         # Particles canvas (Jekyll)
│   └── theme-toggle.html      # Theme toggle button (Jekyll)
│
└── _layouts/
    ├── default.html           # Base layout (Jekyll)
    ├── home.html              # Home page layout (Jekyll)
    ├── post.html              # Blog post layout (Jekyll)
    └── projects.html          # Project page layout (Jekyll)
```

## 🎨 Customization

### Colors & Theme

Edit `assets/css/theme.css` to customize the color palette:

```css
:root {
  --accent: #0077ff;           /* Primary accent color */
  --accent-secondary: #7c3aed; /* Secondary gradient color */
  --bg: #ffffff;               /* Background */
  --text: #111111;             /* Text color */
  /* ... more variables */
}
```

### Content

- **Projects** — Edit `_data/projects.yml` to add/remove projects
- **About** — Edit `about/index.html`
- **Blog Posts** — Add `.md` files to `blog/_posts/`
- **Social Links** — Edit the footer in each `index.html` or `_includes/footer.html`

### Particles

Adjust particle behavior in `assets/js/particles.js`:

```javascript
const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
// Change 60 to increase/decrease max particles
// Connection distance threshold: 120 (px)
```

## 🛠️ Built With

- [Jekyll](https://jekyllrb.com/) — Static site generator
- [Inter Font](https://fonts.google.com/specimen/Inter) — Modern sans-serif typeface
- Vanilla JavaScript — No frameworks needed
- CSS Custom Properties — Dynamic theming

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Karthi