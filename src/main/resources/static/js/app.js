let sidebarBtn = document.querySelector('#btn');
let sidebar = document.querySelector(".sidebar");
let userInfo = document.getElementById("userInfo");

sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});


//Get user info from backend and display it on main page
$.get("/userInfo", function(data, status){
   userInfo.innerText=data;
});