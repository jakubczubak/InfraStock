const notificationDropdown = document.getElementById('notificationDropdown');
const notificationButton = document.getElementById('notificationButton');
const notificationCounter = document.getElementById('notificationCounter');
const notificationContent = document.getElementById('notificationContent');

notificationButton.addEventListener('click', function () {
    notificationDropdown.classList.add('active');
    notificationCounter.classList.remove('active');
});

document.addEventListener('mouseup', function (e) {
    if (!notificationDropdown.contains(e.target)) {
        notificationDropdown.classList.remove('active');
    }
});

fetch('/notifications')
    .then(function (response){
        return response.json();
    }).then(function (notifications){

        console.log(notifications);
        notifications.reverse();

        let innerHTML = ``;

        if(notifications.length > 0){
            console.log('jest wieksze');
            notificationCounter.classList.add('active');
            notificationCounter.innerText = notifications.length;

            notifications.forEach(function (notification){
                if (notification.checked) {
                    innerHTML += `<div class="notification" onclick="changeStatusOfNotification(${notification.id})">
                            <p class="text checked">${notification.description}</p>
                            <p class="date">${notification.createdOn}</p>
                            <img src="/icons/del_table.svg" alt="">
                        </div>`
                } else {

                    innerHTML += `<div class="notification" onclick="changeStatusOfNotification(${notification.id})">
                            <p class="text">${notification.description}</p>
                            <p class="date">${notification.createdOn}</p>
                            <img src="/icons/del_table.svg" alt="">
                        </div>`
                }
            })

            notificationContent.innerHTML = innerHTML;
        }else{
            innerHTML =
            notificationContent.innerHTML = innerHTML;
        }

})


function changeStatusOfNotification(id) {
   const element = event.target.parentNode.children[0];

    fetch('/changeStatus?id=' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (){
        element.classList.add('checked');
    }).catch(function (){
        throw 'Error change status of notification'
    })
}

function deleteNotification(id, event) {
    event.stopPropagation();
    let element = $(event.target).closest('.notification-item');
    $.ajax({
        url: `/deleteNotification?id=${id}`,
        type: 'DELETE',
        success: function () {
            element.remove();
            checkIfNotificationsExist();
        }
    });


}

function checkIfNotificationsExist() {
    $.get("/notifications", function (data, status) {
        notificationCounter.innerText = data.length;
        if (data.length < 1) {
            notificationCounter.style.display = "none";
            notificationContent.innerHTML = `<a>No notification!</a>`;
        }
    });
}