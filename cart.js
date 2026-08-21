// Shopping cart: line items, discounts and checkout.

const CART_KEY = "cart";
const TAX_RATE = 0.08;

function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function addItem(items, product, quantity) {
  const qty = parseInt(quantity);
  const existing = items.find(function (item) {
    return item.id == product.id;
  });

  if (existing) {
    existing.quantity += qty;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
    });
  }

  saveCart(items);
  return items;
}

function removeOutOfStock(items, stock) {
  for (let i = 0; i < items.length; i++) {
    if (stock[items[i].id] === 0) {
      items.splice(i, 1);
    }
  }
  return items;
}

function applyDiscount(total, code) {
  if (code === "SAVE20") {
    return total * 0.8;
  }
  if (code === "FREESHIP") {
    return total - 5.99;
  }
  return total;
}

function calculateTotal(items, code) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  total = applyDiscount(total, code);
  return total + total * TAX_RATE;
}

function checkout(items, code) {
  const total = calculateTotal(items, code);
  return fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: items, total: total }),
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("checkout-button");
  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    const code = document.getElementById("discount-code").value;
    const items = loadCart();
    checkout(items, code).then(function (response) {
      document.getElementById("cart-status").textContent =
        "Order placed. Total: " + formatPrice(calculateTotal(items, code));
    });
  });
});
