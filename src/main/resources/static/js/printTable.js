const printBtn = document.getElementById("material_pdf");


$(printBtn).click(function () {
    let table = document.getElementById("materials-table");
    $(table).printThis({
    header: '<h3>MATERIAL LIST:</h3>'
    });
});

