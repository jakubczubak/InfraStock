
function printCategories(){
    $.get("/materials/categories", function(data, status){
        const categoriesItems = document.getElementById("categories-items");
        let innerHTML = "";
        for(let i = 0; i < data.length ; i++){
            let obj =(data[i]);
            innerHTML += `<div class="category-item">${obj.categoryName}</div>`;
        }
        categoriesItems.innerHTML = innerHTML;
    });
}

printCategories();


function printCategoriesInSelectField() {
    $.get("/materials/categories", function(data, status){
        const categoriesItems = document.getElementById("materialCategory");
        let innerHTML = "";
        for(let i = 0; i < data.length ; i++){
            let obj =(data[i]);
            innerHTML += `<option value="${obj.categoryName}">${obj.categoryName}</option>`;
        }
        categoriesItems.innerHTML = innerHTML;
    });
}

printCategoriesInSelectField();