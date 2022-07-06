const add_tool_category_btn = document.getElementById("add_tool_category_btn");
const tool_category_name = document.getElementById("tool_category_name");
const tool_category_creation_form_popup = document.getElementById('tool_category_creation_form_popup');
const tool_category_creation_form_popup_create_btn = document.getElementById('tool_category_creation_form_popup_create_btn');
const tool_category_creation_form_popup_close_btn = document.getElementById('tool_category_creation_form_popup_close_btn');

add_tool_category_btn.addEventListener('click', function () {
    tool_category_creation_form_popup.classList.add("active");
});
tool_category_creation_form_popup_close_btn.addEventListener('click', function () {
    tool_category_creation_form_popup.classList.remove("active");
});


tool_category_creation_form_popup_create_btn.addEventListener("click", e => {

    let newToolCategory = {
        categoryName: tool_category_name.value
    };

    fetch('/tools/addCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newToolCategory),
    })
        .then(function (response) {
            response.text().then(function (text) {

                if (response.ok){
                    if(text === "Congratulations, you've added a new tool category"){
                        tool_category_creation_form_popup.classList.remove("active");
                        tool_category_name.value = "";
                        printMaterialCategories();
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



