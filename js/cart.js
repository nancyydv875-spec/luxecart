// =========================
// LUXECART CART
// =========================

const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const deliveryCharge = document.getElementById("deliveryCharge");
const checkoutBtn = document.getElementById("checkoutBtn");


// Get cart from localStorage
function getCart() {

    return JSON.parse(
        localStorage.getItem("luxecart-cart")
    ) || [];

}


// Save cart
function saveCart(cart) {

    localStorage.setItem(
        "luxecart-cart",
        JSON.stringify(cart)
    );

}


// Display cart
function displayCart() {

    const cart = getCart();

    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Looks like you haven't added anything yet.
                </p>

                <a
                    href="products.html"
                    class="btn primary-btn"
                >
                    Start Shopping
                </a>

            </div>
        `;

        cartSubtotal.textContent = "₹0";
        deliveryCharge.textContent = "₹0";
        cartTotal.textContent = "₹0";

        checkoutBtn.style.pointerEvents = "none";
        checkoutBtn.style.opacity = "0.5";

        return;
    }


    checkoutBtn.style.pointerEvents = "auto";
    checkoutBtn.style.opacity = "1";


    cartItems.innerHTML = cart.map(function (product) {

        const itemTotal =
            product.price * product.quantity;


        return `
            <article class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div class="cart-item-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="cart-item-price">
                        ₹${product.price}
                    </p>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                1
                            )"
                        >
                            +
                        </button>

                    </div>

                </div>


                <div class="cart-item-right">

                    <strong>
                        ₹${itemTotal}
                    </strong>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(
                            ${product.id}
                        )"
                    >
                        Remove
                    </button>

                </div>

            </article>
        `;

    }).join("");


    updateSummary(cart);
}


// Change quantity
function changeQuantity(productId, change) {

    const cart = getCart();

    const product = cart.find(function (item) {
        return item.id === productId;
    });


    if (!product) {
        return;
    }


    product.quantity += change;


    if (product.quantity <= 0) {

        const updatedCart = cart.filter(function (item) {
            return item.id !== productId;
        });

        saveCart(updatedCart);

    } else {

        saveCart(cart);

    }


    displayCart();
}


// Remove product
function removeFromCart(productId) {

    const cart = getCart();

    const updatedCart = cart.filter(function (item) {
        return item.id !== productId;
    });


    saveCart(updatedCart);

    displayCart();
}


// Calculate totals
function updateSummary(cart) {

    let subtotal = 0;


    cart.forEach(function (product) {

        subtotal +=
            product.price * product.quantity;

    });


    const delivery = subtotal >= 999 ? 0 : 79;

    const total = subtotal + delivery;


    cartSubtotal.textContent =
        `₹${subtotal}`;

    deliveryCharge.textContent =
        delivery === 0
            ? "Free"
            : `₹${delivery}`;

    cartTotal.textContent =
        `₹${total}`;
}


// Start
displayCart();