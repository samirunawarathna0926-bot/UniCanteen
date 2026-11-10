
// ==================================
// UNICANTEEN - ORDER CONFIRMATION
// ==================================


// 1. GET THE SAVED ORDER

const order = JSON.parse(
    localStorage.getItem("unicanteenLastOrder") || "null"
);


// 2. GET HTML ELEMENTS

const referenceElement =
    document.querySelector("#order-reference");

const studentNameElement =
    document.querySelector("#confirmed-student-name");

const registrationElement =
    document.querySelector("#confirmed-registration");

const paymentElement =
    document.querySelector("#confirmed-payment");

const totalElement =
    document.querySelector("#confirmed-total");

const itemsContainer =
    document.querySelector("#confirmed-order-items");


// 3. CHECK WHETHER AN ORDER EXISTS

if (!order) {

    document.querySelector(".confirmation-page").innerHTML = `
        <section class="confirmation-success">
            <h1>No Order Found</h1>
            <p>Please place an order before visiting this page.</p>
            <a href="/menu.html" class="menu-button">
                Explore Menu
            </a>
        </section>
    `;

} else {

    // 4. DISPLAY ORDER REFERENCE

    referenceElement.textContent = order.reference;


    // 5. DISPLAY STUDENT INFORMATION

    studentNameElement.textContent = order.studentName;

    registrationElement.textContent =
        order.registrationNumber;


    // 6. DISPLAY PAYMENT METHOD

    paymentElement.textContent = order.paymentMethod;


    // 7. DISPLAY ORDERED MEALS

    itemsContainer.innerHTML = order.items.map(item => {

        const extrasHTML = (item.extras || [])
            .filter(extra => Number(extra.quantity) > 0)
            .map(extra => `
                <p class="cart-extra">
                    ${extra.name} × ${extra.quantity}
                </p>
            `)
            .join("");

        return `
            <div class="confirmation-item">

                <div>
                    <h3>${item.mealName}</h3>

                    <p class="cart-canteen">
                        ${item.canteen}
                    </p>

                    ${extrasHTML}

                    <p>Quantity: ${item.quantity}</p>
                </div>

                <strong>
                    LKR ${Number(item.itemTotal).toFixed(2)}
                </strong>

            </div>
        `;

    }).join("");


    // 8. DISPLAY TOTAL

    totalElement.textContent =
        "LKR " + Number(order.total).toFixed(2);

}
