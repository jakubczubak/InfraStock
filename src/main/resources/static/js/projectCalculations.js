const new_project_calculation_btn = document.getElementById('new_project_calculation_btn');
const calculation_creation_form_section_wrapper = document.getElementById('calculation_creation_form_section_wrapper');
const own_material_creation_form_popup = document.getElementById('own_material_creation_form_popup');
const add_your_own_material = document.getElementById('add_your_own_material');
const own_material_creation_form_popup_close_btn = document.getElementById('own_material_creation_form_popup_close_btn');
const add_material_from_db = document.getElementById('add_material_from_db');
const select_material_section_wrapper = document.getElementById('select_material_section_wrapper');
const back_to_calculations_btn = document.getElementById('back_to_calculations_btn');
const project_calculation_creation_form_popup = document.getElementById('project_calculation_creation_form_popup');
const project_calculation_creation_form_popup_create_btn = document.getElementById('project_calculation_creation_form_popup_create_btn');
const project_calculation_creation_form_popup_close_btn = document.getElementById('project_calculation_creation_form_popup_close_btn');
const calculation_creation_form_section_wrapper_back_btn = document.getElementById('calculation_creation_form_section_wrapper_back_btn');
const project_calculation_creation_form_name = document.getElementById('project_calculation_creation_form_name');



new_project_calculation_btn.addEventListener('click', function (){
    project_calculation_creation_form_popup.classList.add('active')
});

project_calculation_creation_form_popup_create_btn.addEventListener('click', function(){
    sessionStorage.clear();

    const project_calculation_name = document.getElementById('project_calculation_name');

    const calculation = {
        projectName : project_calculation_name.value,
        materialValue : '',
        cncTime : '',
        status : '',
        materialList : [],
    }

    project_calculation_creation_form_name.innerText = calculation.projectName;
    project_calculation_creation_form_popup.classList.remove('active');
    calculation_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.add('active');

    sessionStorage.setItem('calculation', JSON.stringify(calculation));
    // fetch("/create-calculation", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(calculation),
    // })
    //     .then(function (response) {
    //         response.text().then(function (text) {
    //             if (response.ok){
    //
    //                 showSuccessAlert(text);
    //                 setTimeout(function () {
    //                     hideSuccessAlert();
    //                 }, 5000); //hide alert automatically after 5sec
    //             }else{
    //                 showErrorAlert(text);
    //                 setTimeout(function () {
    //                     hideErrorAlert();
    //                 }, 5000); //hide alert automatically after 5sec
    //             }
    //         })
    //     });

});

project_calculation_creation_form_popup_close_btn.addEventListener('click', function (){
    project_calculation_creation_form_popup.classList.remove('active');

})

add_your_own_material.addEventListener('click', function (){
    own_material_creation_form_popup.classList.add('active');
});

calculation_creation_form_section_wrapper_back_btn.addEventListener('click', function (){
    calculation_creation_form_section_wrapper.classList.remove('active');
    calculation_section_wrapper.classList.add('active');


})

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


