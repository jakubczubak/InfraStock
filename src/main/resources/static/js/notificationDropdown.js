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

        let innerHTML = ``;

        if(data.length>0){
            notificationCounter.style.display="block";
            notificationCounter.innerText=data.length;

            for(let i = 0; i < data.length; i++){


                if(data[i].isChecked = 'false'){
                    innerHTML += `<a class="notification-item" href="#" onclick="changeStatusOfNotification(${data[i].id})">${data[i].description} <img src="/icons/remove_icon.png" alt="Delete" title="Delete" onclick="deleteNotification(${data[i].id}, event)"> </a>`
                }else{
                    innerHTML += `<a  class="notification-item checked"    href="#" onclick="changeStatusOfNotification(${data[i].id}))">${data[i].description}<img src="/icons/remove_icon.png" alt="Delete" title="Delete" onclick="deleteNotification(${data[i].id})"></a>`
                }
            }
            notificationContent.innerHTML = innerHTML;
        }
    });
}


function changeStatusOfNotification(id) {

    let element = $(event.target).closest('.notification-item');

    console.log("zmiana statusu");
    console.log(element);
    // $.ajax({
    //     type: 'PUT',
    //     url: `/changeStatus?id=${id}`,
    //     success: function (text) {
    //         element.addClass('checked');
    //     },
    //     error: function (jqXHR) {
    //     }
    // });
}

function deleteNotification(id,event){
    event.stopPropagation();
    let element = $(event.target).closest('.notification-item');

    console.log("usuwam");
    console.log(element);
    element.remove();
    // $.ajax({
    //     url: `/deleteNotification?id=${id}`,
    //     type: 'DELETE',
    //     success: function(c) {
    //         element.remove();
    //     }
    // });


}