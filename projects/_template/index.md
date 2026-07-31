---
layout: projects
title: "My Project Title"
description: "A brief description of what this project does"
tags:
  - Web
  - JavaScript
  - Demo
demo_url: "/projects/my-project/"
source_url: "https://github.com/username/repo"
---

<div class="project-page">
  <h1>{{ page.title }}</h1>
  <p>{{ page.description }}</p>

  <div class="demo">
    <!-- Add your demo content here -->
    <canvas id="demoCanvas"></canvas>
  </div>
</div>

<script src="{{ '/projects/my-project/scripts.js' | relative_url }}"></script>
