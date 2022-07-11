const printBtn = document.getElementById("material_pdf");
const tool_pdf = document.getElementById('tool_pdf');


$(printBtn).click(function () {
    let table = document.getElementById("materials-table");
    $(table).printThis({
    header: '<h3>MATERIAL LIST:</h3>'
    });
});


$(tool_pdf).click(function () {
    let table = document.getElementById("tool-table");
    $(table).printThis({
        header: '<h3>TOOL LIST:</h3>'
    });
});

