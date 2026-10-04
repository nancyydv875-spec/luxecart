// =========================
// PRODUCT DETAILS
// =========================

const productDetails = document.getElementById("productDetails");


// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id"));


// Find selected product
const selectedProduct = products.find(function (product) {
    return product.id === productId;
});


// Display product details
function displayProductDetails() {

    if (!productDetails) {
        return;
    }


    if (!selectedProduct) {

        productDetails.innerHTML = `
            <div class="empty-state">

                <h3>Product not found</h3>

                <p>
                    The product you are looking for does not exist.
                </p>

                <a
                    href="products.html"
                    class="btn primary-btn"
                >
                    Back to Products
                </a>

            </div>
        `;

        return;
    }


    productDetails.innerHTML = `

        <div class="details-grid">

            <div class="details-image">

                <img
                    src="${selectedProduct.image}"
                    alt="${selectedProduct.name}"
                >

            </div>


            <div class="details-content">

                <p class="product-category">
                    ${selectedProduct.category}
                </p>

                <h1>
                    ${selectedProduct.name}
                </h1>

                <div class="details-rating">
                    ★ ${selectedProduct.rating} / 5
                </div>

                <div class="details-price">

                    <span class="current-price">
                        ₹${selectedProduct.price}
                    </span>

                    <span class="old-price">
                        ₹${selectedProduct.oldPrice}
                    </span>

                </div>

                <p class="details-description">
                    A carefully selected product from the
                    Luxecart collection, designed to offer
                    quality, style and everyday convenience.
                </p>


                <div class="quantity-box">

                    <label for="quantity">
                        Quantity
                    </label>

                    <input
                        type="number"
                        id="quantity"
                        value="1"
                        min="1"
                        max="10"
                    >

                </div>


                <button
                    class="btn primary-btn details-cart-btn"
                    onclick="addProductToCart()"
                >
                    Add to Cart
                </button>


                <a
                    href="products.html"
                    class="back-link"
                >
                    ← Continue Shopping
                </a>

            </div>

        </div>
    `;
}


// Add selected product with quantity
function addProductToCart() {

    const quantityInput = document.getElementById("quantity");

    const quantity = Number(quantityInput.value);


    if (!selectedProduct || quantity < 1) {
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("luxecart-cart")) || [];


    const existingProduct = cart.find(function (item) {
        return item.id === selectedProduct.id;
    });


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            ...selectedProduct,
            quantity: quantity
        });

    }


    localStorage.setItem(
        "luxecart-cart",
        JSON.stringify(cart)
    );


    alert(`${selectedProduct.name} added to your cart.`);
}


displayProductDetails();