
import { loadProducts } from "./products.js";
import { addToCart, removeFromCart, cart } from "./cart.js";

let products = [];

// Display products on the page
function renderProducts(productsToDisplay) {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";

    for (const product of productsToDisplay) {
        const card = document.createElement("div");

        const name = document.createElement("h2");
        name.textContent = product.productName;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price.toFixed(2);

        const button = document.createElement("button");
        button.textContent = "Add to Cart";

        button.addEventListener("click", function() {
            const errorMessage = document.getElementById("error-message");

            try {
                addToCart(product);
                errorMessage.textContent = "";
                updateCartCount();
                renderCart();
            } catch (error) {
                errorMessage.textContent = error.message;
            } finally {
                console.log("Add to Cart attempt completed.");
            }
        });

        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(button);

        productGrid.appendChild(card);
    }
}

// Filter products by category
function filterByCategory(category) {
    const filteredProducts = products.filter(function(product) {
        return product.category === category;
    });

    renderProducts(filteredProducts);
}

// Create buttons for the available categories
function renderCategoryButtons() {
    const categoryContainer = document.getElementById("category-filters");
    categoryContainer.innerHTML = "";

    const categories = ["All"];

    for (const product of products) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    }

    for (const category of categories) {
        const button = document.createElement("button");

        button.textContent = category === "All"
            ? "All"
            : category.charAt(0).toUpperCase() + category.slice(1);

        button.addEventListener("click", function() {
            if (category === "All") {
                renderProducts(products);
            } else {
                filterByCategory(category);
            }
        });

        categoryContainer.appendChild(button);
    }
}

// Update the cart counter using total quantities
function updateCartCount() {
    let count = 0;

    for (const item of cart) {
        count += item.quantity;
    }

    document.getElementById("cart-count").textContent = count;
}

// Display cart items and calculate the total
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    for (const item of cart) {
        const cartItem = document.createElement("div");
        const itemTotal = item.price * item.quantity;

        const itemName = document.createElement("p");
        itemName.textContent =
            item.productName + " x " + item.quantity +
            " - $" + itemTotal.toFixed(2);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            removeFromCart(item.productName);
            updateCartCount();
            renderCart();
        });

        cartItem.appendChild(itemName);
        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);

        total += itemTotal;
    }

    cartTotal.textContent = "Cart Total: $" + total.toFixed(2);
}

// Load API data before displaying the shop
async function initializeShop() {
    try {
        products = await loadProducts();
    } catch (error) {
        document.getElementById("error-message").textContent = error.message;
        products = [];
    }

    renderCategoryButtons();
    renderProducts(products);
    updateCartCount();
    renderCart();
}

initializeShop();
