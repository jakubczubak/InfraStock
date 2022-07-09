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

            let singleMassForPlate = (material.density * material.x_dimension * material.y_dimension *material.z_dimension / 1000000).toFixed(9);
            let singleMassForRod = (material.density * Math.PI * Math.pow((material.d_dimension / 2), 2) * material.length_rod_dimension / 1000000).toFixed(9);
            let singleMassForTube = (material.density * Math.PI * (Math.pow((material.d_outer_dimension / 2), 2) - Math.pow((material.d_inner_dimension / 2), 2)) * material.length_dimension / 1000000).toFixed(9);

            let singleMass = 0;

            if(singleMassForPlate > 0){
                singleMass = singleMassForPlate;
            }else if( singleMassForRod > 0) {
                singleMass = singleMassForRod;
            }else {
                singleMass = singleMassForTube;
            }




            let totalMass = (material.quantity * singleMass).toFixed(2);
            let singlePrice = (singleMass * material.price).toFixed(2);
            let totalPrice = (material.quantity * singlePrice).toFixed(2);

            material_description_info.innerHTML = `Material description: <strong>${material.materialName}</strong>`;
            material_quantity_info.innerHTML = `Quantity:  <strong>${material.quantity}</strong>`;
            material_mass_info.innerHTML = `Mass per piece: <strong>${singleMass}</strong> kg`;
            material_total_mass_info.innerHTML = `Total mass:   <strong>${totalMass}</strong> kg`;
            material_price_info.innerHTML = `Net price per piece:  <strong>${singlePrice}</strong> PLN`;
            material_total_price.innerHTML = `Total net price: <strong>${totalPrice}</strong> PLN`;

            material_info.classList.add('active');
        });





}