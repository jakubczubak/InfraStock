const material_info = document.getElementById("material_info");
const material_info_close_btn = document.getElementById("material_info_close_btn");
const about_material_list = document.getElementById("about_material_list");

material_info_close_btn.addEventListener('click', function () {
    material_info.classList.remove('active');
});

function showMaterialInfoPopUp(id) {
    $.get(`/getMaterial?id=${id}`, function (data, status) {


        let inventoryDate = data.updatedOn;

        if (inventoryDate == null) {
            inventoryDate = "-";
        }


        let singleMassForPlate = (`${data.density}` * `${data.x_dimension}` * `${data.y_dimension}` * `${data.z_dimension}` / 1000000).toFixed(2);
        let singleMassForRod = (`${data.density}` * Math.PI * Math.pow((`${data.d_outer_dimension}`/2),2) * `${data.length_dimension}` / 1000000).toFixed(2);
        let singleMassForTube = (`${data.density}` * Math.PI * (Math.pow((`${data.d_outer_dimension}`/2),2) - Math.pow((`${data.d_inner_dimension}`/2),2)) * `${data.length_dimension}` / 1000000).toFixed(2);

        let singleMass = '';

        if(data.d_inner_dimension > 0 && data.d_outer_dimension > 0){
            singleMass=singleMassForTube;
        }else if(data.d_inner_dimension == 0 && data.d_outer_dimension > 0){
            singleMass=singleMassForRod;
        }else{
            singleMass=singleMassForPlate;
        }

        let totalMass = (`${data.quantity}` * singleMass).toFixed(2);
        let singlePrice = (singleMass * `${data.price}`).toFixed(2);
        let totalPrice = (`${data.quantity}` * singlePrice).toFixed(2);

        about_material_list.innerHTML = `
            <li>Material name: <strong>${data.materialName}</strong></li>
            <li>Stock quantity: <strong>${data.quantity}</strong></li>
            <li>Stock minimum quantity: <strong>${data.minQuantity}</strong></li>
            <li>Material category: <strong>${data.category.categoryName}</strong></li>
            <li>Last update: <strong>${inventoryDate}</strong></li>
            <li>.........................................................................................................</li>
            <li>X dimension: <strong>${data.x_dimension}mm</strong></li>
            <li>Y dimension: <strong>${data.y_dimension}mm</strong></li>
            <li>Z dimension: <strong>${data.z_dimension}mm</strong></li>
            <li>.........................................................................................................</li>
            <li>Outer diameter: <strong>&#x2300 ${data.d_outer_dimension}mm</strong></li>
            <li>Inner diameter: <strong>&#x2300 ${data.d_inner_dimension}mm</strong></li>
            <li>Length: <strong>${data.length_dimension}mm</strong></li>
            <li>.........................................................................................................</li>
            <li>Density: <strong>${data.density} g/cm3</strong></li>
            <li>Price: <strong>${data.price} zł/kg</strong></li>
            <li>.........................................................................................................</li>
            <li class="important">Mass: <strong>${singleMass} kg</strong></li>
            <li class="important">Total mass: <strong>${totalMass} kg</strong></li>
            <li class="important">Gross value: <strong>${singlePrice} zł</strong></li>
            <li class="important">Total gross value: <strong>${totalPrice} zł</strong></li>
          
    `;

        material_info.classList.add('active');
    })
}