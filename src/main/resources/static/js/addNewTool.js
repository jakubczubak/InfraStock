const new_tool_btn = document.getElementById('new_tool_btn');
const new_tool_creation_form_popup = document.getElementById('new_tool_creation_form_popup');
const tool_new_material_creation_form_popup_create_btn = document.getElementById("tool_new_material_creation_form_popup_create_btn");
const tool_new_material_creation_form_popup_close_btn = document.getElementById("tool_new_material_creation_form_popup_close_btn");


const tool_description = document.getElementById("tool_description");
const tool_quantity = document.getElementById("tool_quantity");
const tool_minimum_quantity = document.getElementById("tool_minimum_quantity");
const tool_categories = document.getElementById("tool_categories");
const tool_price = document.getElementById("tool_price");
const tool_link_1 = document.getElementById('tool_link_1');
const tool_link_2 = document.getElementById('tool_link_2');


new_tool_btn.addEventListener('click', function (){
    new_tool_creation_form_popup.classList.add('active');
});

tool_new_material_creation_form_popup_close_btn.onclick =function (){
    new_tool_creation_form_popup.classList.remove('active');
};


tool_new_material_creation_form_popup_create_btn.addEventListener('click', function (){

    let newTool = {
        toolName: tool_description.value,
        tool_quantity: tool_quantity.value,
        tool_minimum_quantity: tool_minimum_quantity.value,
        tool_category: tool_categories.value,
        price: tool_price.value,
        link_1:tool_link_1.value,
        link_2:tool_link_2.value
    };


    fetch('/addTool', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTool),
    })
        .then(function (response) {
            response.text().then(function (text) {

                if (response.ok){
                    if(text === "Congratulations, you've added a new tool"){
                        new_material_creation_form_popup.classList.remove('active');
                        clearDataMaterialCreationForm();
                        printMaterials("/tools");
                        showSuccessAlert(text);
                        setTimeout(function () {
                            hideSuccessAlert();
                        }, 5000); //hide alert automatically after 5sec
                    }else{
                        showErrorAlert(text);
                        setTimeout(function () {
                            hideErrorAlert();
                        }, 5000); //hide alert automatically after 5sec
                    }
                }else{
                    showErrorAlert(text);
                    setTimeout(function () {
                        hideErrorAlert();
                    }, 5000); //hide alert automatically after 5sec
                }
            })

        })

});

function clearDataToolCreationForm(){
    tool_description.value =''
    tool_quantity.value=''
    tool_minimum_quantity.value=''
    tool_categories.value=''
    tool_price.value=''
    tool_link_1.value=''
    tool_link_2.value=''
}

