
// ==================================
// UNICANTEEN - AUTHENTICATION PAGE
// ==================================


// 1. GET HTML ELEMENTS

const loginTab = document.querySelector("#login-tab");

const registerTab = document.querySelector("#register-tab");

const loginForm = document.querySelector("#login-form");

const registerForm = document.querySelector("#register-form");

const showRegister = document.querySelector("#show-register");

const showLogin = document.querySelector("#show-login");


// 2. FUNCTION TO SHOW LOGIN FORM

function showLoginForm() {

    loginForm.hidden = false;

    registerForm.hidden = true;

    loginTab.classList.add("active");

    registerTab.classList.remove("active");

}


// 3. FUNCTION TO SHOW REGISTER FORM

function showRegisterForm() {

    loginForm.hidden = true;

    registerForm.hidden = false;

    loginTab.classList.remove("active");

    registerTab.classList.add("active");

}


// 4. LOGIN TAB CLICK

loginTab.addEventListener("click", showLoginForm);


// 5. REGISTER TAB CLICK

registerTab.addEventListener("click", showRegisterForm);


// 6. SWITCH FROM LOGIN TO REGISTER

showRegister.addEventListener("click", showRegisterForm);


// 7. SWITCH FROM REGISTER TO LOGIN

showLogin.addEventListener("click", showLoginForm);



// ==================================
// TEMPORARY FORM SUBMISSION HANDLERS
// ==================================

// Firebase authentication will be added later.

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Login functionality will be connected to Firebase soon.");

});


registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const password =
        document.querySelector("#register-password").value;

    const confirmPassword =
        document.querySelector("#confirm-password").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }

    alert("Registration form is working! Firebase account creation will be added later.");

});
