document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('productList');

    async function fetchProducts() {
        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcxYmNkOTJiNGYxNDAwMTViMzc0Y2MiLCJpYXQiOjE3MTg3Mjk5NDUsImV4cCI6MTcxOTkzOTU0NX0.fTHKmOhdcZ0czZ0eCdkPpKu9pbNgTTIDYC3XppdjZWU'
                }
            });
            console.log(response);
            return await response.json();
            
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
            
        }
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card mb-4">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <a href="product.html?id=${product._id}" class="btn btn-primary">View Product</a>
                    </div>
                </div>
            `;
            productList.appendChild(col);
        });
    }

    const products = await fetchProducts();
    displayProducts(products);
});
