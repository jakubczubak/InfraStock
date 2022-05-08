const sidebarBtn = document.querySelector('#btn');
const sidebar = document.querySelector(".sidebar");
const userInfo = document.getElementById("userInfo");



sidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});


//Get user info from backend and display it on main page
$.get("/userInfo", function(data, status){
   userInfo.innerText= "Welcome, " + data + " !";
});

//Get notifications from backend
$.get("/notifications", function(data, status){

    let innerHTML = ``;

    if(data.length>0){
        notificationCounter.style.display="block";
        notificationCounter.innerText=data.length;

        for(let i = 0; i < data.length; i++){
            if(!data[i].checked){

                innerHTML += `<a class="notification-item" href="#" onclick="changeStatusOfNotification(${data[i].id})">${data[i].description} <img src="/icons/remove_icon.png" alt="Delete" title="Delete" onclick="deleteNotification(${data[i].id}, event)"> </a>`
            }else{

                innerHTML += `<a  class="notification-item checked"    href="#" onclick="changeStatusOfNotification(${data[i].id}))">${data[i].description}<img src="/icons/remove_icon.png" alt="Delete" title="Delete" onclick="deleteNotification(${data[i].id})"></a>`
            }
        }
        notificationContent.innerHTML = innerHTML;
    }else{
        innerHTML += `<a>No notifications!</a>`;
        notificationContent.innerHTML = innerHTML;
    }
});

