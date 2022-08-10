const calculation_edit_form_section_wrapper_back_btn = document.getElementById('calculation_edit_form_section_wrapper_back_btn');
const calculation_edit_form_section_wrapper = document.getElementById('calculation_edit_form_section_wrapper');
const add_material_from_db_edit_form = document.getElementById('add_material_from_db_edit_form');
const back_to_calculations_btn_edit = document.getElementById('back_to_calculations_btn_edit');

calculation_edit_form_section_wrapper_back_btn.addEventListener('click', function (){
    calculation_edit_form_section_wrapper.classList.remove('active');
    calculation_section_wrapper.classList.add('active');
});

function showCalculationEditForm(id){

    fetch("/get-calculation?id=" + id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Project calculation"
            }
        })
        .then(function (calculation) {


            const calculationID = {
                id : calculation.id,
            }
            sessionStorage.setItem('calculationID', JSON.stringify(calculationID));

            const calculation_edit_form_table_tbody = document.getElementById('new_calculation_edit_form_table_tbody');
            const project_calculation_edit_cnc_time = document.getElementById('project_calculation_edit_cnc_time');
            const project_calculation_edit_name = document.getElementById('project_calculation_edit_name');
            const project_calculation_edit_status = document.getElementById('project_calculation_edit_status');


            project_calculation_edit_status.innerHTML = `Status: <button  class="${calculation.status}">${calculation.status}</button>`
            project_calculation_edit_name.value = calculation.projectName;
            project_calculation_edit_cnc_time.value = calculation.cncTime;


            let calculationsItemsWrapperInnerHTML = "";
            let i = -1;
            calculation.materialList.forEach(function (material) {
                i++;

                calculationsItemsWrapperInnerHTML +=
                    `<tr>
                <td class="material-list-number">${i + 1}</td>
                <td>${material.description}</td>
                <td>${material.quantity}</td>
                <td>${material.value}<strong> PLN</strong></td>
                <td><img src="/icons/del_table.svg" alt="" onclick="" title="Delete"></td>
                </tr>
                `
            });
            calculation_edit_form_table_tbody.innerHTML = calculationsItemsWrapperInnerHTML;

            calculation_section_wrapper.classList.remove('active');
            calculation_edit_form_section_wrapper.classList.add('active');
        });


}

function changeStatusOfCalculation(){
    const project_calculation_edit_status = document.getElementById('project_calculation_edit_status');
    project_calculation_edit_status.classList.toggle('finish');
    if(project_calculation_edit_status.classList.contains('finish')){
        project_calculation_edit_status.innerHTML = `Status: <button class="Finish">Finish</button>`
    }else{
        project_calculation_edit_status.innerHTML = `Status: <button class="Pending">Pending</button>`
    }
}


add_material_from_db_edit_form.addEventListener('click', function (){
    printMaterialCategoriesInCalculationEditSection();
    printMaterialsInCalculationEditSection('/materials');

    const select_material_edit_section_wrapper = document.getElementById('select_material_edit_section_wrapper');

    calculation_edit_form_section_wrapper.classList.remove('active');
    select_material_edit_section_wrapper.classList.add('active');

})

back_to_calculations_btn_edit.addEventListener('click', function (){
    const select_material_edit_section_wrapper = document.getElementById('select_material_edit_section_wrapper');
    select_material_edit_section_wrapper.classList.remove('active');
    calculation_edit_form_section_wrapper.classList.add('active');
})

function clearFilterInEditSection(){
    const clear_filters_btn_edit = document.getElementById('clear_filters_btn_edit');
    clear_filters_btn_edit.addEventListener('click', function (){
        printMaterialsInCalculationEditSection('/materials');
    })
}


