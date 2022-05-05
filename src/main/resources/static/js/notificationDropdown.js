const notificationDropdown = document.getElementById("notificationDropdown");
const notificationButton = document.getElementById('notificationButton');

notificationButton.addEventListener('click', function () {
    notificationDropdown.classList.toggle('active');
});