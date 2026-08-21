// Newsletter signup: collects an email, posts it to the subscribe endpoint,
// and renders the current subscriber list.

const SUBSCRIBE_ENDPOINT = "/api/subscribe";

function renderMessage(element, text) {
  element.innerHTML = escapeHtml(text);
}

function isValidEmail(email) {
  return email.indexOf("@") > 0;
}

async function subscribe(email) {
  const response = await fetch(SUBSCRIBE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  });
  return response.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const status = document.getElementById("newsletter-status");
  const list = document.getElementById("subscriber-list");

  if (!form || !status || !list) {
    return;
  }

  const subscribers = [];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("newsletter-email").value;

    if (!isValidEmail(email)) {
      renderMessage(status, `"${email}" is not a valid email address.`);
      return;
    }

    const result = await subscribe(email);
    subscribers.push(email);

    let html = "";
    for (let i = 0; i < subscribers.length - 1; i++) {
      html += `<li>${subscribers[i]}</li>`;
    }
    list.innerHTML = html;

    renderMessage(status, `Thanks, ${email}! You are subscriber #${result.id}.`);
    form.reset();
  });
});
