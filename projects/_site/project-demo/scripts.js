const c = document.getElementById("demoCanvas");
const ctx = c.getContext("2d");

c.width = 600;
c.height = 400;

let x = 300, y = 200, dx = 2, dy = 1.5;

function loop() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "var(--accent)";
  ctx.fill();

  x += dx;
  y += dy;

  if (x < 0 || x > c.width) dx *= -1;
  if (y < 0 || y > c.height) dy *= -1;

  requestAnimationFrame(loop);
}

loop();
