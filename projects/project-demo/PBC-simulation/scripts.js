const c = document.getElementById("demoCanvas");
const ctx = c.getContext("2d");
const particleInput = document.getElementById("particleCount");
const resetBtn = document.getElementById("resetBtn");
const trailsCheckbox = document.getElementById("showTrails");

c.width = 600;
c.height = 400;

const RADIUS = 3;
const TRAIL_LENGTH = 20; // ~50px at ~2.5px/step

// A curated palette of pleasing, distinct colors
const COLORS = [
  "#60a5fa", // blue
  "#34d399", // emerald
  "#f472b6", // pink
  "#fbbf24", // amber
  "#a78bfa", // violet
  "#fb923c", // orange
  "#22d3ee", // cyan
  "#f87171", // red
  "#4ade80", // green
  "#c084fc", // purple
  "#facc15", // yellow
  "#2dd4bf", // teal
];

let particles = [];

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    particles.push({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      // Velocity magnitude between 0.5 and 2.5 px/frame – fast enough to look lively, slow enough to be visible
      vx: randomInRange(-2.5, 2.5),
      vy: randomInRange(-2.5, 2.5),
      color,
      trail: [],
    });
  }
}

function loop() {
  ctx.clearRect(0, 0, c.width, c.height);

  const showTrails = trailsCheckbox.checked;

  for (const p of particles) {
    // Save current position to trail before updating
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > TRAIL_LENGTH) {
      p.trail.shift();
    }

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Periodic boundary conditions: wrap around
    if (p.x < 0) p.x += c.width;
    else if (p.x > c.width) p.x -= c.width;
    if (p.y < 0) p.y += c.height;
    else if (p.y > c.height) p.y -= c.height;

    // Draw trail (if enabled)
    if (showTrails && p.trail.length > 1) {
      for (let i = 1; i < p.trail.length; i++) {
        const alpha = i / p.trail.length; // fades from transparent → solid
        ctx.beginPath();
        ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
        ctx.lineTo(p.trail[i].x, p.trail[i].y);
        // Use the particle's color with fading alpha
        ctx.strokeStyle = hexToRgba(p.color, alpha * 0.6);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  requestAnimationFrame(loop);
}

// Helper: convert hex color to rgba with given alpha
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Reset with current input value
function reset() {
  const count = parseInt(particleInput.value, 10) || 100;
  initParticles(count);
}

resetBtn.addEventListener("click", reset);

// Re-initialize when user changes the number and presses Enter
particleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") reset();
});

// Start
initParticles(100);
loop();