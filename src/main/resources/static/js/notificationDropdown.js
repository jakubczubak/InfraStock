const notificationDropdown = document.getElementById("notificationDropdown");
const notificationButton = document.getElementById('notificationButton');
const notificationCounter = document.getElementById('icon-button__badge');

notificationButton.addEventListener('click', function () {
    notificationDropdown.classList.toggle('active');
});

document.addEventListener('mouseup', function(e) {

    if (!notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('active');
    }
});