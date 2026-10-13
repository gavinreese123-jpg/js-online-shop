
 // Load product data from the DummyJSON API
export async function loadProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("The product request failed.");
        }

        const data = await response.json();

        // Convert API products to the format used by the shop
        return data.products.map(function(product) {
            return {
                productName: product.title,
                price: product.price,
                category: product.category,
                inStock: product.stock > 0
            };
        });
    } catch (error) {
        console.error("Product loading error:", error);

        throw new Error(
            "Sorry, products could not be loaded. Please try again later."
        );
    }
}
