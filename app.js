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

    for (const product of filteredProducts) {
        console.log(product.productName + " - $" + product.price.toFixed(2));
    }
}

// Test the different add-to-cart results
addToCart("Running Shoes");
addToCart("Chocolate Cake");
addToCart("Wireless Headphones");

// Display the cart
viewCart();

// Display products in the Footwear category
filterByCategory("Footwear");