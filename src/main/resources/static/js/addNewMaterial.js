const materialAddItemCancelBtn = document.getElementById("material-add-item-cancel-btn");
const addMaterialItem = document.getElementById("addMaterialItem");
const createNewMaterial = document.getElementById("createNewMaterial");
const addNewMaterialItemForm = document.getElementById("addMaterialItemForm");

const materialDescription = document.getElementById("material_description");
const quantity = document.getElementById("quantity");
const minimumQuantity = document.getElementById("minimum_quantity");
const materialCategory = document.getElementById("materialCategory");

const x_dimension = document.getElementById("x_dimension");
const y_dimension = document.getElementById("y_dimension");
const z_dimension = document.getElementById("z_dimension");

const D_outer_dimension = document.getElementById("D_outer_dimension");
const d_inner_dimension = document.getElementById("d_inner_dimension");
const length_dimension = document.getElementById("length_dimension");

const density = document.getElementById("density");
const price = document.getElementById("price");


materialAddItemCancelBtn.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
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


