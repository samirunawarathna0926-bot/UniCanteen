
// Update the cart number in the navigation

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("unicanteenCart") || "[]"
    );

    // Count all meal quantities
    const totalItems = cart.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);

    // Update every cart counter on this page
    document.querySelectorAll(".cart-count").forEach(counter => {
        counter.textContent = totalItems;
    });
}

// Make this function available to other JavaScript files
window.updateCartCount = updateCartCount;

// Update when the page opens
updateCartCount();

// Update if cart storage changes in another browser tab
window.addEventListener("storage", updateCartCount);
