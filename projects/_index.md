---
layout: default
title: "Projects"
---

<div class="featured">
  <div class="section-header">
    <h1>Projects</h1>
    <p>Things I've built and contributed to</p>
  </div>

  <div class="grid">
    {% for project in site.projects %}
    <div class="card">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="card-tags">
        {% if project.tags %}
          {% for tag in project.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
      <div class="card-links">
        {% if project.demo_url %}
        <a href="{{ project.demo_url | relative_url }}" class="btn btn-sm">Live Demo &rarr;</a>
        {% endif %}
        {% if project.source_url %}
        <a href="{{ project.source_url }}" class="btn btn-sm btn-outline">Source Code</a>
        {% endif %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>