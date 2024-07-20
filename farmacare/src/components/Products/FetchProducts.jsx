// productsApi.js
const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export default fetchProducts;
