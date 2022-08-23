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
            calculations.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : -1);

            const project_calculation_items = document.getElementById('project_calculation_items');
            let calculationsItemsWrapperInnerHTML = "";
            let i = -1;
            calculations.forEach(function (calculation) {
                i++;

                calculationsItemsWrapperInnerHTML +=
                        `<tr>
                <td class="material-list-number">${i + 1}</td>
                <td>${calculation.projectName}</td>
                <td>${calculation.createdOn}</td>
                <td>${calculation.materialValue} <strong>PLN</strong></td>
                <td>${calculation.cncTime} <strong>h</strong></td>
                <td><button class="${calculation.status}">${calculation.status}</button></td>
                <td><img src="/icons/info_fill.svg" alt="" onclick="show_calculation_info(${calculation.id})" title="Info"><img src="/icons/del_table.svg" alt="" onclick="deleteProjectCalculation(${calculation.id})" title="Delete"></td>
                </tr>
                `

            });
            project_calculation_items.innerHTML = calculationsItemsWrapperInnerHTML;
        });
}