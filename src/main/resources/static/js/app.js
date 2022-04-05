let sidebarBtn = document.querySelector('#btn');
let sidebar = document.querySelector(".sidebar");
let userInfo = document.getElementById("userInfo");
let materialAddCategoryCancelBtn = document.getElementById("material-add-category-cancel-btn");
let materialAddItemCancelBtn = document.getElementById("material-add-item-cancel-btn");
let addMaterialCategorySection = document.getElementById("addMaterialCategory");
let addMaterialItem = document.getElementById("addMaterialItem");
let addMaterialCategoryBtn = document.getElementById("add-material-category");
let createNewMaterial = document.getElementById("createNewMaterial");


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
});

materialAddItemCancelBtn.addEventListener("click", function () {
addMaterialItem.classList.toggle("active");
});

createNewMaterial.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
});