const material_info = document.getElementById("material_info");
const material_info_close_btn = document.getElementById("material_info_close_btn");
const material_description_info = document.getElementById("material_description_info");
const material_quantity_info = document.getElementById('material_quantity_info');
const material_mass_info = document.getElementById('material_mass_info');
const material_total_mass_info = document.getElementById('material_total_mass_info');
const material_price_info = document.getElementById('material_price_info');
const material_total_price = document.getElementById('material_total_price');

material_info_close_btn.addEventListener('click', function () {
    material_info.classList.remove('active');
});

function showMaterialInfoPopUp(id) {

    fetch('/getMaterial?id=' + id)
        .then(response => response.json())
        .then(material => {
            console.log(material);


            let singleMassForPlate = (material.density * material.x_dimension * material.y_dimension *material.z_dimension / 1000000).toFixed(9);
            let singleMassForRod = (material.density * Math.PI * Math.pow((material.d_dimension / 2), 2) * material.length_rod_dimension / 1000000).toFixed(9);
            let singleMassForTube = (material.density * Math.PI * (Math.pow((material.d_outer_dimension / 2), 2) - Math.pow((material.d_inner_dimension / 2), 2)) * material.length_dimension / 1000000).toFixed(9);

            console.log(singleMassForPlate);
            console.log(singleMassForRod);
            console.log(singleMassForTube);
    //
    //         let singleMass = '';
    //
    //         if (data.d_inner_dimension > 0 && data.d_outer_dimension > 0) {
    //             singleMass = singleMassForTube;
    //         } else if (data.d_inner_dimension == 0 && data.d_outer_dimension > 0) {
    //             singleMass = singleMassForRod;
    //         } else {
    //             singleMass = singleMassForPlate;
    //         }
    //
    //         let totalMass = (`${data.quantity}` * singleMass).toFixed(2);
    //         let singlePrice = (singleMass * `${data.price}`).toFixed(2);
    //         let totalPrice = (`${data.quantity}` * singlePrice).toFixed(2);
    //
    //         about_material_list.innerHTML = `
    //         <li>Material name: <strong>${data.materialName}</strong></li>
    //         <li>Stock quantity: <strong>${data.quantity}</strong></li>
    //         <li>Stock minimum quantity: <strong>${data.minQuantity}</strong></li>
    //         <li>Material category: <strong>${data.category.categoryName}</strong></li>
    //         <li>Last update: <strong>${inventoryDate}</strong></li>
    //         <li>.........................................................................................................</li>
    //         <li>X dimension: <strong>${data.x_dimension}mm</strong></li>
    //         <li>Y dimension: <strong>${data.y_dimension}mm</strong></li>
    //         <li>Z dimension: <strong>${data.z_dimension}mm</strong></li>
    //         <li>.........................................................................................................</li>
    //         <li>Outer diameter: <strong>&#x2300 ${data.d_outer_dimension}mm</strong></li>
    //         <li>Inner diameter: <strong>&#x2300 ${data.d_inner_dimension}mm</strong></li>
    //         <li>Length: <strong>${data.length_dimension}mm</strong></li>
    //         <li>.........................................................................................................</li>
    //         <li>Density: <strong>${data.density} g/cm3</strong></li>
    //         <li>Price: <strong>${data.price} zł/kg</strong></li>
    //         <li>.........................................................................................................</li>
    //         <li class="important">Mass: <strong>${singleMass} kg</strong></li>
    //         <li class="important">Total mass: <strong>${totalMass} kg</strong></li>
    //         <li class="important">Gross value: <strong>${singlePrice} zł</strong></li>
    //         <li class="important">Total gross value: <strong>${totalPrice} zł</strong></li>
    //
    // `;

            material_info.classList.add('active');
        });





}