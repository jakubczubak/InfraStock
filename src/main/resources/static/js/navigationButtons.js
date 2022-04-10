
const materialsBtn = document.getElementById("materials");
const dashboardBtn = document.getElementById("dashboard");

const materialsWarehouseSection = document.querySelector(".material-warehouse");

dashboardBtn.addEventListener("click", function () {
console.log("dashboard");
    materialsWarehouseSection.classList.remove("active");
    materialsBtn.classList.remove("activeBtn");
    dashboardBtn.classList.add("activeBtn");
});

materialsBtn.addEventListener("click", function () {
    materialsWarehouseSection.classList.add("active");
    materialsBtn.classList.add("activeBtn");
    dashboardBtn.classList.remove("activeBtn");
});
