
const addMaterialCategoryForm = document.getElementById("addMaterialCategoryForm");
const materialAddCategoryCancelBtn = document.getElementById("material-add-category-cancel-btn");
const addMaterialCategorySection = document.getElementById("addMaterialCategory");
const addMaterialCategoryBtn = document.getElementById("add-material-category");
const categoryNameInput = document.getElementById("categoryName");



materialAddCategoryCancelBtn.addEventListener("click", function () {
    addMaterialCategorySection.classList.remove("active");
});

addMaterialCategoryBtn.addEventListener("click", function () {
    addMaterialCategorySection.classList.add("active");
});


addMaterialCategoryForm.addEventListener("submit", e => {
    e.preventDefault();


    let newCategory = {
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
