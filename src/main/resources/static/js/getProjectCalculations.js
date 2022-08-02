function printProjectCalculations(){

    fetch("/get-calculation-list")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch Project calculation list"
            }
        })
        .then(function (calculations) {
            calculations.sort((a, b) => (a.createdOn > b.createdOn) ? 1 : -1);

            const project_calculation_items = document.getElementById('project_calculation_items');
            let calculationsItemsWrapperInnerHTML = "";
            let i = -1;
            calculations.forEach(function (calculation) {
                i++;

                calculationsItemsWrapperInnerHTML +=
                        `<tr>
                <td class="material-list-number">${i + 1}</td>
                <td>${material.materialName}</td>
                <td>${material.quantity}<img class="face" src="/icons/sad.svg" alt="" title="Low quantity!"></td>
                <td>${material.minQuantity}</td>
                <td>${material.category.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateMaterial(${material.id})" title="Edit"><img src="/icons/info_fill.svg" alt="" onclick="showMaterialInfoPopUp(${material.id})" title="Info"><img src="/icons/del_table.svg" alt="" onclick="deleteMaterial(${material.id})" title="Delete"></td>
                </tr>
                `

            });
            project_calculation_items.innerHTML = calculationsItemsWrapperInnerHTML;
        });
}