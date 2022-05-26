const new_material_btn = document.getElementById('new_material_btn')
const new_material_creation_form_popup = document.getElementById('new_material_creation_form_popup');
const new_material_creation_form_popup_create_btn = document.getElementById("new_material_creation_form_popup_create_btn");
const new_material_creation_form_popup_close_btn = document.getElementById("new_material_creation_form_popup_close_btn");

const plate_btn = document.getElementById('plate_btn');
const tube_btn = document.getElementById('tube_btn');
const rod_btn = document.getElementById('rod_btn');

const plate_inputs = document.getElementById('plate_inputs');
const tube_inputs = document.getElementById('tube_inputs');
const rod_inputs = document.getElementById('rod_inputs');

plate_btn.addEventListener('click', function (){
plate_inputs.classList.remove('hide');
plate_inputs.classList.add('show');
tube_inputs.classList.remove('show');
tube_inputs.classList.add('hide');
rod_inputs.classList.remove('show');
rod_inputs.classList.add('hide');

    D_outer_dimension.value="";
    d_inner_dimension.value="";
        length_dimension.value="";
        d_dimension.value="";
        length_rod_dimension.value="";
})
tube_btn.addEventListener('click', function (){
    plate_inputs.classList.remove('show');
    plate_inputs.classList.add('hide');
    tube_inputs.classList.remove('hide');
    tube_inputs.classList.add('show');
    rod_inputs.classList.remove('show');
    rod_inputs.classList.add('hide');


x_dimension.value="";
y_dimension.value="";
z_dimension.value="";
    d_dimension.value="";
    length_rod_dimension.value="";
})
rod_btn.addEventListener('click', function (){
    plate_inputs.classList.remove('show');
    plate_inputs.classList.add('hide');
    tube_inputs.classList.remove('show');
    tube_inputs.classList.add('hide');
    rod_inputs.classList.remove('hide');
    rod_inputs.classList.add('show');
    x_dimension.value="";
    y_dimension.value="";
    z_dimension.value="";
    D_outer_dimension.value="";
    d_inner_dimension.value="";
})


const materialDescription = document.getElementById("material_description");
const quantity = document.getElementById("quantity");
const minimumQuantity = document.getElementById("minimum_quantity");
const materialCategory = document.getElementById("material_categories");
const x_dimension = document.getElementById("x_dimension");
const y_dimension = document.getElementById("y_dimension");
const z_dimension = document.getElementById("z_dimension");
const D_outer_dimension = document.getElementById("D_outer_dimension");
const d_inner_dimension = document.getElementById("d_inner_dimension");
const length_dimension = document.getElementById("length_dimension");
const d_dimension = document.getElementById("d_dimension");
const length_rod_dimension = document.getElementById("length_rod_dimension");
const density = document.getElementById("density");
const price = document.getElementById("price");


new_material_btn.addEventListener('click', function (){
    new_material_creation_form_popup.classList.add('active');
});

new_material_creation_form_popup_close_btn.onclick =function (){
    new_material_creation_form_popup.classList.remove('active');
}


new_material_creation_form_popup_create_btn.addEventListener('click', function (){

    let newMaterial = {
        materialName: materialDescription.value,
        quantity: quantity.value,
        minQuantity: minimumQuantity.value,
        category: materialCategory.value,
        x_dimension: x_dimension.value,
        y_dimension: y_dimension.value,
        z_dimension: z_dimension.value,
        d_outer_dimension: D_outer_dimension.value,
        d_inner_dimension: d_inner_dimension.value,
        length_dimension: length_dimension.value,
        density: density.value,
        price: price.value,
        d_dimension : d_dimension.value,
        length_rod_dimension : length_rod_dimension.value
    };


    console.log(newMaterial);

});

createNewMaterial.addEventListener("click", function () {

    addMaterialFormHeader.innerText = "Create a new material position";
    submitButton.innerText = "Create";
    addMaterialItem.classList.toggle("active");
    addNewMaterialItemForm.addEventListener("submit", addMaterial);
});


function addMaterial(event) {
    event.preventDefault();


    let newMaterial = {
        materialName: materialDescription.value,
        quantity: quantity.value,
        minQuantity: minimumQuantity.value,
        category: materialCategory.value,
        x_dimension: x_dimension.value,
        y_dimension: y_dimension.value,
        z_dimension: z_dimension.value,
        d_outer_dimension: D_outer_dimension.value,
        d_inner_dimension: d_inner_dimension.value,
        length_dimension: length_dimension.value,
        density: density.value,
        price: price.value
    };


    $.ajax({
        type: 'POST',
        url: '/addMaterial',
        data: JSON.stringify(newMaterial),
        contentType: "application/json",
        success: function (text) {
            if (text == 'The material you have entered is already in DataBase') {
                addMaterialItem.classList.remove("active");
                showAlert(text, warningStyleAlert());
            } else {
                printMaterials("/materials");
                addMaterialItem.classList.remove("active");
                materialDescription.value = "";
                quantity.value = "";
                minimumQuantity.value = "";
                showAlert(text, successStyleAlert());
            }

            setTimeout(function () {
                hideAlert();
            }, 5000); //hide alert automatically after 5sec
            getNotifications();
        },
        error: function (jqXHR) {
            addMaterialItem.classList.remove("active");
            showAlert(jqXHR.responseText, warningStyleAlert());
            setTimeout(function () {
                hideAlert();
            }, 5000); //hide alert automatically after 5sec
        }
    });

    addNewMaterialItemForm.removeEventListener("submit", addMaterial);

}


