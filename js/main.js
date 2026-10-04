// =========================
// LUXECART MAIN JAVASCRIPT
// =========================


// HOME PAGE
const featuredProducts = document.getElementById("featuredProducts");


// PRODUCTS PAGE
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");


// =========================
// PRODUCT CARD
// =========================

function createProductCard(product) {

    return `
        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="product-badge">
                    ${product.badge}
                </span>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-rating">
                    ★ ${product.rating}
                </div>

                <div class="product-price">

                    <span class="current-price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>

                </div>


                <div class="product-actions">

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                    <a
                        href="product-details.html?id=${product.id}"
                        class="view-product-btn"
                    >
                        View
                    </a>

                </div>

            </div>

        </article>
    `;
}


// =========================
// HOME PAGE PRODUCTS
// =========================

function displayFeaturedProducts() {

    if (!featuredProducts) {
        return;
    }

    const featured = products.slice(0, 4);

    featuredProducts.innerHTML = featured
        .map(createProductCard)
        .join("");
}


// =========================
// ALL PRODUCTS
// =========================

function displayProducts(productList) {

    if (!productsContainer) {
        return;
    }

    if (productList.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-state">

                <h3>No products found</h3>

                <p>
                    Try another search or category.
                </p>

            </div>
        `;

        return;
    }

    productsContainer.innerHTML = productList
        .map(createProductCard)
        .join("");
}


// =========================
// FILTER PRODUCTS
// =========================

function filterProducts() {

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const categoryValue = categoryFilter
        ? categoryFilter.value
        : "All";


    const filteredProducts = products.filter(function (product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue);


        const matchesCategory =
            categoryValue === "All" ||
            product.category === categoryValue;


        return matchesSearch && matchesCategory;
    });


    displayProducts(filteredProducts);
}


// =========================
// SEARCH EVENT
// =========================

if (searchInput) {

    searchInput.addEventListener("input", function () {
        filterProducts();
    });

}


// =========================
// CATEGORY EVENT
// =========================

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {
        filterProducts();
    });

}


// =========================
// ADD TO CART
// =========================

function addToCart(productId) {

    const selectedProduct = products.find(function (product) {
        return product.id === productId;
    });


    if (!selectedProduct) {
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("luxecart-cart")) || [];


    const existingProduct = cart.find(function (item) {
        return item.id === productId;
    });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...selectedProduct,
            quantity: 1
        });

    }


    localStorage.setItem(
        "luxecart-cart",
        JSON.stringify(cart)
    );


    alert(`${selectedProduct.name} added to your cart.`);
}


// =========================
// PAGE INITIALIZATION
// =========================

displayFeaturedProducts();

displayProducts(products);