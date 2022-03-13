let alert_close_btn = document.querySelector(".wrapper > div.alert > span.close-btn");
let alert = document.querySelector(".alert");
let alertMsg = document.getElementById("alertMsg");
let alertSign = document.getElementById(("alertSign"));
let alertCLoseSign = document.getElementById("alertCloseSign");

//alert colors


function showAlert(text) {
    alertMsg.innerText = text;
    alert.classList.remove("hide");
    alert.classList.add("show");
}


function hideAlert() {
    alert.classList.remove("show");
    alert.classList.add("hide");
}

function successStyleAlert() {
    alert.style.background = "#8BC34A";
    alert.style.borderColor = "#63912f";
    alertSign.style.color = "#fff";
    alertMsg.style.color = "#fff";
    alertCLoseSign.style.color = "#fff";
    alert_close_btn.classList.remove("close-btn-bgc-error-style", "close-btn-bgc-success-style", "close-btn-bgc-warning-style", "close-btn-bgc-info-style",);
    alert_close_btn.classList.add("close-btn-bgc-success-style");
}

function errorStyleAlert() {
    alert.style.background = "#ffdb9b";
    alert.style.borderColor = "#ffa502";
    alertSign.style.color = "#ce8500";
    alertMsg.style.color = "#ce8500";
    alertCLoseSign.style.color = "#ce8500";
    alert_close_btn.classList.remove("close-btn-bgc-error-style", "close-btn-bgc-success-style", "close-btn-bgc-warning-style", "close-btn-bgc-info-style",);
    alert_close_btn.classList.add("close-btn-bgc-error-style");
}

function warningStyleAlert() {
    alert.style.background = "#dfa1a7";
    alert.style.borderColor = "#bf444f";
    alertSign.style.color = "#bf444f";
    alertMsg.style.color = "#721c24";
    alertCLoseSign.style.color = "#721c24";
    alert_close_btn.classList.remove("close-btn-bgc-error-style", "close-btn-bgc-success-style", "close-btn-bgc-warning-style", "close-btn-bgc-info-style",);
    alert_close_btn.classList.add("close-btn-bgc-warning-style");
}

function infoStyleAlert() {
    alert.style.background = "#d1ecf1";
    alert.style.borderColor = "#9bcafb";
    alertSign.style.color = "#0c5460";
    alertMsg.style.color = "#0c5460";
    alertCLoseSign.style.color = "#0c5460";
    alert_close_btn.classList.remove("close-btn-bgc-error-style", "close-btn-bgc-success-style", "close-btn-bgc-warning-style", "close-btn-bgc-info-style",);
    alert_close_btn.classList.add("close-btn-bgc-info-style");
}

alert_close_btn.addEventListener("click", function () {
    hideAlert();
});


//Check if param "error, logout" exist
let url_string = window.location.href;
let url = new URL(url_string);
let error = url.searchParams.get("error");
let logout = url.searchParams.get("logout");

if (error != null) {
    showAlert("Warning: Incorrect email or password!", errorStyleAlert());

    setTimeout(function () {
        hideAlert();
    }, 5000); //hide alert automatically after 5sec
}
if (logout != null) {

    showAlert("You have successfully logged out!", infoStyleAlert());
    setTimeout(function () {
        hideAlert();
    }, 5000); //hide alert automatically after 5sec
}
