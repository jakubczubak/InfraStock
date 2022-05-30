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

                if (isLowQuantity) {

                    materialsItemsWrapperInnerHTML +=
                        `<tr>
                <td class="material-list-number">${i + 1}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/sad.svg" alt=""></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})"><img src="/icons/info_fill.svg" alt="" onclick="showMaterialInfoPopUp(${material.id})"><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})"></td>
                </tr>
                `
                } else {
                    materialsItemsWrapperInnerHTML +=
                        `
                <tr>    
                <td class="material-list-number">${i + 1}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/happy.svg" alt=""></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})"><img src="/icons/info_fill.svg" alt="" onclick="showMaterialInfoPopUp(${material.id})"><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})"></td>
                </tr>
                `
                }
            });
            materialsItemsWrapper.innerHTML = materialsItemsWrapperInnerHTML;
        });
};

printMaterials('/materials');


function deleteMaterial(id) {


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


const plate_btn_edit = document.getElementById('plate_btn_edit');
const tube_btn_edit = document.getElementById('tube_btn_edit');
const rod_btn_edit = document.getElementById('rod_btn_edit');

const plate_inputs_edit = document.getElementById('plate_inputs_edit');
const tube_inputs_edit = document.getElementById('tube_inputs_edit');
const rod_inputs_edit = document.getElementById('rod_inputs_edit');

plate_btn_edit.addEventListener('click', function () {
    plate_inputs_edit.classList.remove('hide');
    plate_inputs_edit.classList.add('show');
    tube_inputs_edit.classList.remove('show');
    tube_inputs_edit.classList.add('hide');
    rod_inputs_edit.classList.remove('show');
    rod_inputs_edit.classList.add('hide');

    D_outer_dimension.value = "";
    d_inner_dimension.value = "";
    length_dimension.value = "";
    d_dimension.value = "";
    length_rod_dimension.value = "";
});
tube_btn_edit.addEventListener('click', function () {
    plate_inputs_edit.classList.remove('show');
    plate_inputs_edit.classList.add('hide');
    tube_inputs_edit.classList.remove('hide');
    tube_inputs_edit.classList.add('show');
    rod_inputs_edit.classList.remove('show');
    rod_inputs_edit.classList.add('hide');


    x_dimension.value = "";
    y_dimension.value = "";
    z_dimension.value = "";
    d_dimension.value = "";
    length_rod_dimension.value = "";
});
rod_btn_edit.addEventListener('click', function () {
    plate_inputs_edit.classList.remove('show');
    plate_inputs_edit.classList.add('hide');
    tube_inputs_edit.classList.remove('show');
    tube_inputs_edit.classList.add('hide');
    rod_inputs_edit.classList.remove('hide');
    rod_inputs_edit.classList.add('show');
    x_dimension.value = "";
    y_dimension.value = "";
    z_dimension.value = "";
    D_outer_dimension.value = "";
    d_inner_dimension.value = "";
});


function updateMaterial(id) {

    const element = event.target.parentNode.parentNode;

    console.log(element);
    const material_number = element.children[0].innerHTML;

    fetch("/getMaterial?id=" + id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Material by id"
            }
        }).then(function (material) {

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

        return material;

    }).then(function (material) {

        if (material.x_dimension > 0) {
            plate_inputs_edit.classList.remove('hide');
            plate_inputs_edit.classList.add('show');
            tube_inputs_edit.classList.remove('show');
            tube_inputs_edit.classList.add('hide');
            rod_inputs_edit.classList.remove('show');
            rod_inputs_edit.classList.add('hide');
        } else if (material.d_outer_dimension > 0) {
            plate_inputs_edit.classList.remove('show');
            plate_inputs_edit.classList.add('hide');
            tube_inputs_edit.classList.remove('hide');
            tube_inputs_edit.classList.add('show');
            rod_inputs_edit.classList.remove('show');
            rod_inputs_edit.classList.add('hide');
        } else {
            plate_inputs_edit.classList.remove('show');
            plate_inputs_edit.classList.add('hide');
            tube_inputs_edit.classList.remove('show');
            tube_inputs_edit.classList.add('hide');
            rod_inputs_edit.classList.remove('hide');
            rod_inputs_edit.classList.add('show');
        }

        edit_material_creation_form_popup.classList.add('active');

        edit_material_creation_form_popup_close_btn.onclick = function () {
            edit_material_creation_form_popup.classList.remove('active');
        };


        edit_material_creation_form_popup_update_btn.onclick = function () {


            let updatedMaterial = {
                id: material.id,
                materialName: materialDescription_edit.value,
                quantity: quantity_edit.value,
                minQuantity: minimumQuantity_edit.value,
                category: materialCategory_edit.value,
                x_dimension: x_dimension_edit.value,
                y_dimension: y_dimension_edit.value,
                z_dimension: z_dimension_edit.value,
                d_outer_dimension: D_outer_dimension_edit.value,
                d_inner_dimension: d_inner_dimension_edit.value,
                length_dimension: length_dimension_edit.value,
                density: density_edit.value,
                price: price_edit.value,
                d_dimension: d_dimension_edit.value,
                length_rod_dimension: length_rod_dimension_edit.value
            };


            fetch('/updateMaterial?id=' + updatedMaterial.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMaterial),
            })
                .then(function (response) {
                    response.text().then(function (text) {
                        if(response.ok){
                            fetch("/getMaterial?id=" + updatedMaterial.id)
                                .then(function (response) {
                                    if (response.ok) {
                                        return response.json();
                                    } else {

                                        throw "Error fetch Material by id"
                                    }
                                }).then(function (material) {

                                let inventoryDate = material.updatedOn;
                                let isLowQuantity = false;

                                if (inventoryDate == null) {
                                    inventoryDate = "-";
                                }

                                if (material.minQuantity > material.quantity) {
                                    isLowQuantity = true;
                                }

                                if (isLowQuantity) {

                                    element.innerHTML = (
                                        `<tr>
                <td>${material_number}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/sad.svg" alt=""></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})"><img src="/icons/info_fill.svg" alt="" onclick="showMaterialInfoPopUp(${material.id})"><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})"></td>
                </tr>
                `)
                                } else {
                                    element.innerHTML = (
                                        `
                <tr>    
                <td>${material_number}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/happy.svg" alt=""></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})"><img src="/icons/info_fill.svg" alt="" onclick="showMaterialInfoPopUp(${material.id})"><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})"></td>
                </tr>
                `)
                                }
                                edit_material_creation_form_popup.classList.remove('active');
                                showInfoAlert(text);
                                setTimeout(function () {
                                    hideInfoAlert();
                                }, 5000); //hide alert automatically after 5sec
                            });
                        }else{
                            showErrorAlert(text);
                            setTimeout(hideErrorAlert,1000);
                        }
                    })
                })

        }
    })
}




