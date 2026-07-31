---
layout: default
title: "Projects"
permalink: /projects/
---

<div class="featured">
  <div class="section-header">
    <h1>Projects</h1>
    <p>Things I've built and contributed to</p>
  </div>

  <div class="grid">
    {% for project in site.data.projects %}
    <div class="card">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <div class="card-tags">
        {% for tool in project.tools %}
        <span class="tag">{{ tool }}</span>
        {% endfor %}
      </div>
      <div class="card-links">
        {% if project.demo_url and project.demo_url != "#" %}
        <a href="{{ project.demo_url }}" class="btn btn-sm">Live Demo &rarr;</a>
        {% endif %}
        {% if project.source_url and project.source_url != "#" %}
        <a href="{{ project.source_url }}" class="btn btn-sm btn-outline">Source Code</a>
        {% endif %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>
