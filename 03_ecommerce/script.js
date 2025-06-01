document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 23.87 },
    { id: 3, name: "Product 3", price: 8.99 },
  ];

  const cart = [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const priceTotal = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Render products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${
              product.id
            }">Add to Cart</button>`;
    productList.appendChild(productDiv);
  });

  // Add to cart event listener
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  // Add product to cart
  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  // Render cart items
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length) {
      emptyCartMsg.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cart.forEach((item) => {
        total += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
                    <span class="cart-product-name">${item.name}</span>
                    <span class="cart-product-price">$${item.price.toFixed(
                      2
                    )}</span>`;
        cartItems.appendChild(cartItem);
      });

      priceTotal.textContent = `$${total.toFixed(2)}`;
    } else {
      emptyCartMsg.classList.remove("hidden");
      cartTotal.classList.add("hidden");
    }
  }

  // Checkout button event listener
  checkOutBtn.addEventListener("click", () => {
    alert(`Thank you for your purchase! Total: $${priceTotal.textContent}`);
    cart.length = 0; // Empty the cart
    renderCart();
  });
});
