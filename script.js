const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const formFeedback = document.querySelector(".form-feedback");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    siteNavigation.classList.toggle("is-open", !isExpanded);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      siteNavigation.classList.remove("is-open");
    }
  });
}

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    formFeedback.textContent = `Thanks, ${name}. Your security cover enquiry is ready to connect to your enquiry system. Your information has not been sent or stored.`;
  });
}
