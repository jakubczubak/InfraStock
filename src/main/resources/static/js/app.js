const sidebarBtn = document.querySelector('#btn');
const sidebar = document.querySelector(".sidebar");
const userInfo = document.getElementById("userInfo");



sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});


//Get user info from backend and display it on main page
$.get("/userInfo", function(data, status){
   userInfo.innerText= "Welcome, " + data + " !";
});



