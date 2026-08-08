document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer p");
  if (footer) {
    const year = new Date().getFullYear();
    footer.textContent = `© ${year} Test Site`;
  }

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      if (!name || !email) {
        status.innerHTML = "Please fill in your name and email.";
        return;
      }

      status.innerHTML = `Thanks, ${name}! We'll get back to you at ${email} soon.`;
      form.reset();
    });
  }
});
