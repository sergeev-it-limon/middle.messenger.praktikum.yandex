class FormGatherer {
    constructor(fieldsArray) {
        this.fieldsArray = fieldsArray;
    }

    getFormValues() {
        let result = {};
        for (let fieldId of this.fieldsArray) {
            let elem = document.getElementById(fieldId);
            result[fieldId] = elem.value;
        }
        console.log(result);
    }

    addEventLesteners() {
        for(let fieldId of this.fieldsArray) {
            let elem = document.getElementById(fieldId);
            elem.addEventListener("change", () => this.getFormValues());
        }
    }
}

export default FormGatherer;