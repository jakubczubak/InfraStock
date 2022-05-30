


const clear_filters_button = document.getElementById("clear-filters-button");
const materialShoppingList = document.getElementById("materialShoppingList");

materialShoppingList.addEventListener('click', function () {
    printMaterials('/shoppingList');
});

clear_filters_button.addEventListener("click", function () {
    printMaterials("/materials");
});

const printMaterials = function printMaterials(url) {

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

            const materialsItemsWrapper = document.getElementById("materials_items");
            let materialsItemsWrapperInnerHTML = "";
            let i = -1;
            materials.forEach(function (material) {
                i++;
                let inventoryDate = material.updatedOn;
                let isLowQuantity = false;

                if (inventoryDate == null) {
                    inventoryDate = "-";
                }

                if (material.minQuantity > material.quantity) {
                    isLowQuantity = true;
                }

                if(isLowQuantity){

                    materialsItemsWrapperInnerHTML +=
                        `<tr>
                <td class="material-list-number">${i + 1}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/sad.svg" alt=""></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})"><img src="/icons/info_fill.svg" alt=""><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})"></td>
                </tr>
                `
                }else{
                    materialsItemsWrapperInnerHTML +=
                        `
                <tr>    
                <td class="material-list-number">${i + 1}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/happy.svg" alt=""></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})"><img src="/icons/info_fill.svg" alt=""><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})"></td>
                </tr>
                `
                }
            });
            materialsItemsWrapper.innerHTML=materialsItemsWrapperInnerHTML;
        });
};

printMaterials('/materials');




function deleteMaterial(id){



    const element = event.target.parentNode.parentNode;



    delete_popup.classList.add('active');
    delete_popup_cancel_btn.onclick = function () {
        delete_popup.classList.remove('active');
    };
    delete_popup_delete_btn.onclick = function () {
        fetch('/deleteMaterial?id=' + id, {
            method: 'DELETE',
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    delete_popup.classList.remove('active');
                    showErrorAlert('Error: delete material');
                    throw "Error: delete material";
                }
            }) // or res.json()
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


const edit_material_creation_form_popup = document.getElementById('edit_material_creation_form_popup');
const edit_material_creation_form_popup_update_btn = document.getElementById('edit_material_creation_form_popup_update_btn');
const edit_material_creation_form_popup_close_btn = document.getElementById('edit_material_creation_form_popup_close_btn');



const materialDescription_edit = document.getElementById("material_description_edit");
const quantity_edit = document.getElementById("quantity_edit");
const minimumQuantity_edit = document.getElementById("minimum_quantity_edit");
const materialCategory_edit = document.getElementById("material_categories_edit");
const x_dimension_edit = document.getElementById("x_dimension_edit");
const y_dimension_edit = document.getElementById("y_dimension_edit");
const z_dimension_edit = document.getElementById("z_dimension_edit");
const D_outer_dimension_edit = document.getElementById("D_outer_dimension_edit");
const d_inner_dimension_edit = document.getElementById("d_inner_dimension_edit");
const length_dimension_edit = document.getElementById("length_dimension_edit");
const d_dimension_edit = document.getElementById("d_dimension_edit");
const length_rod_dimension_edit = document.getElementById("length_rod_dimension_edit");
const density_edit = document.getElementById("density_edit");
const price_edit = document.getElementById("price_edit");



function updateMaterial(id) {

    const element = event.target.parentNode.parentNode;
    const material_number = element.children[0].innerHTML;

    fetch("/getMaterial?id=" + id)
        .then(function (response){
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Material by id"
            }
        }).then(function (material){

       materialDescription_edit.value = material.materialName;
       quantity_edit.value = material.quantity;
       minimumQuantity_edit.value = material.minQuantity;
       materialCategory_edit.value = material.category.categoryName;
       x_dimension_edit.value = material.x_dimension;
       y_dimension_edit.value = material.y_dimension;
       z_dimension_edit.value = material.z_dimension;
       D_outer_dimension_edit.value = material.d_outer_dimension;
       d_inner_dimension_edit.value = material.d_inner_dimension;
       length_dimension_edit.value = material.length_dimension;
       density_edit.value = material.density;
       price_edit.value = material.price;
       d_dimension_edit.value = material.d_dimension;
       length_rod_dimension_edit.value = material.length_rod_dimension;

    }).then(function (material){
        edit_material_creation_form_popup.classList.add('active');

        edit_material_creation_form_popup_close_btn.onclick = function (){
            edit_material_creation_form_popup.classList.remove('active');
        }

        edit_material_creation_form_popup_update_btn.onclick = function (){

        }
    })


    //
    //
    // $.get(`/getMaterial?id=${id}`, function (data, status) {
    //
    //     materialDescription.value = `${data.materialName}`;
    //     quantity.value = `${data.quantity}`;
    //     minimumQuantity.value = `${data.minQuantity}`;
    //     materialCategory.value = `${data.category.categoryName}`;
    //     x_dimension.value = `${data.x_dimension}`;
    //     y_dimension.value = `${data.y_dimension}`;
    //     z_dimension.value = `${data.z_dimension}`;
    //     D_outer_dimension.value = `${data.d_outer_dimension}`;
    //     d_inner_dimension.value = `${data.d_inner_dimension}`;
    //     length_dimension.value = `${data.length_dimension}`;
    //     density.value = `${data.density}`;
    //     price.value = `${data.price}`;
    //
    //
    //     addMaterialFormHeader.innerText = "Update material";
    //     submitButton.innerText = "Update";
    //
    //     addMaterialItem.classList.toggle("active");
    //
    //     addNewMaterialItemForm.addEventListener("submit", updateMaterialEvent);
    //
    //     function updateMaterialEvent(event) {
    //
    //         event.preventDefault();
    //
    //
    //         let updateMaterial = {
    //             id: id,
    //             materialName: materialDescription.value,
    //             quantity: quantity.value,
    //             minQuantity: minimumQuantity.value,
    //             category: materialCategory.value,
    //             x_dimension: x_dimension.value,
    //             y_dimension: y_dimension.value,
    //             z_dimension: z_dimension.value,
    //             d_outer_dimension: D_outer_dimension.value,
    //             d_inner_dimension: d_inner_dimension.value,
    //             length_dimension: length_dimension.value,
    //             density: density.value,
    //             price: price.value
    //         };
    //
    //         console.log(updateMaterial);
    //
    //         let isLowQuantity = false;
    //
    //         if (updateMaterial.minQuantity > updateMaterial.quantity) {
    //             isLowQuantity = true;
    //         }
    //
    //
    //         $.ajax({
    //             type: 'PUT',
    //             url: `/updateMaterial`,
    //             data: JSON.stringify(updateMaterial),
    //             contentType: "application/json",
    //             success: function (text) {
    //
    //                 $.get(`/getMaterial?id=${id}`, function (data, status) {
    //                     let inventoryDate = data.updatedOn;
    //
    //                     if (inventoryDate == null) {
    //                         inventoryDate = "-";
    //                     }
    //
    //                     if (isLowQuantity) {
    //                         TRelement.replaceWith(
    //                             `<tr class="material-data">
    //                                       <td class="material-list-number">${numberInTheList}</td>
    //                                       <td>${updateMaterial.materialName}</td>
    //                                       <td>${updateMaterial.quantity}<img src="/icons/high_icon.png" alt="Check the stock quantity!" title="Check the stock quantity!"></td>
    //                                       <td>${updateMaterial.minQuantity}</td>
    //                                       <td>${updateMaterial.category}</td>
    //                                       <td>${inventoryDate}</td>
    //                                       <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="showMaterialInfoPopUp(${id})" alt="About material" title="About material"></td>
    //                                     </tr>`)
    //                     } else {
    //                         TRelement.replaceWith(
    //                             `<tr class="material-data">
    //                                       <td class="material-list-number">${numberInTheList}</td>
    //                                       <td>${updateMaterial.materialName}</td>
    //                                       <td>${updateMaterial.quantity}<img src="/icons/ok-icon.png" alt="OK" title="Correct stock quantity!"></td>
    //                                       <td>${updateMaterial.minQuantity}</td>
    //                                       <td>${updateMaterial.category}</td>
    //                                       <td>${inventoryDate}</td>
    //                                       <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="showMaterialInfoPopUp(${id})" alt="About material" title="About material"></td>
    //                                     </tr>`)
    //                     }
    //                 });
    //
    //                 addMaterialItem.classList.remove("active");
    //                 materialDescription.value = "";
    //                 quantity.value = "";
    //                 minimumQuantity.value = "";
    //                 showAlert(text, successStyleAlert());
    //                 setTimeout(function () {
    //                     hideAlert();
    //                 }, 5000); //hide alert automatically after 5sec
    //
    //                 getNotifications();
    //             },
    //             error: function (jqXHR) {
    //                 addMaterialItem.classList.remove("active");
    //                 showAlert(jqXHR.responseText, warningStyleAlert());
    //                 setTimeout(function () {
    //                     hideAlert();
    //                 }, 5000); //hide alert automatically after 5sec
    //             }
    //         });
    //
    //         addNewMaterialItemForm.removeEventListener("submit", updateMaterialEvent);
    //
    // //     }
    // });
}

