const materialAddItemCancelBtn = document.getElementById("material-add-item-cancel-btn");
const addMaterialItem = document.getElementById("addMaterialItem");
const createNewMaterial = document.getElementById("createNewMaterial");
const addNewMaterialItemForm = document.getElementById("addMaterialItemForm");


materialAddItemCancelBtn.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
});

createNewMaterial.addEventListener("click", function () {
    addMaterialItem.classList.toggle("active");
});


addNewMaterialItemForm.addEventListener("submit", e => {
    e.preventDefault();


    let newMaterial = {
        categoryName : categoryNameInput.value
    };

    $.ajax({
        type: 'POST',
        url: '/materials/add',
        data: JSON.stringify(newCategory),
        contentType: "application/json",
        success: function (text) {
            addMaterialCategorySection.classList.remove("active");
            categoryNameInput.value = "";
            showAlert(text, successStyleAlert());
            setTimeout(function () {
                hideAlert();
            }, 5000); //hide alert automatically after 5sec
        },
        error: function (jqXHR) {
            addMaterialCategorySection.classList.remove("active");
            categoryNameInput.value = "";
            showAlert(jqXHR.responseText, warningStyleAlert());
            setTimeout(function () {
                hideAlert();
            }, 5000); //hide alert automatically after 5sec
        }
    });
});
