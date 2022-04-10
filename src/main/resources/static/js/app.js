const sidebarBtn = document.querySelector('#btn');
const sidebar = document.querySelector(".sidebar");
const userInfo = document.getElementById("userInfo");
const materialAddItemCancelBtn = document.getElementById("material-add-item-cancel-btn");
const addMaterialItem = document.getElementById("addMaterialItem");

const createNewMaterial = document.getElementById("createNewMaterial");


sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});


//Get user info from backend and display it on main page
$.get("/userInfo", function(data, status){
   userInfo.innerText= "Welcome, " + data + " !";
});



materialAddItemCancelBtn.addEventListener("click", function () {
addMaterialItem.classList.toggle("active");
});

createNewMaterial.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
});