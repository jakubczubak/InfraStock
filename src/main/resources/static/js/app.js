let sidebarBtn = document.querySelector('#btn');
let sidebar = document.querySelector(".sidebar");
let userInfo = document.getElementById("userInfo");
let materialAddCategoryCancelBtn = document.getElementById("material-add-category-cancel-btn");
let addMaterialCategorySection = document.getElementById("addMaterialCategory");
let addMaterialCategoryBtn = document.getElementById("add-material-category");


sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});


//Get user info from backend and display it on main page
$.get("/userInfo", function(data, status){
   userInfo.innerText= "Welcome, " + data + " !";
});

materialAddCategoryCancelBtn.addEventListener("click", function () {
addMaterialCategorySection.classList.remove("active");
});

addMaterialCategoryBtn.addEventListener("click", function () {
    addMaterialCategorySection.classList.add("active");
})