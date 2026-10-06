import { products } from "./products.js";
import { addToCart, viewCart, cart } from "./cart.js";

// Build product cards and add them to the page
function renderProducts(productsToDisplay) {
    const productGrid = document.getElementById("product-grid");

    // Clear the product grid before rendering new cards
    productGrid.innerHTML = "";

    // Create a card for each product
    for (const product of productsToDisplay) {
        const card = document.createElement("div");

        // Create the product name
        const name = document.createElement("h2");
        name.textContent = product.productName;

        // Create the product category
        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        // Create the product price
        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price.toFixed(2);

        // Create the Add to Cart button
        const button = document.createElement("button");
        button.textContent = "Add to Cart";

        // Run addToCart when the button is clicked
        button.addEventListener("click", function() {
            const errorMessage = document.getElementById("error-message");

            try {
                addToCart(product.productName);
                errorMessage.textContent = "";
                document.getElementById("cart-count").textContent = cart.length;
            } catch (error) {
                errorMessage.textContent = "Sorry, " + error.message;
            } finally {
                console.log("Add to Cart attempt completed.");
            }
        });

        // Add the product information and button to the card
        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(button);

        // Add the completed card to the product grid
        productGrid.appendChild(card);
    }
}

// Find products that match the selected category
function filterByCategory(category) {
    const filteredProducts = products.filter(function(product) {
        return product.category === category;
    });

    // Display only the products that match the category
    renderProducts(filteredProducts);
}

// Create the category filter buttons
function renderCategoryButtons() {
    const categoryContainer = document.getElementById("category-filters");
    const categories = ["All", "Footwear", "Food item"];

    // Create a button for each category
    for (const category of categories) {
        const button = document.createElement("button");
        button.textContent = category;

        // Re-render the products when a category is selected
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

// Display the category buttons and products when the page loads
renderCategoryButtons();
renderProducts(products);
