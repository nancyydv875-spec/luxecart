// =========================
// LUXECART CHECKOUT
// =========================

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutDelivery =
    document.getElementById("checkoutDelivery");

const checkoutTotal =
    document.getElementById("checkoutTotal");


// Get cart
function getCheckoutCart() {

    return JSON.parse(
        localStorage.getItem("luxecart-cart")
    ) || [];

}


// Display order summary
function displayCheckoutSummary() {

    const cart = getCheckoutCart();


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-state">

                <h3>Your cart is empty</h3>

                <p>
                    Add some products before checkout.
                </p>

                <a
                    href="products.html"
                    class="btn primary-btn"
                >
                    Shop Products
                </a>

            </div>
        `;

        return;
    }


    checkoutItems.innerHTML = cart.map(function (product) {

        return `
            <div class="checkout-product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.quantity} × ₹${product.price}
                    </p>

                </div>

            </div>
        `;

    }).join("");


    calculateCheckoutTotal(cart);
}


// Calculate total
function calculateCheckoutTotal(cart) {

    let subtotal = 0;


    cart.forEach(function (product) {

        subtotal +=
            product.price * product.quantity;

    });


    const delivery =
        subtotal >= 999 ? 0 : 79;

    const total =
        subtotal + delivery;


    checkoutSubtotal.textContent =
        `₹${subtotal}`;

    checkoutDelivery.textContent =
        delivery === 0
            ? "Free"
            : `₹${delivery}`;

    checkoutTotal.textContent =
        `₹${total}`;
}


// Place order
if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const cart = getCheckoutCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product first."
                );

                return;
            }


            const firstName =
                document.getElementById("firstName").value.trim();


            alert(
                `Thank you ${firstName}! Your order has been placed successfully.`
            );


            // Clear cart after order
            localStorage.removeItem("luxecart-cart");


            // Go back to home
            window.location.href = "index.html";

        }
    );

}


displayCheckoutSummary();