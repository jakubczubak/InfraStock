let sidebar = document.querySelector('.sidebar')

sidebar.addEventListener("mouseover", function () {
    sidebar.classList.add("active");
})

sidebar.addEventListener("mouseout", function () {
    sidebar.classList.remove("active");
})