export const getFormEntries = (form) => {
    const formData = new FormData(form);
    const entries = formData.entries();

    let entriesObj = {};
    for(let entry of entries) {
        entriesObj[entry[0]] = entry[1];
    }

    return entriesObj;
}