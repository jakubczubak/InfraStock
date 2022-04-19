
const addMaterialFormHeader = document.getElementById("addMaterialFormHeader");
const submitButton = document.getElementById("submitButton");

function printMaterials(){
    $.get("/materials", function(data, status){
        const materials = document.getElementById("material-table");
        let innerHTML = "";
        for(let i = 0; i < data.length ; i++){
            let obj =(data[i]);
            innerHTML += `<tr>
                <td>${i+1}</td>
                <td>${obj.materialName}</td>
                <td>${obj.quantity}</td>
                <td>${obj.minQuantity}</td>
                <td>${obj.category.categoryName}</td>
                <td><img class="edit" src="/icons/edit_icon.png" onclick="updateMaterial(${obj.id})"><img class="remove" src="/icons/remove_icon.png" onclick="deleteMaterial(${obj.id})"></td>
            </tr>`;
        }
        materials.innerHTML = innerHTML;
    });
}

printMaterials();


function deleteMaterial(id) {
console.log("usuwamy detal: " + id);


    $.ajax({
        url: `/deleteMaterial?id=${id}`,
        type: 'DELETE',
        success: function(text) {
            showAlert(text,successStyleAlert());
            printMaterials();
        }
    });

}

function updateMaterial(id){

    $.get(`/getMaterial?id=${id}`, function(data, status){

        materialDescription.value = `${data.materialName}`;
        quantity.value=`${data.quantity}`;
        minimumQuantity.value=`${data.minQuantity}`;
        materialCategory.value=`${data.category.categoryName}`;


        addMaterialFormHeader.innerText="UPDATE MATERIAL";
        submitButton.innerText="UPDATE";

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
                    printMaterials();

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

            printMaterials();
        }
    });
}

