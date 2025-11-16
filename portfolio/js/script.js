document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");
  const navLinks = document.querySelectorAll(".nav-link");
  const allSections = document.querySelectorAll("section");

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", !isHidden);
    menuIconOpen.classList.toggle("hidden", !isHidden);
    menuIconClose.classList.toggle("hidden", isHidden);
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
      }
    });
  });

  // --- Intersection Observer for ACTIVE NAV LINK ---
  const navObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // 50% of the section must be visible
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, navObserverOptions);

  allSections.forEach((section) => {
    navObserver.observe(section);
  });

  // Initial active link check for home
  const homeLink = document.querySelector('a[href="#home"]');
  if (window.scrollY < window.innerHeight / 2) {
    homeLink.classList.add("active");
  }

  // --- Intersection Observer for SCROLL ANIMATIONS ---
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const scrollObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, scrollObserverOptions);

  scrollElements.forEach((el) => {
    scrollObserver.observe(el);
  });
});
