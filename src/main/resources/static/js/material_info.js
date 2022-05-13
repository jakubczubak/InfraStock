const material_info = document.getElementById("material_info");
const material_info_close_btn = document.getElementById("material_info_close_btn");
const about_material_list = document.getElementById("about_material_list");

material_info_close_btn.addEventListener('click', function () {
    material_info.classList.remove('active');
});

function showMaterialInfoPopUp(id){
    $.get(`/getMaterial?id=${id}`, function(data, status){
    material_info.classList.add('active');
})};