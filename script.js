const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#contact-form");
const feedback = document.querySelector(".form-feedback");
if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    if (!name || !phone || !service) {
      feedback.textContent = "Please complete your name, phone number and site type.";
      return;
    }
    feedback.textContent = "Thanks, " + name + ". The form is a front-end demo and has not sent your enquiry. Connect a form service or backend to receive enquiries.";
  });
}
