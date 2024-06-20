document.addEventListener('DOMContentLoaded', async () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const productIdField = document.getElementById('productId');

    async function fetchProducts() {
        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcxYmNkOTJiNGYxNDAwMTViMzc0Y2MiLCJpYXQiOjE3MTg3Mjk5NDUsImV4cCI6MTcxOTkzOTU0NX0.fTHKmOhdcZ0czZ0eCdkPpKu9pbNgTTIDYC3XppdjZWU'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async function addProduct(product) {
        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcxYmNkOTJiNGYxNDAwMTViMzc0Y2MiLCJpYXQiOjE3MTg3Mjk5NDUsImV4cCI6MTcxOTkzOTU0NX0.fTHKmOhdcZ0czZ0eCdkPpKu9pbNgTTIDYC3XppdjZWU',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    async function updateProduct(id, product) {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcxYmNkOTJiNGYxNDAwMTViMzc0Y2MiLCJpYXQiOjE3MTg3Mjk5NDUsImV4cCI6MTcxOTkzOTU0NX0.fTHKmOhdcZ0czZ0eCdkPpKu9pbNgTTIDYC3XppdjZWU',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    async function deleteProduct(id) {
        try {
            await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcxYmNkOTJiNGYxNDAwMTViMzc0Y2MiLCJpYXQiOjE3MTg3Mjk5NDUsImV4cCI6MTcxOTkzOTU0NX0.fTHKmOhdcZ0czZ0eCdkPpKu9pbNgTTIDYC3XppdjZWU'
                }
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'card mb-4';
            div.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <button class="btn btn-primary btn-edit" data-id="${product._id}">Edit</button>
                    <button class="btn btn-danger btn-delete" data-id="${product._id}">Delete</button>
                </div>
            `;
            productList.appendChild(div);
        });

        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                const product = products.find(p => p._id === id);
                productIdField.value = product._id;
                document.getElementById('name').value = product.name;
                document.getElementById('description').value = product.description;
                document.getElementById('brand').value = product.brand;
                document.getElementById('imageUrl').value = product.imageUrl;
                document.getElementById('price').value = product.price;
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                await deleteProduct(id);
                const products = await fetchProducts();
                displayProducts(products);
            });
        });
    }

    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const product = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            brand: document.getElementById('brand').value,
            imageUrl: document.getElementById('imageUrl').value,
            price: document.getElementById('price').value
        };

        const productId = productIdField.value;
        if (productId) {
            await updateProduct(productId, product);
        } else {
            await addProduct(product);
        }
        
        productForm.reset();
        productIdField.value = '';
        const products = await fetchProducts();
        displayProducts(products);
    });

    const products = await fetchProducts();
    displayProducts(products);
});
