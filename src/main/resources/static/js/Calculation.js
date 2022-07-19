class Calculation{
    constructor(calculation_name, CNC_time, status) {
        this.calculation_name = calculation_name;
        this.CNC_time = CNC_time;
        this.status = status;
        this.materials = [];
    }

    addMaterial (material){
        this.materials.push(material);
    }
}

