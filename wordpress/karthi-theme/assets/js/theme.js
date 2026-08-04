/**
 * Theme toggle logic for Karthi Portfolio.
 */
(function () {
	"use strict";

	const toggle = document.getElementById("theme-toggle");
	const sunIcon = toggle ? toggle.querySelector(".sun-icon") : null;
	const moonIcon = toggle ? toggle.querySelector(".moon-icon") : null;

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

	// Apply saved theme.
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		document.documentElement.setAttribute("data-theme", savedTheme);
		updateIcons(savedTheme);
	} else {
		// Default to light.
		document.documentElement.setAttribute("data-theme", "light");
		updateIcons("light");
	}

	if (toggle) {
		toggle.addEventListener("click", function () {
			const current = document.documentElement.getAttribute("data-theme");
			const next = current === "dark" ? "light" : "dark";
			document.documentElement.setAttribute("data-theme", next);
			localStorage.setItem("theme", next);
			updateIcons(next);
		});
	}
})();