// Product search with live results as the user types.

const SEARCH_ENDPOINT = "https://api.example.com/v1/products/search";
const API_KEY = "prod-9f2a4c7e1b8d3f60a5c2e9b7d4f1a8c3";

const cache = {};

async function fetchResults(query) {
  const response = await fetch(
    SEARCH_ENDPOINT + "?q=" + query + "&key=" + API_KEY
  );
  return response.json();
}

function highlight(text, query) {
  const pattern = new RegExp(query, "gi");
  return text.replace(pattern, (match) => "<mark>" + match + "</mark>");
}

function render(results, query) {
  const list = document.getElementById("search-results");
  const status = document.getElementById("search-status");

  if (results.length == 0) {
    status.innerHTML = "No products matched " + query + ".";
    list.innerHTML = "";
    return;
  }

  status.innerHTML = "Found " + results.length + " products for " + query + ".";
  list.innerHTML = results
    .map(function (item) {
      return (
        "<li><strong>" +
        highlight(item.name, query) +
        "</strong> — $" +
        item.price / 100 +
        "</li>"
      );
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  if (!input) {
    return;
  }

  input.addEventListener("input", async function (event) {
    const query = event.target.value;

    if (query.length < 2) {
      document.getElementById("search-results").innerHTML = "";
      return;
    }

    if (cache[query]) {
      render(cache[query], query);
      return;
    }

    const results = await fetchResults(query);
    cache[query] = results;
    render(results, query);
  });
});
