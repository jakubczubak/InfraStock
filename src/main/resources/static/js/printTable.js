const printBtn = document.getElementById("material_pdf");
const tool_pdf = document.getElementById('tool_pdf');
const calculation_material_pdf = document.getElementById('calculation_material_pdf');
const project_calculation_pdf = document.getElementById('project_calculation_pdf');
const project_calculation_info_pdf = document.getElementById('project_calculation_info_pdf');

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

$(calculation_material_pdf).click(function () {
    let table = document.getElementById("new_calculation_creation_form_table");
    $(table).printThis({
        header: '<h3>MATERIAL LIST:</h3>'
    });
});

$(project_calculation_pdf).click(function () {
    let table = document.getElementById("project_calculation_table");
    $(table).printThis({
        header: '<h3>PROJECTS CALCULATION:</h3>'
    });
});

$(project_calculation_info_pdf).click(function () {
    let table = document.getElementById("project_calculation_info_table");
    $(table).printThis({
        header: '<h3>PROJECT MATERIAL LIST:</h3>'
    });
});

