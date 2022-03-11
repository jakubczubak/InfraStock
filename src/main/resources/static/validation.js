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

    //jeżeli wszystko ok to wysyłamy
    if (input_password.value === input_confirm_password.value) {

        $.ajax({
            type: 'POST',
            url: '/register',
            data: JSON.stringify(newUser),
            contentType: "application/json",
            success: function (text) {
                //If the email does not exist in the database, the controller sends a message:"Congratulations, your account has been successfully created."
                if(text=="Congratulations, your account has been successfully created."){
                    console.log('Response: ' + text);
                    signIn();
                    clearData();
                    showNewUserAlert();
                }else{
                    showValidationAlert(text);
                    console.log('Response: ' + text);
                }

            },
            error: function (jqXHR) {
                showValidationAlert(jqXHR.responseText);
                console.log('Error: ' + jqXHR.responseText);
            }
        });

    } else {
        //jeżeli nie to pokazujemy jakieś błędy
        showPasswordDidNotMatchAlert();
    }
})