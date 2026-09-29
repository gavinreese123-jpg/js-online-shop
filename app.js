// Store all of the products in one array
const products = [
    {
        productName: "Running Shoes",
        price: 59.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Hiking Boots",
        price: 89.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Chocolate Cake",
        price: 24.99,
        category: "Food item",
        inStock: false
    },
    {
        productName: "Pizza",
        price: 14.99,
        category: "Food item",
        inStock: true
    }
];

// The cart starts empty and products will be added to it later
const cart = [];

console.log("Products:", products);

// Find a product and add it to the cart if it is in stock
function addToCart(productName) {
    const product = products.find(function(product) {
        return product.productName === productName;
    });

    if (!product) {
        const message = productName + " was not found.";
        console.log(message);
    } else if (!product.inStock) {
        const message = productName + " is out of stock.";
        console.log(message);
    } else {
        cart.push(product);
        const message = productName + " was added to the cart.";
        console.log(message);

        // Update the cart counter on the page
        document.getElementById("cart-count").textContent = cart.length;
    }
}

// Show the products in the cart and calculate the total
function viewCart() {
    let total = 0;

    for (const item of cart) {
        console.log(item.productName + " - $" + item.price.toFixed(2));
        total += item.price;
    }

    console.log("Cart Total: $" + total.toFixed(2));
}

// Find products that match the selected category
function filterByCategory(category) {
    const filteredProducts = products.filter(function(product) {
        return product.category === category;
    });

    // Display only the products that match the category
    renderProducts(filteredProducts);
}

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
            addToCart(product.productName);
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