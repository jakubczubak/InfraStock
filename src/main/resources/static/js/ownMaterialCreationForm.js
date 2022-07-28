const own_material_plate_inputs = document.getElementById('own_material_plate_inputs');
const own_material_tube_inputs = document.getElementById('own_material_tube_inputs');
const own_material_rod_inputs = document.getElementById('own_material_rod_inputs');

const own_material_plate_btn = document.getElementById('own_material_plate_btn');
const own_material_tube_btn = document.getElementById('own_material_tube_btn');
const own_material_rod_btn = document.getElementById('own_material_rod_btn');

const own_material_x_dimension = document.getElementById("own_material_x_dimension");
const own_material_y_dimension = document.getElementById("own_material_y_dimension");
const own_material_z_dimension = document.getElementById("own_material_z_dimension");
const own_material_D_outer_dimension = document.getElementById("own_material_D_outer_dimension");
const own_material_d_inner_dimension = document.getElementById("own_material_d_inner_dimension");
const own_material_length_dimension = document.getElementById("own_material_length_dimension");
const own_material_d_dimension = document.getElementById("own_material_d_dimension");
const own_material_length_rod_dimension = document.getElementById("own_material_length_rod_dimension");

own_material_plate_btn.addEventListener('click', function (){
    own_material_plate_inputs.classList.remove('hide');
    own_material_plate_inputs.classList.add('show');
    own_material_tube_inputs.classList.remove('show');
    own_material_tube_inputs.classList.add('hide');
    own_material_rod_inputs.classList.remove('show');
    own_material_rod_inputs.classList.add('hide');

    own_material_D_outer_dimension.value="";
    own_material_d_inner_dimension.value="";
    own_material_length_dimension.value="";
    own_material_d_dimension.value="";
    own_material_length_rod_dimension.value="";
});
own_material_tube_btn.addEventListener('click', function (){
    own_material_plate_inputs.classList.remove('show');
    own_material_plate_inputs.classList.add('hide');
    own_material_tube_inputs.classList.remove('hide');
    own_material_tube_inputs.classList.add('show');
    own_material_rod_inputs.classList.remove('show');
    own_material_rod_inputs.classList.add('hide');


    own_material_x_dimension.value="";
    own_material_y_dimension.value="";
    own_material_z_dimension.value="";
    own_material_d_dimension.value="";
    own_material_length_rod_dimension.value="";
});
own_material_rod_btn.addEventListener('click', function (){
    own_material_plate_inputs.classList.remove('show');
    own_material_plate_inputs.classList.add('hide');
    own_material_tube_inputs.classList.remove('show');
    own_material_tube_inputs.classList.add('hide');
    own_material_rod_inputs.classList.remove('hide');
    own_material_rod_inputs.classList.add('show');



    own_material_x_dimension.value="";
    own_material_y_dimension.value="";
    own_material_z_dimension.value="";
    own_material_D_outer_dimension.value="";
    own_material_d_inner_dimension.value="";
});

const own_material_description = document.getElementById('own_material_description');
const own_material_quantity = document.getElementById('own_material_quantity');
const own_material_density = document.getElementById('own_material_density');
const own_material_price = document.getElementById('own_material_price');
const own_material_only_price = document.getElementById('own_material_only_price');


function createOwnMaterial(){
    let singleMassForPlate = (own_material_density.value * own_material_x_dimension.value * own_material_y_dimension.value * own_material_z_dimension.value / 1000000).toFixed(3);
    let singleMassForRod = (own_material_density.value * Math.PI * Math.pow((own_material_d_dimension.value / 2), 2) * own_material_length_rod_dimension.value / 1000000).toFixed(3);
    let singleMassForTube = (own_material_density.value * Math.PI * (Math.pow((own_material_D_outer_dimension.value / 2), 2) - Math.pow((own_material_d_inner_dimension.value / 2), 2)) * own_material_length_dimension.value / 1000000).toFixed(3);


    let singleMass = 0;

    if(singleMassForPlate > 0){
        singleMass = singleMassForPlate;
    }else if( singleMassForRod > 0) {
        singleMass = singleMassForRod;
    }else {
        singleMass = singleMassForTube;
    }

    let materialValue = singleMass * own_material_price.value * own_material_quantity.value;


    if(own_material_only_price.value !== 0){
        materialValue = own_material_only_price.value
    }


    const calculation = JSON.parse(sessionStorage.calculation);
    const material = {
        description : own_material_description.value,
        quantity : own_material_quantity.value,
        value : materialValue
    }
    calculation.materialList.push(material);
    sessionStorage.setItem('calculation', JSON.stringify(calculation));
    printMaterialsInCalculationCreationForm();
    own_material_creation_form_popup.classList.remove('active');


    own_material_x_dimension.value="";
    own_material_y_dimension.value="";
    own_material_z_dimension.value="";

    own_material_D_outer_dimension.value="";
    own_material_d_inner_dimension.value="";
    own_material_length_dimension.value="";
    own_material_d_dimension.value="";
    own_material_length_rod_dimension.value="";

    own_material_description.value="";
    own_material_quantity.value="";
    own_material_density.value="";
    own_material_price.value="";
    own_material_only_price.value="";

}

function printMaterialsInCalculationCreationForm(){
    const calculation = JSON.parse(sessionStorage.calculation);
    const new_calculation_creation_form_table_tbody = document.getElementById('new_calculation_creation_form_table_tbody');
    let materialsItemsWrapperInnerHTML = "";




    calculation.materialList.forEach(function (material, index){
        materialsItemsWrapperInnerHTML += `
        <tr>
                            <td class="material-list-number">${index+1}</td>
                            <td>${material.description}</td>
                            <td>${material.quantity}</td>
                            <td>${material.value}<strong> PLN</strong></td>
                            <td><img src="/icons/del_table.svg" alt="" onclick="deleteMaterialFromCalculationForm(${index})"
                                     title="Delete"></td>
        </tr>
        `
    })

    new_calculation_creation_form_table_tbody.innerHTML = materialsItemsWrapperInnerHTML;
}

function deleteMaterialFromCalculationForm(id){
    const calculation = JSON.parse(sessionStorage.calculation);
    calculation.materialList.splice(id,1);
    sessionStorage.setItem('calculation', JSON.stringify(calculation));
    printMaterialsInCalculationCreationForm();
}


