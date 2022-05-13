function printCategories() {
    $.get("/materials/categories", function (data, status) {
        const categoriesItems = document.getElementById("categories-items");
        let innerHTMLmaterial = "";
        for (let i = 0; i < data.length; i++) {
            let obj = (data[i]);
            innerHTMLmaterial += `<div class="category-item">${obj.categoryName}</div>`;
        }
        categoriesItems.innerHTML = innerHTMLmaterial;

        let category_items = document.getElementsByClassName("category-item");

        for (let i = 0; i < category_items.length; i++) {

            category_items[i].addEventListener("click", function () {
                printMaterials(`/sortedMaterials?categoryName=${this.innerHTML}`);
            })
        }
    });

}

printCategories();


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