const materials_to_buy_count = document.getElementById('materials_to_buy_count');
const materials_net_worth = document.getElementById('materials_net_worth');
const tools_to_buy_count = document.getElementById('tools_to_buy_count');
const tools_net_worth = document.getElementById('tools_net_worth');




materials_to_buy_count.innerHTML= '1<strong>positions</strong>';
materials_net_worth.innerHTML = '32 000<strong>PLN</strong>';
tools_to_buy_count.innerHTML = '15<strong>positions</strong>';
tools_net_worth.innerHTML = '16 300<strong>PLN</strong>';


const updateDashboard = function updateDashboard() {

    fetch('/shoppingList')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch tool list"
            }
        })
        .then(function (tools) {
            materials_to_buy_count.innerHTML= `${tools.length}<strong>positions</strong>`;
        });

    fetch('/tools/shoppingList')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch tool list"
            }
        })
        .then(function (tools) {
            tools_to_buy_count.innerHTML= `${tools.length}<strong>positions</strong>`;
        });
};

updateDashboard();