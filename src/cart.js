
// ==================================
// UNICANTEEN - CART FUNCTIONALITY
// ==================================

// Prices of optional extras
const extraPrices = {
    egg: 80,
    fish: 150
};

// Get cart from browser storage
function getCart() {
    return JSON.parse(
        localStorage.getItem("unicanteenCart") || "[]"
    );
}

// Save cart
function saveCart(cart) {
    localStorage.setItem(
        "unicanteenCart",
        JSON.stringify(cart)
    );

    window.updateCartCount?.();
}

// Get the quantity of an extra
function getExtraQuantity(item, extraName) {

    const extra = (item.extras || []).find(
        e => e.name.toLowerCase() === ("extra " + extraName)
    );

    return extra ? extra.quantity : 0;
}

// Calculate one meal's price
function calculateMealPrice(item) {

    let price = Number(item.basePrice);

    (item.extras || []).forEach(extra => {
        price += extra.quantity * extra.unitPrice;
    });

    return price;
}

// Display cart
function displayCart() {

    const cart = getCart();

    const cartContainer = document.querySelector("#cart-container");
    const subtotalElement = document.querySelector("#cart-subtotal");
    const totalElement = document.querySelector("#cart-total");
    const checkoutButton = document.querySelector("#checkout-button");

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>You haven't added any meals yet.</p>
                <a href="/canteens.html" class="continue-shopping">
                    Explore the Menu
                </a>
            </div>
        `;

        subtotalElement.textContent = "LKR 0.00";
        totalElement.textContent = "LKR 0.00";
        checkoutButton.disabled = true;

        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => {

        const oneMealPrice = calculateMealPrice(item);
        const itemTotal = oneMealPrice * item.quantity;

        // Show editable extras only for rice meals
        const hasExtras =
            item.hasExtras ||
            /rice/i.test(item.mealName) ||
            (item.extras || []).length > 0;

        const extrasHTML = hasExtras ? `

            <div class="cart-extras">

                <p><strong>Customize your extras</strong></p>

                <div class="cart-extra-control">

                    <label>Extra Egg (LKR 80 each)</label>

                    <input
                        type="number"
                        class="cart-extra-quantity"
                        data-index="${index}"
                        data-extra="egg"
                        min="0"
                        step="1"
                        value="${getExtraQuantity(item, "egg")}"
                    >

                </div>

                <div class="cart-extra-control">

                    <label>Extra Fish (LKR 150 each)</label>

                    <input
                        type="number"
                        class="cart-extra-quantity"
                        data-index="${index}"
                        data-extra="fish"
                        min="0"
                        step="1"
                        value="${getExtraQuantity(item, "fish")}"
                    >

                </div>

            </div>

        ` : `<p class="cart-extra">No extra items</p>`;

        return `

            <article class="cart-item">

                <div class="cart-item-details">

                    <h3>${item.mealName}</h3>

                    <p class="cart-canteen">
                        ${item.canteen}
                    </p>

                    <p>
                        Base price: LKR ${Number(item.basePrice).toFixed(2)}
                    </p>

                    ${extrasHTML}

                    <p class="cart-item-price">
                        Item total:
                        <strong>LKR ${itemTotal.toFixed(2)}</strong>
                    </p>

                </div>

                <div class="cart-item-actions">

                    <div class="quantity-control">

                        <button
                            class="quantity-button"
                            data-action="decrease"
                            data-index="${index}"
                            ${item.quantity <= 1 ? "disabled" : ""}
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            class="quantity-button"
                            data-action="increase"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-button"
                        data-action="remove"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            </article>

        `;

    }).join("");

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => {

        return sum + calculateMealPrice(item) * item.quantity;

    }, 0);

    subtotalElement.textContent = "LKR " + subtotal.toFixed(2);
    totalElement.textContent = "LKR " + subtotal.toFixed(2);

    checkoutButton.disabled = false;
}


// ==================================
// CHANGE EXTRA QUANTITIES
// ==================================

document.querySelector("#cart-container").addEventListener("change", function(event) {

    if (!event.target.classList.contains("cart-extra-quantity")) {
        return;
    }

    const cart = getCart();

    const index = Number(event.target.dataset.index);
    const extraName = event.target.dataset.extra;
    const quantity = Math.max(
        0,
        Math.floor(Number(event.target.value) || 0)
    );

    event.target.value = quantity;

    const item = cart[index];

    if (!item) return;

    // Remove the old quantity of this extra
    item.extras = (item.extras || []).filter(
        extra => extra.name.toLowerCase() !== ("extra " + extraName)
    );

    // Add the new quantity if greater than zero
    if (quantity > 0) {

        item.extras.push({
            name: "Extra " + extraName.charAt(0).toUpperCase() + extraName.slice(1),
            quantity: quantity,
            unitPrice: extraPrices[extraName]
        });

    }

    saveCart(cart);

    // Refresh prices and cart display
    displayCart();

});


// ==================================
// INCREASE, DECREASE AND REMOVE ITEMS
// ==================================

document.querySelector("#cart-container").addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const cart = getCart();

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (!cart[index]) return;

    if (action === "increase") {
        cart[index].quantity += 1;
    }

    if (action === "decrease" && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }

    if (action === "remove") {
        cart.splice(index, 1);
    }

    saveCart(cart);

    displayCart();

});


// ==================================
// CHECKOUT
// ==================================
document.querySelector("#checkout-button").addEventListener("click", function() {

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "/checkout.html";

});




// Display cart when page opens
displayCart();
