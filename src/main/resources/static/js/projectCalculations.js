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
const calculation_status = document.getElementById('calculation_status');
const calculation_creation_form_section_wrapper_save_btn =document.getElementById('calculation_creation_form_section_wrapper_save_btn');
const cnc_time = document.getElementById('cnc_time');
const clear_filters_btn = document.getElementById('clear_filters_btn');
const project_calculation_name = document.getElementById('project_calculation_name');
const new_calculation_creation_form_table_tbody = document.getElementById('new_calculation_creation_form_table_tbody');

clear_filters_btn.addEventListener('click', function (){
    printMaterialsInCalculationSection('/materials');
});


calculation_creation_form_section_wrapper_save_btn.addEventListener('click', function (){
    const calculation = JSON.parse(sessionStorage.calculation);

    let valueOfMaterial = 0;

    calculation.materialList.forEach(function (material){
        valueOfMaterial += parseFloat(material.value);
    });
    calculation.cncTime = cnc_time.value;
    calculation.status = calculation_status.innerText;
    calculation.materialValue = valueOfMaterial.toFixed(2);

    console.log(calculation);

    fetch("/create-calculation", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(calculation),
    })
        .then(function (response) {
            response.text().then(function (text) {
                if (response.ok){
                    calculation_creation_form_section_wrapper.classList.remove('active');
                    calculation_section_wrapper.classList.add('active');
                    showSuccessAlert(text);
                    setTimeout(function () {
                        hideSuccessAlert();
                    }, 5000); //hide alert automatically after 5sec
                }else{
                    showErrorAlert(text);
                    setTimeout(function () {
                        hideErrorAlert();
                    }, 5000); //hide alert automatically after 5sec
                }
            })
        });
});

calculation_status.addEventListener('click', function (){
 calculation_status.classList.toggle('finish');
 if(calculation_status.classList.contains('finish')){
     calculation_status.innerText = 'Finish'
 }else{
     calculation_status.innerText = 'Pending'
 }
})



new_project_calculation_btn.addEventListener('click', function (){
    project_calculation_name.value = "";
    project_calculation_creation_form_popup.classList.add('active')
});

project_calculation_creation_form_popup_create_btn.addEventListener('click', function(){
    sessionStorage.clear();
    new_calculation_creation_form_table_tbody.innerHTML = "";

    if(project_calculation_name.value.length <3){
        showErrorAlert("Project's name should have at least 3 characters");
        setTimeout(function () {
            hideErrorAlert();
        }, 5000); //hide alert automatically after 5sec
    }else{
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
    }
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
    printMaterialCategoriesInCalculationSection();
    printMaterialsInCalculationSection('/materials');
    calculation_creation_form_section_wrapper.classList.remove('active');
    select_material_section_wrapper.classList.add('active');
});

back_to_calculations_btn.addEventListener('click', function (){
    select_material_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.add('active');
})

function printMaterialCategoriesInCalculationSection() {


    fetch('/materials/categories')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Material Categories"
            }
        })
        .then(function (categories) {
            const categoriesItems = document.getElementById("calculation_categories_items");
            let categoriesItemsInnerHTML = "";
            categories.forEach(function (category) {
                categoriesItemsInnerHTML += `
                                    <div class="category_item" >
                        <h1>${category.categoryName}</h1>
                    </div>
                `
            });
            categoriesItems.innerHTML = categoriesItemsInnerHTML;
            printMaterialTableSortedByCategoryNameInCalculationSection();

        })
}

function printMaterialTableSortedByCategoryNameInCalculationSection(){
    const category_items = document.getElementsByClassName("category_item");


    for (let i = 0; i < category_items.length; i++) {

        category_items[i].addEventListener("click", function () {
            printMaterialsInCalculationSection(`/sortedMaterials?categoryName=${this.children[0].innerHTML}`);
        })
    }
}

function printMaterialsInCalculationSection(url) {

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Material list"
            }
        })
        .then(function (materials) {
            materials.sort((a, b) => (a.materialName > b.materialName) ? 1 : -1);

            const materialsItemsWrapper = document.getElementById("calculation_materials_items");
            let materialsItemsWrapperInnerHTML = "";
            let i = -1;
            materials.forEach(function (material) {


                let singleMassForPlate = (material.density * material.x_dimension * material.y_dimension *material.z_dimension / 1000000).toFixed(3);
                let singleMassForRod = (material.density * Math.PI * Math.pow((material.d_dimension / 2), 2) * material.length_rod_dimension / 1000000).toFixed(3);
                let singleMassForTube = (material.density * Math.PI * (Math.pow((material.d_outer_dimension / 2), 2) - Math.pow((material.d_inner_dimension / 2), 2)) * material.length_dimension / 1000000).toFixed(3);

                let singleMass = 0;

                if(singleMassForPlate > 0){
                    singleMass = singleMassForPlate;
                }else if( singleMassForRod > 0) {
                    singleMass = singleMassForRod;
                }else {
                    singleMass = singleMassForTube;
                }


                let singlePrice = (singleMass * material.price).toFixed(2);

                i++;

                materialsItemsWrapperInnerHTML +=
                    `<tr>
                <td class="material-list-number">${i + 1}</td>
                <td>${material.materialName}</td>
                <td>${singlePrice}<strong>PLN</strong></td>
                <td><button onclick="addMaterialToCalculation('${material.materialName}', 1, ${singlePrice})"><img src="/icons/add.svg" alt="">Add</button></td>
                </tr>
                `
            });
            materialsItemsWrapper.innerHTML = materialsItemsWrapperInnerHTML;
        });
};

function addMaterialToCalculation(description, quantity, value){
    const calculation = JSON.parse(sessionStorage.calculation);
    const material = {
        description : description,
        quantity : quantity,
        value : value
    }
    calculation.materialList.push(material);
    sessionStorage.setItem('calculation', JSON.stringify(calculation));
    printMaterialsInCalculationCreationForm();
    select_material_section_wrapper.classList.remove('active');
    calculation_creation_form_section_wrapper.classList.add('active');
}
