const logout_btn = document.getElementById('logout');
const logout_popup = document.getElementById('logout_popup');
const logout_btn_confirm = document.getElementById('logout_btn_confirm');
const logout_btn_cancel = document.getElementById('logout_btn_cancel');
const material_section_wrapper = document.querySelector(".material_section_wrapper");
const tool_section_wrapper = document.querySelector(".tool_section_wrapper");
const materialsBtn = document.getElementById('materialsBtn');
const toolsBtn = document.getElementById('toolsBtn');

materialsBtn.addEventListener('click', function (){
    materialsBtn.classList.add('active');
    material_section_wrapper.classList.add('active');
    toolsBtn.classList.remove('active');
    tool_section_wrapper.classList.remove('active');
})
toolsBtn.addEventListener('click', function (){
    materialsBtn.classList.remove('active');
    material_section_wrapper.classList.remove('active');
    toolsBtn.classList.add('active');
    tool_section_wrapper.classList.add('active');
})




const material_nav_btn = document.getElementById('material_nav_btn');
const tool_nav_btn = document.getElementById('tool_nav_btn');
const material_section_wrapper = document.getElementById('material_section_wrapper');
const tool_section_wrapper = document.getElementById('tool_section_wrapper');

material_nav_btn.addEventListener('click', function (ev) {
    material_nav_btn.classList.add('active');
    tool_section_wrapper.style.display='none';
    material_section_wrapper.style.display='revert';
    tool_nav_btn.classList.remove('active');
});

tool_nav_btn.addEventListener('click', function (ev) {
    tool_nav_btn.classList.add('active');
    material_nav_btn.classList.remove('active');
    material_section_wrapper.style.display='none';
    tool_section_wrapper.style.display='revert';
});

logout_btn.addEventListener('click', function () {
    logout_popup.classList.add('active');
});

logout_btn_cancel.addEventListener('click',function () {
    logout_popup.classList.remove('active');
});
logout_btn_confirm.addEventListener('click', function () {
    window.location.href="/logout";
});



