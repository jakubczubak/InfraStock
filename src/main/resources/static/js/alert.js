const alert_error_close_btn = document.getElementById('alert_error_close_btn');
const alert_info_close_btn = document.getElementById('alert_info_close_btn');
const alert_success_close_btn = document.getElementById('alert_success_close_btn');

const alert_error_msg = document.getElementById('alert_error_msg');
const alert_info_msg = document.getElementById('alert_info_msg');
const alert_success_msg = document.getElementById('alert_success_msg');


const alert_error = document.getElementById('alert_error');
const alert_info = document.getElementById('alert_info');
const alert_success = document.getElementById('alert_success');


function showErrorAlert(text) {
    alert_error_msg.innerText = text;
    alert_error.classList.remove('hide');
    alert_error.classList.add('show');
}

function showInfoAlert(text) {
    alert_info_msg.innerText = text;
    alert_info.classList.remove('hide');
    alert_info.classList.add('show');
}

function showSuccessAlert(text) {
    alert_success_msg.innerText = text;
    alert_success.classList.remove('hide');
    alert_success.classList.add('show');
}

function hideErrorAlert() {
    alert_error.classList.remove('show');
    alert_error.classList.add('hide');
}

function hideInfoAlert() {
    alert_info.classList.remove('show');
    alert_info.classList.add('hide');
}

function hideSuccessAlert() {
    alert_success.classList.remove('show');
    alert_success.classList.add('hide');
}

alert_error_close_btn.addEventListener('click', function () {
    hideErrorAlert();
});
alert_info_close_btn.addEventListener('click', function () {
    hideInfoAlert();
});
alert_success_close_btn.addEventListener('click', function () {
    hideSuccessAlert();
});


function checkIfErrorOrLogoutParamExist(){

    let url_string = window.location.href;
    let url = new URL(url_string);
    let error = url.searchParams.get('error');
    let logout = url.searchParams.get('logout');

    if (error != null) {
        showErrorAlert('Incorrect email or password!');
        setTimeout(function () {
            hideErrorAlert();
        }, 5000); //hide alert automatically after 5sec
    }
    if (logout != null) {
        showInfoAlert('Logout successful');
        setTimeout(function () {
            hideInfoAlert();
        }, 5000); //hide alert automatically after 5sec
    }
}

checkIfErrorOrLogoutParamExist();

