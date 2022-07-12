const materials_to_buy_count = document.getElementById('materials_to_buy_count');
const materials_to_buy = document.getElementById('materials_to_buy');
const materials_net_worth = document.getElementById('materials_net_worth');
const tools_to_buy_count = document.getElementById('tools_to_buy_count');
const tools_to_buy = document.getElementById('tools_to_buy');
const tools_net_worth = document.getElementById('tools_net_worth');





materials_to_buy.addEventListener('click', function (){
    dashboard_section_wrapper.classList.remove('active');
    printMaterials('/shoppingList');
    material_section_wrapper.classList.add('active')
});

tools_to_buy.addEventListener('click', function (){
    dashboard_section_wrapper.classList.remove('active');
    printTools('/tools/shoppingList');
    tool_section_wrapper.classList.add('active');
})

const updateDashboard = function updateDashboard() {

    fetch('/shoppingList')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch materials shopping list"
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
                throw "Error fetch tools shopping list"
            }
        })
        .then(function (tools) {
            tools_to_buy_count.innerHTML= `${tools.length}<strong>positions</strong>`;
        });

    fetch('/tools/net_worth')
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                throw "Error fetch tools net worth"
            }
        })
        .then(function (text) {
            tools_net_worth.innerHTML = `${text}<strong>PLN</strong>`;
        });

    fetch('/materials/net_worth')
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                throw "Error fetch materials newt worth"
            }
        })
        .then(function (text) {
            materials_net_worth.innerHTML = `${text}<strong>PLN</strong>`;
        });
};

updateDashboard();