
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
               innerHTML += `<tr>
                <td>${i+1}</td>
                <td>${obj.materialName}</td>
                <td>${obj.quantity}<img src="/icons/high_icon.png" alt="Check the stock quantity!" title="Check the stock quantity!"></td>
                <td>${obj.minQuantity}</td>
                <td>${obj.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_icon.png" onclick="updateMaterial(${obj.id})" alt="Edit material" title="Edit material"><img src="/icons/remove_icon.png" onclick="showDeleteMaterialPopUp(${obj.id})" alt="Delete material" title="Delete material"><img class="remove" src="/icons/ask.png" onclick="" alt="About material" title="About material"></td>
            </tr>`;
           }else{
               innerHTML += `<tr>
                <td>${i+1}</td>
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

    confirmationModal.classList.add("active");

    sureBtn.removeEventListener('click', logoutFunction);

    sureBtn.addEventListener('click', deleteMaterialListener = function() {
    deleteMaterial(id);
    confirmationModal.classList.remove("active");
    sureBtn.removeEventListener('click', deleteMaterialListener);
    });

}

function deleteMaterial(id){
        $.ajax({
            url: `/deleteMaterial?id=${id}`,
            type: 'DELETE',
            success: function(categoryName) {
                showAlert("Successfully deleted",successStyleAlert());
                printMaterials(`/sortedMaterials?categoryName=${categoryName}`);
            }
        });


    }


function updateMaterial(id){

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


            $.ajax({
                type: 'PUT',
                url: `/updateMaterial?id=${id}`,
                data: JSON.stringify(updateMaterial),
                contentType: "application/json",
                success: function (text) {
                    printMaterials(`/sortedMaterials?categoryName=${updateMaterial.category}`);

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

