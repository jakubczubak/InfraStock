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


            if(data[i].isChecked = 'false'){
                innerHTML += `<a data-id=${data[i].id} href="#">${data[i].description}<img src="/icons/remove_icon.png" alt="Delete" title="Delete"> </a>`
            }else{
                innerHTML += `<a  class="checked"  data-id=${data[i].id}  href="#">${data[i].description}<img src="/icons/remove_icon.png" alt="Delete" title="Delete"></a>`
            }
        }
        notificationContent.innerHTML = innerHTML;
    }
});

