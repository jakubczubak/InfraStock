
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
printMaterials();
}

function updateMaterial(id){
    console.log("edytujemy material: " + id);
    addMaterialItem.classList.toggle("active");

    materialDescription.value = "";
    quantity.value="";
    minimumQuantity.value="";



    let updateMaterial = {
        id : id,
        materialName : materialDescription.value,
        quantity : quantity.value,
        minQuantity : minimumQuantity.value,
        category : materialCategory.value,
    };

    //dokonczyc
    printMaterials();
}