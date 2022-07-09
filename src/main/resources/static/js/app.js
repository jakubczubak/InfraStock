const sidebar_btn = document.getElementById('sidebar_btn');
const sidebar = document.querySelector(".sidebar");
const userInfo = document.getElementById("userInfo");


sidebar_btn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});




//Get user info from backend and display it on main page
fetch('/userInfo')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
    userInfo.innerText = "Hi, " + text + "!";
});

window.addEventListener("resize", function () {
   if(window.innerWidth < 1100){
    sidebar.classList.remove('active');
}else {
       sidebar.classList.add('active');
   }
});
