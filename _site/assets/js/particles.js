const canvas = document.getElementById("particles");
if (!canvas) {
  console.warn("Particles canvas not found");
} else {
  const ctx = canvas.getContext("2d");
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.3
  }));

  function getAccentColor() {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--accent").trim() || "#0077ff";
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent = getAccentColor();

    particles.forEach((p, i) => {
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Move
      p.x += p.dx;
      p.y += p.dy;

      // Bounce
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();
}