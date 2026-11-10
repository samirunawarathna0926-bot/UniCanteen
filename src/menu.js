
// Get the information from the URL
const params = new URLSearchParams(window.location.search);

// Find which canteen the student selected
const selectedCanteen = params.get("canteen");


// Canteen names
const canteenNames = {
    "kalderama": "Kalderama",
    "hilton": "Hilton",
    "off-campus": "Other Food Outlets"
};

// Find the heading on the Menu page
const canteenTitle = document.querySelector("#canteen-title");

// Display the selected canteen
if (canteenNames[selectedCanteen]) {
    canteenTitle.textContent = canteenNames[selectedCanteen] + " Menu";
} else {
    canteenTitle.textContent = "Explore Our Menu";
}
// Prices of optional extras
const extraPrices = {
    egg: 80,
    fish: 150
};

// ==================================
// UNICANTEEN - SAMPLE FOOD DATABASE
// ==================================

const foodData = {

    kalderama: {
        categories: ["Rice", "Short Eats", "Beverages", "Kottu"],

        meals: [
            {
                id: 1,
                name: "Egg Rice",
                category: "Rice",
                price: 350,
                image: "https://placehold.co/400x300?text=Egg+Rice",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 2,
                name: "Fish Rice",
                category: "Rice",
                price: 400,
                image: "https://placehold.co/400x300?text=Fish+Rice",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 3,
                name: "Chicken Rice",
                category: "Rice",
                price: 450,
                image: "https://placehold.co/400x300?text=Chicken+Rice",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 4,
                name: "Fish Roll",
                category: "Short Eats",
                price: 80,
                image: "/images/egg roll.jpg",
                available: true,
                extras: []
            },
            {
                id: 5,
                name: "Vegetable Roti",
                category: "Short Eats",
                price: 50,
                image: "https://placehold.co/400x300?text=Vegetable+Roti",
                available: true,
                extras: []
            },
            {
                id: 6,
                name: "Fresh Lime Juice",
                category: "Beverages",
                price: 180,
                image: "https://placehold.co/400x300?text=Lime+Juice",
                available: true,
                extras: []
            },
            {
                id: 7,
                name: "Chicken Kottu",
                category: "Kottu",
                price: 550,
                image: "https://placehold.co/400x300?text=Chicken+Kottu",
                available: true,
                extras: []
            },
            {
                id: 8,
                name: "Egg Kottu",
                category: "Kottu",
                price: 450,
                image: "https://placehold.co/400x300?text=Egg+Kottu",
                available: true,
                extras: []
            }
        ]
    },

    hilton: {
        categories: ["Rice", "Short Eats", "Beverages"],

        meals: [
            {
                id: 9,
                name: "Egg Rice",
                category: "Rice",
                price: 380,
                image: "https://placehold.co/400x300?text=Egg+Rice",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 10,
                name: "Fish Rice",
                category: "Rice",
                price: 430,
                image: "https://placehold.co/400x300?text=Fish+Rice",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 11,
                name: "Chicken Rice",
                category: "Rice",
                price: 480,
                image: "https://placehold.co/400x300?text=Chicken+Rice",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 12,
                name: "Fish Roll",
                category: "Short Eats",
                price: 110,
                image: "https://placehold.co/400x300?text=Fish+Roll",
                available: true,
                extras: []
            },
            {
                id: 13,
                name: "Chicken Patty",
                category: "Short Eats",
                price: 120,
                image: "https://placehold.co/400x300?text=Chicken+Patty",
                available: true,
                extras: []
            },
            {
                id: 14,
                name: "Iced Coffee",
                category: "Beverages",
                price: 220,
                image: "https://placehold.co/400x300?text=Iced+Coffee",
                available: true,
                extras: []
            }
        ]
    }
};

// ==================================
// DISPLAY THE SELECTED MENU
// ==================================

const categoryContainer = document.querySelector("#category-container");
const menuContainer = document.querySelector("#menu-container");

// Get the selected canteen's food data
const currentMenu = foodData[selectedCanteen];

// Check whether the selected canteen has sample menu data
if (currentMenu) {

    // Display the categories
    function displayCategories() {

        categoryContainer.innerHTML = currentMenu.categories
            .map(category => `
                <button class="category-button" data-category="${category}">
                    ${category}
                </button>
            `).join("");

    }

    // Display meals belonging to a selected category
    

        
function displayMeals(category) {

    const selectedMeals = currentMenu.meals.filter(
        meal => meal.category === category
    );

    menuContainer.innerHTML = selectedMeals.map(meal => `

        <article class="meal-card" data-base-price="${meal.price}">

            <img
                src="${meal.image}"
                alt="${meal.name}"
                class="meal-image"
            >

            <div class="meal-details">

                <h3>${meal.name}</h3>

                <p class="meal-price">
                    Base price: LKR ${meal.price.toFixed(2)}
                </p>

                <p class="${meal.available ? 'available' : 'unavailable'}">
                    ${meal.available ? 'Available' : 'Out of Stock'}
                </p>

                ${meal.extras.length > 0 ? `

                    <div class="meal-extras">

                        <p><strong>Add extra items</strong></p>

                        ${meal.extras
                            .filter(extra => extra === "egg" || extra === "fish")
                            .map(extra => `
                                <label class="extra-option">

                                    <span>
                                        Extra ${extra.charAt(0).toUpperCase() + extra.slice(1)}
                                    </span>

                                    <input
                                        type="number"
                                        class="extra-quantity"
                                        data-price="${extraPrices[extra]}"
                                        min="0"
                                        step="1"
                                        value="0"
                                    >

                                    <span>
                                        LKR ${extraPrices[extra]} each
                                    </span>

                                </label>
                            `).join("")}

                    </div>

                ` : ""}

                <p class="meal-total">
                    Total:
                    <strong class="total-price">
                        LKR ${meal.price.toFixed(2)}
                    </strong>
                </p>

                <button
                    class="add-cart-button"
                    data-meal-id="${meal.id}"
                    ${!meal.available ? "disabled" : ""}
>
                    ${meal.available ? "Add to Cart" : "Out of Stock"}
                </button>

            </div>

        </article>

    `).join("");

    // Update price when extra quantities change
    menuContainer.oninput = function(event) {

        if (!event.target.classList.contains("extra-quantity")) {
            return;
        }

        const quantityInput = event.target;

        // Allow only non-negative whole numbers
        if (quantityInput.value === "" || Number(quantityInput.value) < 0) {
            quantityInput.value = 0;
        }

        const mealCard = quantityInput.closest(".meal-card");

        const basePrice = Number(mealCard.dataset.basePrice);

        const extraInputs = mealCard.querySelectorAll(".extra-quantity");

        let totalPrice = basePrice;

        extraInputs.forEach(input => {

            const quantity = Number(input.value) || 0;
            const price = Number(input.dataset.price);

            totalPrice += quantity * price;

        });

        mealCard.querySelector(".total-price").textContent =
            "LKR " + totalPrice.toFixed(2);
    };

    // Add selected meal to cart
    menuContainer.onclick = function(event) {

        const button = event.target.closest(".add-cart-button");

        if (!button || button.disabled) {
            return;
        }

        const mealCard = button.closest(".meal-card");

        const mealId = Number(button.dataset.mealId);

        const meal = currentMenu.meals.find(
            item => item.id === mealId
        );

        const extraInputs = mealCard.querySelectorAll(".extra-quantity");

        const selectedExtras = [];

        extraInputs.forEach(input => {

            const quantity = Number(input.value) || 0;

            if (quantity > 0) {

                const extraName = input.dataset.price === undefined
                    ? ""
                    : input.previousElementSibling.textContent.trim();

                selectedExtras.push({
                    name: extraName,
                    quantity: quantity,
                    unitPrice: Number(input.dataset.price)
                });

            }

        });

        const totalPrice = Number(
            mealCard.querySelector(".total-price").textContent
                .replace("LKR", "")
                .trim()
        );

        const cart = JSON.parse(
            localStorage.getItem("unicanteenCart") || "[]"
        );

        cart.push({
            canteen: canteenNames[selectedCanteen],
            mealId: meal.id,
            mealName: meal.name,
            basePrice: meal.price,
            extras: selectedExtras,
            quantity: 1,
            totalPrice: totalPrice
        });

        localStorage.setItem(
            "unicanteenCart",
            JSON.stringify(cart)
        );
        window.updateCartCount?.();
        alert(meal.name + " added to your cart!");

    };
}

    // Show categories
    displayCategories();

    // Show Rice meals first
    displayMeals(currentMenu.categories[0]);

    // Change meals when a category is clicked
    categoryContainer.addEventListener("click", function(event) {

        const clickedButton = event.target.closest(".category-button");

        if (!clickedButton) return;

        const selectedCategory = clickedButton.dataset.category;

        displayMeals(selectedCategory);

    });

} else {

    // Message for menus we haven't built yet
    categoryContainer.innerHTML = "";

    menuContainer.innerHTML = `
        <p>We are preparing this menu. Please check back soon!</p>
    `;

}
