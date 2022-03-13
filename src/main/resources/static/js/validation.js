const form = document.querySelector("#sign_up > form");
const input_password = form.querySelector("#password");
const input_confirm_password = form.querySelector("#confirm_password");
const input_username = form.querySelector(("#username"));
const input_email = form.querySelector("#email");


function clearData() {
    input_username.value = "";
    input_email.value = "";
    input_password.value = "";
    input_confirm_password.value = ""
}

form.addEventListener("submit", e => {
    e.preventDefault();

    let newUser = {
        username: input_username.value,
        email: input_email.value,
        password: input_password.value,
        confirmPassword: input_confirm_password.value
    };

    //If evrything is OK
    if (input_password.value === input_confirm_password.value) {

        $.ajax({
            type: 'POST',
            url: '/register',
            data: JSON.stringify(newUser),
            contentType: "application/json",
            success: function (text) {
                //If the email does not exist in the database, the controller sends a message:"Congratulations, your account has been successfully created."
                if (text == "Congratulations, your account has been successfully created.") {
                    signIn();
                    clearData();
                    showAlert(text, successStyleAlert());
                    setTimeout(function () {
                        hideAlert();
                    }, 5000); //hide alert automatically after 5sec
                } else {
                    showAlert(text, warningStyleAlert());
                    setTimeout(function () {
                        hideAlert();
                    }, 5000); //hide alert automatically after 5sec
                }

            },
            error: function (jqXHR) {
                showAlert(jqXHR.responseText, warningStyleAlert());
                setTimeout(function () {
                    hideAlert();
                }, 5000); //hide alert automatically after 5sec
            }
        });

    } else {
        //If evrything is NOT OK
        showAlert("Warning: Passwords did not match!", warningStyleAlert());
        setTimeout(function () {
            hideAlert();
        }, 5000); //hide alert automatically after 5sec
    }
})