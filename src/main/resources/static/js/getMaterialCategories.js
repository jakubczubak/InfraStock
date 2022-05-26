const delete_popup = document.getElementById('delete_popup');
const delete_popup_cancel_btn = document.getElementById('delete_popup_cancel_btn');
const delete_popup_delete_btn = document.getElementById('delete_popup_delete_btn');

const material_category_edit_form_popup = document.getElementById('material_category_edit_form_popup');
const material_category_edit_form_popup_update_btn = document.getElementById('material_category_edit_form_popup_update_btn');
const material_category_edit_form_popup_close_btn = document.getElementById('material_category_edit_form_popup_close_btn');
const material_category_edit_form_popup_category_name_input = document.getElementById('material_category_edit_form_popup_category_name_input');


function printMaterialCategories() {
    fetch('/materials/categories')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Material Categories"
            }
        })
        .then(function (categories) {
            const categoriesItems = document.getElementById("categories-items");
            let categoriesItemsInnerHTML = "";
            categories.forEach(function (category) {
                categoriesItemsInnerHTML += `
                                    <div class="category_item" >
                        <h1>${category.categoryName}</h1>
                        <h3>Quantity: 15</h3>
                        <img class="del" src="/icons/del.svg" alt="asd" onclick="deleteMaterialCategory(${category.id})">
                        <img class="edit" src="/icons/edit.svg" alt="asda" onclick="editMaterialCategory(${category.id})">
                    </div>
                `
            });
            categoriesItems.innerHTML = categoriesItemsInnerHTML;
            printMaterialTableSortedByCategoryName();

            printMaterialCategoriesInMaterialCreationForm(categories);

        })
}

printMaterialCategories();



function printMaterialTableSortedByCategoryName(){
    let category_items = document.getElementsByClassName("category_item");

    for (let i = 0; i < category_items.length; i++) {

        category_items[i].addEventListener("click", function () {
            printMaterials(`/sortedMaterials?categoryName=${this.children[0].innerHTML}`);
        })
    }
}

function printMaterialCategoriesInMaterialCreationForm(material_categories_list){
    const material_categories_wrapper = document.getElementById("material_categories");
    let innerHTML = "";
    for (let i = 0; i < material_categories_list.length; i++) {
        let item = (material_categories_list[i]);
        innerHTML += `<option value="${item.categoryName}">${item.categoryName}</option>`;
    }
    material_categories_wrapper.innerHTML = innerHTML;
}


function deleteMaterialCategory(id){

    const element = event.target.parentNode;

    delete_popup.classList.add('active');
    delete_popup_cancel_btn.onclick = function () {
        delete_popup.classList.remove('active');
    };
    delete_popup_delete_btn.onclick = function () {
        fetch('/materials/deleteMaterialCategory?id=' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => {
                element.remove();
                delete_popup.classList.remove('active');
                showInfoAlert(res);
                setTimeout(function () {
                    hideInfoAlert();
                }, 5000); //hide alert automatically after 5sec
            })
    }
}

function editMaterialCategory(id) {


    const element = event.target.parentNode;
    const categoryName = event.target.parentNode.children[0].innerHTML;

    material_category_edit_form_popup_category_name_input.value = categoryName;
    material_category_edit_form_popup.classList.add('active');

    material_category_edit_form_popup_close_btn.onclick =function () {
        material_category_edit_form_popup.classList.remove('active');
    };

    material_category_edit_form_popup_update_btn.onclick = function () {
        const updatedCategoryName = material_category_edit_form_popup_category_name_input.value;

        let updateCategory = {
            id: id,
            categoryName: updatedCategoryName
        };
        fetch('/materials/updateMaterial?id=' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategoryName),
        })
            .then(res => {
                if(res.ok){
                    return res.text();
                }else{
                    throw 'Error update material category'
                }
            }) // or res.json()
            .then(res => {

                element.children[0].innerHTML=updatedCategoryName;
                material_category_edit_form_popup.classList.remove('active');
                delete_popup.classList.remove('active');
                showInfoAlert(res);
                setTimeout(function () {
                    hideInfoAlert();
                }, 5000); //hide alert automatically after 5sec
            });
    };
}
