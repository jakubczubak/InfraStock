const tool_clear_filters_button = document.getElementById("tool_clear-filters-button");
const toolShoppingList = document.getElementById("toolShoppingList");
const tool_category_setting_btn = document.getElementById('tool_category_setting_btn');


tool_category_setting_btn.addEventListener('click', function (){
    const tool_items_img = document.querySelectorAll("#tool-categories-items > div > img");
    tool_items_img.forEach((element) => {
        element.classList.toggle('active');
    })
})

toolShoppingList.addEventListener('click', function () {
    printTools('/tools/shoppingList');
});

tool_clear_filters_button.addEventListener("click", function () {
    printTools("/tools");
});

const printTools = function printTools(url) {

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch tool list"
            }
        })
        .then(function (tools) {
            tools.sort((a, b) => (a.toolName > b.toolName) ? 1 : -1);

            const toolItemsWrapper = document.getElementById("tool_items");
            let toolItemsWrapperInnerHTML = "";
            let i = -1;
            tools.forEach(function (tool) {
                i++;
                let inventoryDate = tool.updatedOn;
                let isLowQuantity = false;

                if (inventoryDate == null) {
                    inventoryDate = "-";
                }

                if (tool.minQuantity > tool.quantity) {
                    isLowQuantity = true;
                }

                if (isLowQuantity) {

                    toolItemsWrapperInnerHTML +=
                        `<tr>
                <td class="tool-list-number">${i + 1}</td>
                <td>${tool.toolName}</td>
                <td>${tool.quantity}<img class="face" src="/icons/sad.svg" alt="" title="Low quantity!"></td>
                <td>${tool.minQuantity}</td>
                <td>${tool.toolCategoryName.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateTool(${tool.id})" title="Edit"><img src="/icons/info_fill.svg" alt="" onclick="showToolInfoPopUp(${tool.id})" title="Info"><img src="/icons/del_table.svg" alt="" onclick="deleteTool(${tool.id})" title="Delete"></td>
                </tr>
                `
                } else {
                    toolItemsWrapperInnerHTML +=
                        `
                <tr>    
                <td class="tool-list-number">${i + 1}</td>
                <td>${tool.toolName}</td>
                <td>${tool.quantity}<img class="face" src="/icons/happy.svg" alt="" title="Quantity is good"></td>
                <td>${tool.minQuantity}</td>
                <td>${tool.toolCategoryName.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateTool(${tool.id})" title="Edit"><img src="/icons/info_fill.svg" alt="" onclick="showToolInfoPopUp(${tool.id})" title="Info"><img src="/icons/del_table.svg" alt="" onclick="deleteTool(${tool.id})" title="Delete"></td>
                </tr>
                `
                }
            });
            toolItemsWrapper.innerHTML = toolItemsWrapperInnerHTML;
        });
};

printTools('/tools');


function deleteTool(id) {


    const element = event.target.parentNode.parentNode;


    delete_popup.classList.add('active');
    delete_popup_cancel_btn.onclick = function () {
        delete_popup.classList.remove('active');
    };
    delete_popup_delete_btn.onclick = function () {
        fetch('/deleteTool?id=' + id, {
            method: 'DELETE',
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    delete_popup.classList.remove('active');
                    showErrorAlert('Error: delete tool');
                    throw "Error: delete material";
                }
            }) // or res.json()
            .then(res => {
                element.remove();
                delete_popup.classList.remove('active');
                showInfoAlert(res);
                setTimeout(function () {
                    hideInfoAlert();
                }, 5000); //hide alert automatically after 5sec
            })
    }
}


const edit_tool_creation_form_popup = document.getElementById('edit_tool_creation_form_popup');
const edit_tool_creation_form_popup_update_btn = document.getElementById('edit_tool_creation_form_popup_update_btn');
const edit_tool_creation_form_popup_close_btn = document.getElementById('edit_tool_creation_form_popup_close_btn');


const tool_description_edit = document.getElementById("tool_description_edit");
const tool_quantity_edit = document.getElementById("tool_quantity_edit");
const tool_minimum_quantity_edit = document.getElementById("tool_minimum_quantity_edit");
const tool_categories_edit = document.getElementById("tool_categories_edit");
const tool_price_edit = document.getElementById("tool_price_edit");
const tool_link_1_edit = document.getElementById('tool_link_1_edit');
const tool_link_2_edit = document.getElementById('tool_link_2_edit');


function updateTool(id) {

    const element = event.target.parentNode.parentNode;

    const tool_number = element.children[0].innerHTML;

    fetch("/getTool?id=" + id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Error fetch tool by id"
            }
        }).then(function (tool) {

        tool_description_edit.value = tool.toolName;
        tool_quantity_edit.value = tool.quantity;
        tool_minimum_quantity_edit.value = tool.minQuantity;
        tool_categories_edit.value = tool.toolCategoryName.categoryName;
        tool_price_edit.value = tool.price;
        tool_link_1_edit.value = tool.link1;
        tool_link_2_edit.value = tool.link2;

        return tool;

    }).then(function (tool) {

        edit_tool_creation_form_popup.classList.add('active');

        edit_tool_creation_form_popup_close_btn.onclick = function () {
            edit_tool_creation_form_popup.classList.remove('active');
        };


        edit_tool_creation_form_popup_update_btn.onclick = function () {


            let updatedTool = {
                id: tool.id,
                toolName: tool_description_edit.value,
                quantity: tool_quantity_edit.value,
                minQuantity: tool_minimum_quantity_edit.value,
                category: tool_categories_edit.value,
                price: tool_price_edit.value,
                link1:tool_link_1_edit.value,
                link2:tool_link_2_edit.value
            };
            fetch('/updateTool?id=' + updatedTool.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTool),
            })
                .then(function (response) {
                    response.text().then(function (text) {
                        if(response.ok){
                            fetch("/getTool?id=" + updatedTool.id)
                                .then(function (response) {
                                    if (response.ok) {
                                        return response.json();
                                    } else {

                                        throw "Error fetch tool by id"
                                    }
                                }).then(function (tool) {

                                let inventoryDate = tool.updatedOn;
                                let isLowQuantity = false;

                                if (inventoryDate == null) {
                                    inventoryDate = "-";
                                }

                                if (tool.minQuantity > tool.quantity) {
                                    isLowQuantity = true;
                                }

                                if (isLowQuantity) {

                                    element.innerHTML = (
                                        `<tr>
                <td>${tool_number}</td>
                <td>${tool.toolName}</td>
                <td>${tool.quantity}<img class="face" src="/icons/sad.svg" alt="" title="Low quantity!"></td>
                <td>${tool.minQuantity}</td>
                <td>${tool.toolCategoryName.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateTool(${tool.id})" title="Edit"><img src="/icons/info_fill.svg" alt="" onclick="showToolInfoPopUp(${tool.id})" title="Info"><img src="/icons/del_table.svg" alt="" onclick="deleteTool(${tool.id})" title="Delete"></td>
                </tr>
                `)
                                } else {
                                    element.innerHTML = (
                                        `
                <tr>
                 <td>${tool_number}</td>
                <td>${tool.toolName}</td>
                <td>${tool.quantity}<img class="face" src="/icons/sad.svg" alt="" title="Low quantity!"></td>
                <td>${tool.minQuantity}</td>
                <td>${tool.toolCategoryName.categoryName}</td>
                <td>${inventoryDate}</td>
                <td><img src="/icons/edit_fill.svg" alt="" onclick="updateTool(${tool.id})" title="Edit"><img src="/icons/info_fill.svg" alt="" onclick="showToolInfoPopUp(${tool.id})" title="Info"><img src="/icons/del_table.svg" alt="" onclick="deleteTool(${tool.id})" title="Delete"></td>
                </tr>
                `)
                                }
                                edit_tool_creation_form_popup.classList.remove('active');
                                showInfoAlert(text);
                                setTimeout(function () {
                                    hideInfoAlert();
                                }, 5000); //hide alert automatically after 5sec
                            });
                        }else{
                            showErrorAlert(text);
                            setTimeout(hideErrorAlert,1000);
                        }
                    })
                })

        }
    })
}




