const notificationDropdown = document.getElementById("notificationDropdown");
const notificationButton = document.getElementById('notificationButton');
const notificationCounter = document.getElementById('icon-button__badge');
const notificationContent = document.getElementById('notificationContent');

notificationButton.addEventListener('click', function () {
    notificationDropdown.classList.toggle('active');
});

document.addEventListener('mouseup', function(e) {

    if (!notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('active');
    }
});

function getNotifications(){
    $.get("/notifications", function(data, status){
        data.reverse();

        let innerHTML = ``;

        if(data.length>0){
            notificationCounter.style.display="block";
            notificationCounter.innerText=data.length;

            for(let i = 0; i < data.length; i++){
                if(!data[i].checked){

                    innerHTML += `<a class="notification-item" href="#" onclick="changeStatusOfNotification(${data[i].id})"><p class="notification-date">${data[i].createdOn}</p>${data[i].description} <img src="/icons/remove_icon.png" alt="Delete" title="Delete" onclick="deleteNotification(${data[i].id}, event)"> </a>`
                }else{

                    innerHTML += `<a  class="notification-item checked"    href="#" onclick="changeStatusOfNotification(${data[i].id}))"><p class="notification-date">${data[i].createdOn}</p>${data[i].description}<img src="/icons/remove_icon.png" alt="Delete" title="Delete" onclick="deleteNotification(${data[i].id},event)"></a>`
                }
            }
            notificationContent.innerHTML = innerHTML;
        }else{
            innerHTML += `<a>No notifications!</a>`;
            notificationContent.innerHTML = innerHTML;
        }
    });
}


function changeStatusOfNotification(id) {

    let element = $(event.target).closest('.notification-item');
    $.ajax({
        type: 'PUT',
        url: `/changeStatus?id=${id}`,
        success: function (text) {
            element.addClass('checked');
        },
        error: function (jqXHR) {
        }
    });
}

function deleteNotification(id,event){
    event.stopPropagation();
    let element = $(event.target).closest('.notification-item');
    $.ajax({
        url: `/deleteNotification?id=${id}`,
        type: 'DELETE',
        success: function() {
            element.remove();
            checkIfNotificationsExist();
        }
    });


}

function checkIfNotificationsExist() {
    $.get("/notifications", function(data, status){
        notificationCounter.innerText=data.length;
        if(data.length<1){
            notificationCounter.style.display="none";
            notificationContent.innerHTML = `<a>No notification!</a>`;
        }
    });
}