
const printBtn = document.getElementById("material_pdf");


$(printBtn).click(function () {
    let materialsTable = document.getElementById("materials-table");
    let wme = window.open("","","width=900,height=700");

    wme.document.write(materialsTable.outerHTML);
    wme.document.close();
    wme.focus();
    wme.print();
    wme.close();
});

