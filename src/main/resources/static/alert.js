let error_alert_close_btn = document.querySelector("body > div.error-alert > span.close-btn");
let error_alert = document.querySelector(".error-alert");

let logout_alert_close_btn = document.querySelector("body > div.logout-alert > span.close-btn");
let logout_alert = document.querySelector(".logout-alert");

let password_alert_close_btn = document.querySelector("body > div.error-password-alert > span.close-btn");
let password_alert = document.querySelector(".error-password-alert");

let new_user_alert_close_btn = document.querySelector("body > div.new_user-alert > span.close-btn");
let new_user_alert = document.querySelector(".new_user-alert");

let validMsg = document.getElementById("alertMsg");

function errorAlert() {
    error_alert.classList.remove("show");
    error_alert.classList.add("hide")
}

function logoutAlert() {
    logout_alert.classList.remove("show");
    logout_alert.classList.add("hide");
}

function showNewUserAlert() {
    new_user_alert.classList.remove("hide")
    new_user_alert.classList.add("show");
    setTimeout(function () {
        new_user_alert.classList.remove("show");
        new_user_alert.classList.add("hide")
    }, 5000);
}

function showPasswordDidNotMatchAlert() {
    password_alert.classList.remove("hide")
    password_alert.classList.add("show");
    setTimeout(function () {
        password_alert.classList.remove("show");
        password_alert.classList.add("hide")
    }, 5000); //hide alert automatically after 5sec

}

function showValidationAlert(text){
    validMsg.innerText=text;
    password_alert.classList.remove("hide")
    password_alert.classList.add("show");
    setTimeout(function () {
        password_alert.classList.remove("show");
        password_alert.classList.add("hide")
    }, 5000); //hide alert automatically after 5sec
}

error_alert_close_btn.addEventListener('click', function () {
    errorAlert();
})

logout_alert_close_btn.addEventListener('click', function () {
    logoutAlert();
})

password_alert_close_btn.addEventListener('click', function () {
    password_alert.classList.remove("show");
    password_alert.classList.add("hide")
})

new_user_alert_close_btn.addEventListener('click', function () {
    new_user_alert.classList.remove("show");
    new_user_alert.classList.add("hide")
})


//Check if param "error, logout" exist
let url_string = window.location.href;
let url = new URL(url_string);
let error = url.searchParams.get("error");
let logout = url.searchParams.get("logout");
if (error != null) {
    error_alert.classList.remove("hide")
    error_alert.classList.add("show");

    setTimeout(function () {
        error_alert.classList.remove("show");
        error_alert.classList.add("hide")
    }, 5000); //hide alert automatically after 5sec
}
if (logout != null) {
    logout_alert.classList.remove("hide")
    logout_alert.classList.add("show");

    setTimeout(function () {
        logout_alert.classList.remove("show");
        logout_alert.classList.add("hide")
    }, 5000); //hide alert automatically after 5sec
}
