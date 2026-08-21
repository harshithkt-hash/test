// Shared helpers extracted from newsletter.js, search.js and cart.js so the
// same logic is not repeated in three places.

function escapeHtml(text) {
  return String(text)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

function formatPrice(cents) {
  return "$" + (cents / 100).toFixed(2);
}
