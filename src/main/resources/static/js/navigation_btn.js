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




logout_btn.addEventListener('click', function () {
    logout_popup.classList.add('active');
});

logout_btn_cancel.addEventListener('click',function () {
    logout_popup.classList.remove('active');
});
logout_btn_confirm.addEventListener('click', function () {
    window.location.href="/logout";
});



