const logo_wrapper = document.getElementById('logo-wrapper');

const logout_btn = document.getElementById('logout');
const logout_popup = document.getElementById('logout_popup');
const logout_btn_confirm = document.getElementById('logout_btn_confirm');
const logout_btn_cancel = document.getElementById('logout_btn_cancel');
const dashboard_section_wrapper = document.getElementById('dashboard_section_wrapper');
const materialsBtn = document.getElementById('materialsBtn');
const material_section_wrapper = document.getElementById('material_section_wrapper');
const toolsBtn = document.getElementById('toolsBtn');
const tool_section_wrapper = document.getElementById('tool_section_wrapper');
const calculationsBtn = document.getElementById('calculationsBtn');
const calculation_section_wrapper = document.getElementById('calculation_section_wrapper');

materialsBtn.addEventListener('click', function (){
    toolsBtn.classList.remove('active');
    calculationsBtn.classList.remove('active');
    tool_section_wrapper.classList.remove('active');
    calculation_section_wrapper.classList.remove('active');
    dashboard_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.remove('active');
    materialsBtn.classList.add('active');
    material_section_wrapper.classList.add('active');
    select_material_section_wrapper.classList.remove('active')
})
toolsBtn.addEventListener('click', function (){
    materialsBtn.classList.remove('active');
    calculationsBtn.classList.remove('active');
    material_section_wrapper.classList.remove('active');
    toolsBtn.classList.add('active');
    tool_section_wrapper.classList.add('active');
    calculation_section_wrapper.classList.remove('active');
    dashboard_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.remove('active');
    select_material_section_wrapper.classList.remove('active')
})

logo_wrapper.addEventListener('click', function (){
    updateDashboard();
    toolsBtn.classList.remove('active');
    calculationsBtn.classList.remove('active');
    materialsBtn.classList.remove('active');
    material_section_wrapper.classList.remove('active');
    tool_section_wrapper.classList.remove('active');
    calculation_section_wrapper.classList.remove('active');
    dashboard_section_wrapper.classList.add('active');
    calculation_creation_form_section_wrapper.classList.remove('active');
    select_material_section_wrapper.classList.remove('active')
})

calculationsBtn.addEventListener('click', function (){
    toolsBtn.classList.remove('active');
    tool_section_wrapper.classList.remove('active');
    materialsBtn.classList.remove('active');
    calculationsBtn.classList.add('active');
    material_section_wrapper.classList.remove('active');
    tool_section_wrapper.classList.remove('active');
    dashboard_section_wrapper.classList.remove('active');
    calculation_section_wrapper.classList.add('active');
    calculation_creation_form_section_wrapper.classList.remove('active');
    select_material_section_wrapper.classList.remove('active')
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



