const tool_info = document.getElementById("tool_info");
const tool_info_close_btn = document.getElementById("tool_info_close_btn");
const tool_description_info = document.getElementById("tool_description_info");
const tool_quantity_info = document.getElementById('tool_quantity_info');
const tool_price_info = document.getElementById('tool_price_info');
const tool_total_price = document.getElementById('tool_total_price');
const tool_link_1_info = document.getElementById('tool_link_1_info');
const tool_link_2_info = document.getElementById('tool_link_2_info');


tool_info_close_btn.addEventListener('click', function () {
    tool_info.classList.remove('active');
});

function showToolInfoPopUp(id) {

    fetch('/getTool?id=' + id)
        .then(response => response.json())
        .then(tool => {

            let totalPrice = (tool.quantity * tool.price).toFixed(2);

            tool_description_info.innerHTML = `Tool description: <strong>${tool.toolName}</strong>`;
            tool_quantity_info.innerHTML = `Quantity:  <strong>${tool.quantity}</strong>`;
            tool_price_info.innerHTML = `Net price per piece:  <strong>${tool.price}</strong> PLN`;
            tool_total_price.innerHTML = `Total net price: <strong>${totalPrice}</strong> PLN`;
            tool_link_1_info.innerHTML = `1. : <strong>${tool.link1}</strong>`;
            tool_link_2_info.innerHTML = `2. : <strong>${tool.link2}</strong>`;
            tool_info.classList.add('active');
        });





}