document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    async function fetchProduct(id) {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcxYmNkOTJiNGYxNDAwMTViMzc0Y2MiLCJpYXQiOjE3MTg3Mjk5NDUsImV4cCI6MTcxOTkzOTU0NX0.fTHKmOhdcZ0czZ0eCdkPpKu9pbNgTTIDYC3XppdjZWU'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    const product = await fetchProduct(productId);
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productImage').src = product.imageUrl;
    document.getElementById('productBrand').textContent = `Brand: ${product.brand}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = `Price: $${product.price}`;
});
