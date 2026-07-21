---
layout: default
title: "Contact"
---

<div class="page-content">
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
      <textarea id="message" name="message" placeholder="What's on your mind?" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary" style="align-self: flex-start;">Send Message &rarr;</button>
  </form>
</div>