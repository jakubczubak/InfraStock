const delete_popup = document.getElementById('delete_popup');
const delete_popup_cancel_btn = document.getElementById('delete_popup_cancel_btn');
const delete_popup_delete_btn = document.getElementById('delete_popup_delete_btn');


function printMaterialCategories() {
    fetch('/materials/categories')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw "Oops!!!"
            }
        })
        .then(function (categories) {
            const categoriesItems = document.getElementById("categories-items");
            let categoriesItemsInnerHTML = "";
            categories.forEach(function (category) {
                categoriesItemsInnerHTML += `
                                    <div class="category_item" >
                        <h1>${category.categoryName}</h1>
                        <h3>Quantity: 15</h3>
                        <img class="del" src="/icons/del.svg" alt="asd" onclick="deleteMaterialCategory(${category.id})">
                        <img class="edit" src="/icons/edit.svg" alt="asda">
                    </div>
                `
            });
            categoriesItems.innerHTML = categoriesItemsInnerHTML;


            let category_items = document.getElementsByClassName("category_item");

            for (let i = 0; i < category_items.length; i++) {

                category_items[i].addEventListener("click", function () {
                    printMaterials(`/sortedMaterials?categoryName=${this.children[0].innerHTML}`);
                })
            }
        })
}

printMaterialCategories();


function deleteMaterialCategory(id){

    const element = event.target.parentNode;

    delete_popup.classList.add('active');
    delete_popup_cancel_btn.onclick = function () {
        delete_popup.classList.remove('active');
    };
    delete_popup_delete_btn.onclick = function () {
        fetch('/materials/deleteMaterialCategory?id=' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
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


function printCategoriesInSelectField() {
    $.get("/materials/categories", function (data, status) {
        const categoriesItems = document.getElementById("materialCategory");
        let innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let obj = (data[i]);
            innerHTML += `<option value="${obj.categoryName}">${obj.categoryName}</option>`;
        }
        categoriesItems.innerHTML = innerHTML;
    });
}

printCategoriesInSelectField();