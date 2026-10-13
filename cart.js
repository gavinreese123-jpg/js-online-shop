
 // Store the items currently in the cart
export const cart = [];

// Add a product or increase its quantity
export function addToCart(product) {
    if (!product) {
        throw new Error("Product was not found.");
    }

    if (!product.inStock) {
        throw new Error(product.productName + " is out of stock.");
    }

    const existingItem = cart.find(function(item) {
        return item.productName === product.productName;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
}

// Remove a product from the cart
export function removeFromCart(productName) {
    const itemIndex = cart.findIndex(function(item) {
        return item.productName === productName;
    });

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
}

// Display cart items and calculate the total
export function viewCart() {
    let total = 0;

    for (const item of cart) {
        const itemTotal = item.price * item.quantity;

        console.log(
            item.productName + " x " + item.quantity +
            " - $" + itemTotal.toFixed(2)
        );

        total += itemTotal;
    }

    console.log("Cart Total: $" + total.toFixed(2));
}
