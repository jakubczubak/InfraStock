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
                    //If the email exist in the database, the controller sends a message:"The email you have entered is already registered"
                    //dopisac alert
                    console.log('Response: ' + text);
                }

            },
            error: function (jqXHR) {
                console.log('Error: ' + jqXHR.responseText);
                //dopisać funkcje ktrwa wyswietli alert z tresicia bledu
            }
        });

    } else {
        //jeżeli nie to pokazujemy jakieś błędy
        showPasswordDidNotMatchAlert();
    }
})