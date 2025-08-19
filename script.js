// script.js

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Scrolls smoothly to a target element, accounting for the height of the nav bar
  function scrollWithOffset(targetElement) {
    const navHeight = document.querySelector("nav").offsetHeight;
    const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementTop - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  // Maps table cell locations (by row and column index) to corresponding workshop detail titles
const detailMap = {
  "1-2": "Strength for trans masc & non binary bois",
  "1-3": "Hoe word ik een graafdier?",
  "1-4": "Boxing Workshop",
  "1-5": "Trans Bodies show & tell",
  "break-3": "Line Dance",
  "2-2": "Somatic Yoga",
  "2-3": "Inner Compass Workshop",
  "2-4": "Discriminatie Wetgeving Workshop"
};
  // Select all rows in the program table
  const rows = document.querySelectorAll(".program-overview tbody tr");

  rows.forEach((row, rowIndex) => {
    // Iterate through each cell in the row
    row.querySelectorAll("td").forEach((cell, colIndex) => {
      // Skip first column and empty cells
      if (colIndex === 0 || !cell.textContent.trim()) return;

      // Mark cell as clickable
      cell.classList.add("clickable");

      // On click, find the corresponding detail section and scroll to it
      cell.addEventListener("click", () => {
        const round =
          rowIndex === 1 ? "1" :
          rowIndex === 2 ? "break" :
          rowIndex === 3 ? "2" :
          null;

        if (!round) return;

        const key = `${round}-${colIndex}`;
        const location = detailMap[key];
        if (!location) return;

        // Close all detail sections first
        const allDetails = document.querySelectorAll("details.program-day");
        allDetails.forEach(d => d.open = false);

        // Find the matching detail section based on its summary text
        const target = [...allDetails].find(d =>
          d.querySelector("summary").textContent.trim().toLowerCase() === location.toLowerCase()
        );

        // Open and scroll to the matching detail section
        if (target) {
          target.open = true;
          scrollWithOffset(target);
        }
      });
    });
  });

  // Smooth scrolling for nav links
  document.querySelectorAll("nav a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        scrollWithOffset(targetElement);
        history.pushState(null, '', `#${targetId}`);
      }
    });
  });

  // Show or hide the "Back to Top" button based on scroll position
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // Scroll to top when "Back to Top" is clicked
  backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
