const tool_category_edit_form_popup = document.getElementById('tool_category_edit_form_popup');
const tool_category_edit_form_popup_update_btn = document.getElementById('tool_category_edit_form_popup_update_btn');
const tool_category_edit_form_popup_close_btn = document.getElementById('tool_category_edit_form_popup_close_btn');
const tool_category_edit_form_popup_category_name_input = document.getElementById('tool_category_edit_form_popup_category_name_input');


function printToolCategories() {
    fetch('/tools/categories')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch tool categories"
            }
        })
        .then(function (categories) {
            const categoriesItems = document.getElementById("tool-categories-items");
            let categoriesItemsInnerHTML = "";
            categories.forEach(function (category) {
                categoriesItemsInnerHTML += `
                                    <div class="tool_category_item" >
                        <h1>${category.categoryName}</h1>
                      <img class="del" src="/icons/del.svg" alt="" onclick="deleteToolCategory(${category.id})" title="Delete">
                      <img class="edit" src="/icons/edit.svg" alt="" onclick="editToolCategory(${category.id})" title="Edit">
                    </div>
                `
            });
            categoriesItems.innerHTML = categoriesItemsInnerHTML;
            printToolTableSortedByCategoryName();
            printToolCategoriesInMaterialCreationForm();

        })
}

printToolCategories();



function printToolTableSortedByCategoryName(){
    const category_items = document.getElementsByClassName("tool_category_item");


    for (let i = 0; i < category_items.length; i++) {

        category_items[i].addEventListener("click", function () {
            // printMaterials(`/sortedMaterials?categoryName=${this.children[0].innerHTML}`);
            console.log("chuj");
        })
    }
}

function printToolCategoriesInMaterialCreationForm(){


    fetch('/tools/categories')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch tool categories"
            }
        })
        .then(function (tool_categories_list) {
            const tool_categories = document.getElementById("tool_categories");
            const tool_categories_edit = document.getElementById('tool_categories_edit');

            let innerHTML = "";
            for (let i = 0; i < tool_categories_list.length; i++) {
                let item = tool_categories_list[i];
                innerHTML += `<option value="${item.categoryName}">${item.categoryName}</option>`;
            }
            tool_categories.innerHTML = innerHTML;
            tool_categories_edit.innerHTML = innerHTML
            });
}


function deleteToolCategory(id){

    event.stopImmediatePropagation();

    const element = event.target.parentNode;

    delete_popup.classList.add('active');
    delete_popup_cancel_btn.onclick = function () {
        delete_popup.classList.remove('active');
    };
    delete_popup_delete_btn.onclick = function () {
        fetch('/tools/deleteToolCategory?id=' + id, {
            method: 'DELETE',
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    delete_popup.classList.remove('active');
                    showErrorAlert('The category has assigned materials');
                    throw "The category has assigned materials";
                }
            }) // or res.json()
            .then(res => {
                element.remove();
                printMaterialCategoriesInMaterialCreationForm()
                delete_popup.classList.remove('active');
                showInfoAlert(res);
                setTimeout(function () {
                    hideInfoAlert();
                }, 5000); //hide alert automatically after 5sec
            })
    }
}

function editToolCategory(id) {
    event.stopImmediatePropagation();

    const element = event.target.parentNode;
    const categoryName = event.target.parentNode.children[0].innerHTML;


    tool_category_edit_form_popup_category_name_input.value = categoryName;
    tool_category_edit_form_popup.classList.add('active');

    tool_category_edit_form_popup_close_btn.onclick =function () {
        tool_category_edit_form_popup.classList.remove('active');
    };

    tool_category_edit_form_popup_update_btn.onclick = function () {
        const updatedCategoryName = tool_category_edit_form_popup_category_name_input.value;

        let updateCategory = {
            id: id,
            categoryName: updatedCategoryName
        };
        fetch('/tools/updateTool?id=' + id, {
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
                    throw 'Error update tool category'
                }
            }) // or res.json()
            .then(res => {

                element.children[0].innerHTML=updatedCategoryName;
                tool_category_edit_form_popup.classList.remove('active');
                delete_popup.classList.remove('active');
                showInfoAlert(res);
                setTimeout(function () {
                    hideInfoAlert();
                }, 5000); //hide alert automatically after 5sec
            });
    };
}
