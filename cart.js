import { products } from "./products.js";

// The cart starts empty and products will be added to it later
export const cart = [];

// Find a product and add it to the cart if it is in stock
export function addToCart(productName) {
    const product = products.find(function(product) {
        return product.productName === productName;
    });

    if (!product) {
        throw new Error(productName + " was not found.");
    }

    if (!product.inStock) {
        throw new Error(productName + " is out of stock.");
    }

    cart.push(product);
}

// Show the products in the cart and calculate the total
export function viewCart() {
    let total = 0;

    for (const item of cart) {
        console.log(item.productName + " - $" + item.price.toFixed(2));
        total += item.price;
    }

    console.log("Cart Total: $" + total.toFixed(2));
}