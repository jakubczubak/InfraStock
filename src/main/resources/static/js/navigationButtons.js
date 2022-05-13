const materialsBtn = document.getElementById("materials");
const dashboardBtn = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logout");
const confirmationModal = document.querySelector(".confirmationModal");
const cancelBtn = document.getElementById("cancel");
const sureBtn = document.getElementById("sure");
const logoBtn = document.getElementById("logo-wrapper");

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


logoutBtn.addEventListener('click', function () {
    confirmationModal.classList.add("active");
    sureBtn.addEventListener('click', logoutFunction);
});


cancelBtn.addEventListener('click', function () {
    confirmationModal.classList.remove("active");
});

logoBtn.addEventListener('click', getMainPage);


function logoutFunction() {
    window.location.href = "/logout";
}

function getMainPage() {
    window.location.href = "/app";
}
