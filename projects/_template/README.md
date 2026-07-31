# Project Template

This is a template for creating new projects in the portfolio.

## Files

- `index.md` - Main project file with front matter and content
- `scripts.js` - Project-specific JavaScript
- `style.css` - Project-specific CSS styles

## How to Use

1. Copy the entire `_template` directory and rename it to your project name
2. Update the front matter in `index.md`:
   - Replace `{{ project.title }}` with your project title
   - Replace `{{ project.description }}` with your project description
   - Update `tags` array with relevant tags
   - Set `demo_url` to your demo page URL (or remove if not applicable)
   - Set `source_url` to your GitHub repository URL
3. Add your project code to `scripts.js`
4. Add custom styles to `style.css`
5. Update the HTML content in `index.md` as needed

## Example

```yaml
---
layout: projects
title: "My Awesome Project"
description: "A brief description of what this project does"
tags:
  - Python
  - Machine Learning
  - Data Science
demo_url: "/projects/my-awesome-project/"
source_url: "https://github.com/username/my-awesome-project"
---