import { outletNames, outletMenus } from "./outlet-menus.js";

// Get the information from the URL
const params = new URLSearchParams(window.location.search);

// Find which canteen the student selected
const selectedCanteen = params.get("canteen");


// Canteen names
const canteenNames = {
    "kalderama": "Kalderama",
    "hilton": "Hilton",
    "off-campus": "Other Food Outlets",
    ...outletNames
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
const extraPrices = selectedCanteen === "kalderama"
    ? { egg: 40, fish: 60, chicken: 75 }
    : { egg: 80, fish: 150 };

// ==================================
// UNICANTEEN - SAMPLE FOOD DATABASE
// ==================================

const foodData = {
    ...outletMenus,

    kalderama: {
        "categories": [
            "Rice & Curry",
            "Roti & Parata",
            "Short Eats & Other",
            "Beverages",
            "Fried Rice",
            "Kottu"
        ],
        "meals": [
            {
                "id": 201,
                "name": "Vegetable Rice & Curry",
                "category": "Rice & Curry",
                "price": 100,
                "image": "/images/food/vegetable-rice.webp",
                "available": true,
                "extras": ["egg", "fish", "chicken"],
                "portions": [
                    {
                        "label": "Half",
                        "price": 100
                    },
                    {
                        "label": "Full",
                        "price": 140
                    }
                ]
            },
            {
                "id": 202,
                "name": "Egg Rice & Curry",
                "category": "Rice & Curry",
                "price": 140,
                "image": "/images/food/egg-rice.webp",
                "available": true,
                "extras": ["egg", "fish", "chicken"],
                "portions": [
                    {
                        "label": "Half",
                        "price": 140
                    },
                    {
                        "label": "Full",
                        "price": 180
                    }
                ]
            },
            {
                "id": 203,
                "name": "Fish Rice & Curry",
                "category": "Rice & Curry",
                "price": 160,
                "image": "/images/food/fish-rice.webp",
                "available": true,
                "extras": ["egg", "fish", "chicken"],
                "portions": [
                    {
                        "label": "Half",
                        "price": 160
                    },
                    {
                        "label": "Full",
                        "price": 200
                    }
                ]
            },
            {
                "id": 204,
                "name": "Chicken Rice & Curry",
                "category": "Rice & Curry",
                "price": 175,
                "image": "/images/food/chicken-rice.webp",
                "available": true,
                "extras": ["egg", "fish", "chicken"],
                "portions": [
                    {
                        "label": "Half",
                        "price": 175
                    },
                    {
                        "label": "Full",
                        "price": 215
                    }
                ]
            },
            {
                "id": 205,
                "name": "Egg Omelette Rice & Curry",
                "category": "Rice & Curry",
                "price": 165,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": ["egg", "fish", "chicken"],
                "portions": [
                    {
                        "label": "Half",
                        "price": 165
                    },
                    {
                        "label": "Full",
                        "price": 195
                    }
                ]
            },
            {
                "id": 206,
                "name": "Parata",
                "category": "Roti & Parata",
                "price": 50,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": []
            },
            {
                "id": 207,
                "name": "Egg Roti",
                "category": "Roti & Parata",
                "price": 80,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": []
            },
            {
                "id": 208,
                "name": "Vegetable Roti",
                "category": "Roti & Parata",
                "price": 60,
                "image": "/images/food/vegetable-roti.webp",
                "available": true,
                "extras": []
            },
            {
                "id": 209,
                "name": "Rolls",
                "category": "Short Eats & Other",
                "price": 50,
                "image": "/images/food/roll.webp",
                "available": true,
                "extras": []
            },
            {
                "id": 210,
                "name": "Dhal Wade",
                "category": "Short Eats & Other",
                "price": 25,
                "image": "/images/food/dhal-wade.webp",
                "available": true,
                "extras": []
            },
            {
                "id": 211,
                "name": "Ulundu Wade",
                "category": "Short Eats & Other",
                "price": 40,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": []
            },
            {
                "id": 212,
                "name": "Thosai with Curry",
                "category": "Short Eats & Other",
                "price": 50,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": []
            },
            {
                "id": 213,
                "name": "Fruit Juice",
                "category": "Beverages",
                "price": 60,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": []
            },
            {
                "id": 214,
                "name": "Vegetable Fried Rice",
                "category": "Fried Rice",
                "price": 250,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": [],
                "portions": [
                    {
                        "label": "Half",
                        "price": 250
                    },
                    {
                        "label": "Full",
                        "price": 350
                    }
                ]
            },
            {
                "id": 215,
                "name": "Egg Fried Rice",
                "category": "Fried Rice",
                "price": 300,
                "image": "/images/menu-placeholder.svg",
                "available": true,
                "extras": [],
                "portions": [
                    {
                        "label": "Half",
                        "price": 300
                    },
                    {
                        "label": "Full",
                        "price": 400
                    }
                ]
            },
            {
                "id": 216,
                "name": "Chicken Fried Rice",
                "category": "Fried Rice",
                "price": 400,
                "image": "/images/food/chicken-fried-rice.webp",
                "available": true,
                "extras": [],
                "portions": [
                    {
                        "label": "Half",
                        "price": 400
                    },
                    {
                        "label": "Full",
                        "price": 500
                    }
                ]
            },
            {
                "id": 217,
                "name": "Egg Kottu",
                "category": "Kottu",
                "price": 350,
                "image": "/images/egg-kottu2-min.jpg",
                "available": true,
                "extras": [],
                "portions": [
                    {
                        "label": "Half",
                        "price": 350
                    },
                    {
                        "label": "Full",
                        "price": 500
                    }
                ]
            },
            {
                "id": 218,
                "name": "Chicken Kottu",
                "category": "Kottu",
                "price": 400,
                "image": "/images/food/chicken-kottu.webp",
                "available": true,
                "extras": [],
                "portions": [
                    {
                        "label": "Half",
                        "price": 400
                    },
                    {
                        "label": "Full",
                        "price": 550
                    }
                ]
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
                image: "/images/food/egg-rice.webp",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 10,
                name: "Fish Rice",
                category: "Rice",
                price: 430,
                image: "/images/food/fish-rice.webp",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 11,
                name: "Chicken Rice",
                category: "Rice",
                price: 480,
                image: "/images/food/chicken-rice.webp",
                available: true,
                extras: ["egg", "fish", "chicken"]
            },
            {
                id: 12,
                name: "Fish Roll",
                category: "Short Eats",
                price: 110,
                image: "/images/food/roll.webp",
                available: true,
                extras: []
            },
            {
                id: 13,
                name: "Chicken Patty",
                category: "Short Eats",
                price: 120,
                image: "/images/food/patties.webp",
                available: true,
                extras: []
            },
            {
                id: 14,
                name: "Iced Coffee",
                category: "Beverages",
                price: 220,
                image: "/images/menu-placeholder.svg",
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

menuContainer.classList.toggle("campus-menu", ["kalderama", "hilton"].includes(selectedCanteen));

// Get the selected canteen's food data
const currentMenu = foodData[selectedCanteen];
if (currentMenu) {
    const note = document.createElement("p");
    note.className = "menu-photo-note";
    note.textContent = "Food images are illustrative; actual meals may vary.";
    menuContainer.before(note);
}

// Check whether the selected canteen has sample menu data
if (selectedCanteen === "off-campus") {
    document.querySelector("#outlet-container").innerHTML = `<div class="canteen-grid">${Object.entries(outletNames).map(([slug, name]) => `<article class="canteen-card"><div class="canteen-icon">🍽️</div><p class="canteen-type">OFF-CAMPUS</p><h3>${name}</h3><a class="canteen-button" href="/menu.html?canteen=${slug}">View Menu →</a></article>`).join("")}</div>`;
} else if (currentMenu) {
    if (Object.hasOwn(outletNames, selectedCanteen)) {
        document.querySelector("#outlet-container").innerHTML = '<a class="outlet-back" href="/menu.html?canteen=off-campus">← All food outlets</a>';
    }

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
                alt="${meal.name} (illustrative image)"
                loading="lazy"
                decoding="async"
                class="meal-image"
            >

            <div class="meal-details">

                <h3>${meal.name}</h3>

                ${meal.portions ? `<label class="portion-label">Choose ${meal.category === "Cold Drinks" ? "size" : "portion"}
                    <select class="portion-select">${meal.portions.map((part, index) => `<option value="${index}" data-price="${part.price}">${part.label} — LKR ${part.price}</option>`).join("")}</select></label>` : ""}
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
                            .filter(extra => Object.hasOwn(extraPrices, extra))
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

        if (!event.target.matches(".extra-quantity, .portion-select")) {
            return;
        }

        const quantityInput = event.target;

        // Allow only non-negative whole numbers
        if (quantityInput.matches(".extra-quantity") && (quantityInput.value === "" || Number(quantityInput.value) < 0)) {
            quantityInput.value = 0;
        }

        const mealCard = quantityInput.closest(".meal-card");

        const portionSelect = mealCard.querySelector(".portion-select");
        const basePrice = portionSelect ? Number(portionSelect.selectedOptions[0].dataset.price) : Number(mealCard.dataset.basePrice);
        mealCard.querySelector(".meal-price").textContent = "Base price: LKR " + basePrice.toFixed(2);

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

    menuContainer.onchange = menuContainer.oninput;

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

        const portionSelect = mealCard.querySelector(".portion-select");
        const portion = portionSelect ? meal.portions[Number(portionSelect.value)] : null;
        const basePrice = portion ? portion.price : meal.price;
        cart.push({
            canteen: canteenNames[selectedCanteen],
            mealId: meal.id,
            mealName: portion ? `${meal.name} (${portion.label})` : meal.name,
            portion: portion?.label || null,
            hasExtras: meal.extras.length > 0,
            extraOptions: meal.extras.filter(extra => Object.hasOwn(extraPrices, extra)),
            basePrice: basePrice,
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
