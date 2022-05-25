const add_material_category_btn = document.getElementById("add_material_category_btn");
const material_category_name = document.getElementById("material_category_name");
const material_category_creation_form_popup = document.getElementById('material_category_creation_form_popup');
const material_category_creation_form_popup_create_btn = document.getElementById('material_category_creation_form_popup_create_btn');
const material_category_creation_form_popup_close_btn = document.getElementById('material_category_creation_form_popup_close_btn');

add_material_category_btn.addEventListener('click', function () {
    material_category_creation_form_popup.classList.add("active");
});
material_category_creation_form_popup_close_btn.addEventListener('click', function () {
    material_category_creation_form_popup.classList.remove("active");
});


material_category_creation_form_popup_create_btn.addEventListener("click", e => {

    let newCategory = {
        categoryName: material_category_name.value
    };


    fetch('/materials/addCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
    })
        .then(function (response) {
            response.text().then(function (text) {

                if (response.ok){
                    if(text === "Congratulations, you've added a new category"){
                        material_category_creation_form_popup.classList.remove("active");
                        material_category_name.value = "";
                        printMaterialCategories();
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
                }else{
                    showErrorAlert(text);
                    setTimeout(function () {
                        hideErrorAlert();
                    }, 5000); //hide alert automatically after 5sec
                }
            })

        })

});



