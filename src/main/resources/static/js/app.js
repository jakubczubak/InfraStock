let sidebarBtn = document.querySelector('#btn');
let sidebar = document.querySelector(".sidebar");

sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});
