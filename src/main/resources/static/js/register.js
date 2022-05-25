const registration_form = document.getElementById('registration_form');
const input_password = document.getElementById('password');
const input_confirm_password = document.getElementById('confirm_password');
const input_username = document.getElementById('username');
const input_email = document.getElementById('email');


function clearRegistrationFormData() {
    input_username.value = "";
    input_email.value = "";
    input_password.value = "";
    input_confirm_password.value = "";
}

registration_form.addEventListener("submit", e => {

    e.preventDefault();

    let newUser = {
        username : input_username.value,
        email : input_email.value,
        password : input_password.value,
        confirmPassword : input_confirm_password.value
    };

    if (input_password.value === input_confirm_password.value) {

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(function (response) {

                if(response.ok){
                    response.text().then(function (text) {
                        if( text === "Successfully created account!"){

                            signIn();
                            clearRegistrationFormData();
                            showSuccessAlert(text);
                            setTimeout(function () {
                                hideSuccessAlert();
                            }, 5000); //hide alert automatically after 5sec

                        }else{

                            showErrorAlert(text);
                            setTimeout(function () {
                                hideErrorAlert();
                            }, 5000); //hide alert automatically after 5sec
                        }
                    })
                }else{
                    response.text().then(function (text) {
                        showErrorAlert(text);
                        setTimeout(function () {
                            hideErrorAlert();
                        }, 5000); //hide alert automatically after 5sec
                    })
                }
            })
    } else {
        showErrorAlert("Passwords did not match!");
        setTimeout(function () {
            hideErrorAlert();
        }, 5000); //hide alert automatically after 5sec
    }
});