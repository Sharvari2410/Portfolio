"use strict";

const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");
const navLinks = siteNav.querySelectorAll("a");
const filterButtons = document.querySelectorAll("#filterButtons button");
const projectCards = document.querySelectorAll("#projectGrid .project-card");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const showCard = selected === "all" || selected === category;
      card.classList.toggle("hidden", !showCard);
    });
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formNote.textContent = "Please fill all fields correctly before sending.";
    formNote.classList.remove("success");
    return;
  }

  formNote.textContent = "Message sent. Thanks, I will get back to you soon.";
  formNote.classList.add("success");
  contactForm.reset();
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => observer.observe(item));
