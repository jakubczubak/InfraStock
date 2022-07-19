const new_project_calculation_btn = document.getElementById('new_project_calculation_btn');
const calculation_creation_form_section_wrapper = document.getElementById('calculation_creation_form_section_wrapper');
const own_material_creation_form_popup = document.getElementById('own_material_creation_form_popup');
const add_your_own_material = document.getElementById('add_your_own_material');
const own_material_creation_form_popup_close_btn = document.getElementById('own_material_creation_form_popup_close_btn');
const add_material_from_db = document.getElementById('add_material_from_db');
const select_material_section_wrapper = document.getElementById('select_material_section_wrapper');
const back_to_calculations_btn = document.getElementById('back_to_calculations_btn');


new_project_calculation_btn.addEventListener('click', function (){
    calculation_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.add('active');
});

add_your_own_material.addEventListener('click', function (){
    own_material_creation_form_popup.classList.add('active');
});

own_material_creation_form_popup_close_btn.addEventListener('click', function (){
    own_material_creation_form_popup.classList.remove('active');
});

add_material_from_db.addEventListener('click', function (){
    calculation_creation_form_section_wrapper.classList.remove('active');
    select_material_section_wrapper.classList.add('active');
});

back_to_calculations_btn.addEventListener('click', function (){
    select_material_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.add('active');
})


