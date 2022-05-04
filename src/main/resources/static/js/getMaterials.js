
const addMaterialFormHeader = document.getElementById("addMaterialFormHeader");
const submitButton = document.getElementById("submitButton");
const clear_filters_button = document.getElementById("clear-filters-button");
const materialShoppingList = document.getElementById("materialShoppingList");

materialShoppingList.addEventListener('click', function () {
printMaterials('/shoppingList');
})

clear_filters_button.addEventListener("click", function () {
    printMaterials("/materials");
});

function printMaterials(url){
    $.get(`${url}`, function(data, status){

        data.sort((a,b) => (a.materialName > b.materialName) ? 1 : -1);

        const materials = document.getElementById("material-table");
        let innerHTML = "";
        for(let i = 0; i < data.length ; i++){
            let obj =(data[i]);

           let inventoryDate = obj.updatedOn;
           let isLowQuantity = false;

           if(inventoryDate == null){
               inventoryDate = "-";
           }
           if(obj.minQuantity>obj.quantity){
               isLowQuantity=true;
           }

           if(isLowQuantity){
               innerHTML += `<tr class="material-data">
                <td class="material-list-number">${i+1}</td>
                <td>${obj.materialName}</td>
                <td>${obj.quantity}<img src="/icons/high_icon.png" alt="Check the stock quantity!" title="Check the stock quantity!"></td>
                <td>${obj.minQuantity}</td>
                <td>${obj.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${obj.id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${obj.id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="" alt="About material" title="About material"></td>
            </tr>`;
           }else{
               innerHTML += `<tr class="material-data">
                <td class="material-list-number">${i+1}</td>
                <td>${obj.materialName}</td>
                <td>${obj.quantity}<img src="/icons/ok-icon.png" alt="OK" title="Correct stock quantity!"></td>
                <td>${obj.minQuantity}</td>
                <td>${obj.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${obj.id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${obj.id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="" alt="About material" title="About material"></td>
            </tr>`;
           }

        }
        materials.innerHTML = innerHTML;
    });
}

printMaterials("/materials");



function showDeleteMaterialPopUp(id) {


    let element = $(event.target).closest('.material-data');

    confirmationModal.classList.add("active");

    sureBtn.removeEventListener('click', logoutFunction);

    sureBtn.addEventListener('click', deleteMaterialListener = function() {
    deleteMaterial(id,element);
    confirmationModal.classList.remove("active");
    sureBtn.removeEventListener('click', deleteMaterialListener);
    });

}

function deleteMaterial(id, element){

        $.ajax({
            url: `/deleteMaterial?id=${id}`,
            type: 'DELETE',
            success: function(categoryName) {
                element.remove();
                showAlert("Successfully deleted",successStyleAlert());
            }
        });


    }


function updateMaterial(id){

    let TRelement = $(event.target).closest('.material-data');
    let numberInTheList = TRelement[0].querySelector('.material-list-number').innerHTML;


    $.get(`/getMaterial?id=${id}`, function(data, status){

        materialDescription.value = `${data.materialName}`;
        quantity.value=`${data.quantity}`;
        minimumQuantity.value=`${data.minQuantity}`;
        materialCategory.value=`${data.category.categoryName}`;


        addMaterialFormHeader.innerText="Update material";
        submitButton.innerText="Update";

        addMaterialItem.classList.toggle("active");

        addNewMaterialItemForm.addEventListener("submit", updateMaterialEvent);

        function updateMaterialEvent(event){

            event.preventDefault();


            let updateMaterial = {
                id : id,
                materialName : materialDescription.value,
                quantity : quantity.value,
                minQuantity : minimumQuantity.value,
                category : materialCategory.value,
            };


            let isLowQuantity = false;

            if(updateMaterial.minQuantity>updateMaterial.quantity){
                isLowQuantity=true;
            }


            $.ajax({
                type: 'PUT',
                url: `/updateMaterial?id=${id}`,
                data: JSON.stringify(updateMaterial),
                contentType: "application/json",
                success: function (text) {

                    $.get(`/getMaterial?id=${id}`, function(data, status) {
                        let inventoryDate = data.updatedOn;

                        if(inventoryDate == null){
                            inventoryDate = "-";
                        }

                        if(isLowQuantity){
                            TRelement.replaceWith(
                                `<tr class="material-data">
                                          <td class="material-list-number">${numberInTheList}</td>
                                          <td>${updateMaterial.materialName}</td>
                                          <td>${updateMaterial.quantity}<img src="/icons/high_icon.png" alt="Check the stock quantity!" title="Check the stock quantity!"></td>
                                          <td>${updateMaterial.minQuantity}</td>
                                          <td>${updateMaterial.category}</td>
                                          <td>${inventoryDate}</td>
                                          <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="" alt="About material" title="About material"></td>
                                        </tr>`)
                        }else{
                            TRelement.replaceWith(
                                `<tr class="material-data">
                                          <td class="material-list-number">${numberInTheList}</td>
                                          <td>${updateMaterial.materialName}</td>
                                          <td>${updateMaterial.quantity}<img src="/icons/ok-icon.png" alt="OK" title="Correct stock quantity!"></td>
                                          <td>${updateMaterial.minQuantity}</td>
                                          <td>${updateMaterial.category}</td>
                                          <td>${inventoryDate}</td>
                                          <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="" alt="About material" title="About material"></td>
                                        </tr>`)
                        }
                    });

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

            addNewMaterialItemForm.removeEventListener("submit", updateMaterialEvent);

        }
    });
}

