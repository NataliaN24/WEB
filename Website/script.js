document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".sidebar a");

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
