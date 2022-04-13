const materialAddItemCancelBtn = document.getElementById("material-add-item-cancel-btn");
const addMaterialItem = document.getElementById("addMaterialItem");
const createNewMaterial = document.getElementById("createNewMaterial");
const addNewMaterialItemForm = document.getElementById("addMaterialItemForm");

const materialDescription  = document.getElementById("material_description");
const quantity = document.getElementById("quantity");
const minimumQuantity = document.getElementById("minimum_quantity");
const materialCategory = document.getElementById("materialCategory");


materialAddItemCancelBtn.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
});

createNewMaterial.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
});


addNewMaterialItemForm.addEventListener("submit", e => {
    e.preventDefault();


    let newMaterial = {
        materialName : materialDescription.value,
        quantity : quantity.value,
        minQuantity : minimumQuantity.value,
        category : materialCategory.value,
    };


    $.ajax({
        type: 'POST',
        url: '/addMaterial',
        data: JSON.stringify(newMaterial),
        contentType: "application/json",
        success: function (text) {
            addMaterialItem.classList.remove("active");
            materialDescription.value = "";
            quantity.value="";
            minimumQuantity.value="";
            showAlert(text, successStyleAlert());
            setTimeout(function () {
                hideAlert();
            }, 5000); //hide alert automatically after 5sec
        },
        error: function (jqXHR) {
            addMaterialItem.classList.remove("active");
            showAlert(jqXHR.responseText, warningStyleAlert());
            setTimeout(function () {
                hideAlert();
            }, 5000); //hide alert automatically after 5sec
        }
    });
});
