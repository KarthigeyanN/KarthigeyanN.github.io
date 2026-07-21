const toggle = document.getElementById("theme-toggle");
const sunIcon = toggle?.querySelector(".sun-icon");
const moonIcon = toggle?.querySelector(".moon-icon");

// Apply saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateIcons(savedTheme);
} else {
  // Default to light
  document.documentElement.setAttribute("data-theme", "light");
  updateIcons("light");
}

function updateIcons(theme) {
  if (!sunIcon || !moonIcon) return;
  if (theme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}

if (toggle) {
  toggle.onclick = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcons(next);
  };
}