
// ==================================
// UNICANTEEN - CHECKOUT FUNCTIONALITY
// ==================================


// 1. GET THE STUDENT'S CART

function getCart() {
    return JSON.parse(
        localStorage.getItem("unicanteenCart") || "[]"
    );
}


// 2. CALCULATE ONE MEAL'S PRICE

function calculateMealPrice(item) {

    let price = Number(item.basePrice) || 0;

    (item.extras || []).forEach(extra => {

        price +=
            Number(extra.quantity) *
            Number(extra.unitPrice);

    });

    return price;
}


// 3. DISPLAY ORDER DETAILS

function displayCheckout() {

    const cart = getCart();

    const itemsContainer =
        document.querySelector("#checkout-items");

    const subtotalElement =
        document.querySelector("#checkout-subtotal");

    const totalElement =
        document.querySelector("#checkout-total");

    const confirmButton =
        document.querySelector("#confirm-order-button");


    // Check whether cart is empty

    if (cart.length === 0) {

        itemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>

                <p>Please add some meals before checkout.</p>

                <a href="/" class="continue-shopping">
                    Explore Canteens
                </a>
            </div>
        `;

        subtotalElement.textContent = "LKR 0.00";
        totalElement.textContent = "LKR 0.00";

        confirmButton.disabled = true;

        return;
    }


    // Display meals

    itemsContainer.innerHTML = cart.map(item => {

        const oneMealPrice =
            calculateMealPrice(item);

        const itemTotal =
            oneMealPrice * Number(item.quantity);


        // Display extras

        const extrasHTML = (item.extras || [])

            .filter(extra => Number(extra.quantity) > 0)

            .map(extra => `
                <p class="cart-extra">
                    ${extra.name} × ${extra.quantity}
                    (LKR ${Number(extra.unitPrice).toFixed(2)} each)
                </p>
            `)

            .join("");


        return `

            <article class="cart-item">

                <div class="cart-item-details">

                    <h3>${item.mealName}</h3>

                    <p class="cart-canteen">
                        ${item.canteen}
                    </p>

                    <p>
                        Base price:
                        LKR ${Number(item.basePrice).toFixed(2)}
                    </p>

                    ${extrasHTML ||
                        '<p class="cart-extra">No extras selected</p>'}

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p class="cart-item-price">
                        Item total:
                        <strong>
                            LKR ${itemTotal.toFixed(2)}
                        </strong>
                    </p>

                </div>

            </article>

        `;

    }).join("");


    // Calculate subtotal

    const subtotal = cart.reduce((sum, item) => {

        return sum +
            calculateMealPrice(item) *
            Number(item.quantity);

    }, 0);


    // Display prices

    subtotalElement.textContent =
        "LKR " + subtotal.toFixed(2);

    totalElement.textContent =
        "LKR " + subtotal.toFixed(2);

}


// 4. STUDENT DETAILS AND PAYMENT VALIDATION

const studentNameInput =
    document.querySelector("#student-name");

const registrationInput =
    document.querySelector("#registration-number");

const confirmButton =
    document.querySelector("#confirm-order-button");


// Check all required information

function updateConfirmButton() {

    const name =
        studentNameInput.value.trim();

    const registrationNumber =
        registrationInput.value.trim();

    const selectedPayment =
        document.querySelector(
            'input[name="payment-method"]:checked'
        );

    const cart = getCart();


    const detailsCompleted =
        name.length > 0 &&
        registrationNumber.length > 0 &&
        selectedPayment !== null;


    confirmButton.disabled =
        !detailsCompleted || cart.length === 0;

}


// Listen for student name changes

studentNameInput.addEventListener(
    "input",
    updateConfirmButton
);


// Listen for registration number changes

registrationInput.addEventListener(
    "input",
    updateConfirmButton
);


// Listen for payment selection

document.querySelectorAll(
    'input[name="payment-method"]'
).forEach(payment => {

    payment.addEventListener(
        "change",
        updateConfirmButton
    );

});



// 5. CONFIRM ORDER BUTTON

confirmButton.addEventListener("click", function() {

    updateConfirmButton();

    if (confirmButton.disabled) {
        alert("Please complete all required details.");
        return;
    }

    // Get payment method

    const selectedPayment = document.querySelector(
        'input[name="payment-method"]:checked'
    );

    const paymentName =
        selectedPayment.value === "cash"
            ? "Cash on Collection"
            : "Online Payment";


    // Get student information

    const studentName =
        studentNameInput.value.trim();

    const registrationNumber =
        registrationInput.value.trim();


    // Get cart information

    const cart = getCart();


    // Calculate total

    const total = cart.reduce((sum, item) => {

        return sum +
            calculateMealPrice(item) *
            Number(item.quantity);

    }, 0);


    // Generate order reference

    const reference =
        "UC-" +
        Date.now().toString();


    // Prepare order information

    const order = {

        reference: reference,

        studentName: studentName,

        registrationNumber: registrationNumber,

        paymentMethod: paymentName,

        items: cart.map(item => {

            return {

                ...item,

                itemTotal:
                    calculateMealPrice(item) *
                    Number(item.quantity)

            };

        }),

        total: total,

        status: "Order Confirmed",

        createdAt: new Date().toISOString()

    };


    // Save confirmed order

    try {

        localStorage.setItem(
            "unicanteenLastOrder",
            JSON.stringify(order)
        );

        // Clear shopping cart only after saving

        localStorage.removeItem("unicanteenCart");

        // Update cart counter

        window.updateCartCount?.();

        // Open confirmation page

        window.location.href = "/confirmation.html";

    } catch (error) {

        alert(
            "Unable to save your order. Please try again."
        );

        console.error(error);

    }

});



// 6. LOAD CHECKOUT PAGE

displayCheckout();

updateConfirmButton();
