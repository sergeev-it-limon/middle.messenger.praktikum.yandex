class FormGatherer {
    constructor(inputElemArray) {
        this.inputElemArray = inputElemArray;
    }

    getFormValues() {
        let result = {};
        for (let elem of this.inputElemArray) {
            result[elem.id] = elem.value;
        }
        console.log(result);
    }

    addEventLesteners() {
        for(let elem of this.inputElemArray) {
            elem.addEventListener("change", () => this.getFormValues());
        }
    }
}

export default FormGatherer;