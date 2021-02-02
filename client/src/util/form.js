const getFormData = event => {
    const formData = {};
    const form = event.target;
    for (let i = 0; i < form.length; i++) {
        const element = form.elements[i];
        const name = element.name;
        const value = element.value;
        const type = element.type;
        const labelValue = element.getAttribute("data-label");
        if (value) {
            switch (type) {
                case "checkbox":
                    formData[name] = element.checked;
                    // const checkboxValues = {
                    //     value: element.checked,
                    //     label: labelValue,
                    //     name: name,
                    // }
                    // formData.push(checkboxValues);
                    break;
                default:
                    formData[name] = value;
                    // const dataValues = {
                    //     value: value,
                    //     label: labelValue,
                    //     name: name,
                    // }
                    // formData.push(dataValues);
                    break;
            }
        }
    }
    return formData;
}

const loadDataInsideForm = (object) => {
    if (!object) return;
    const keys = Object.keys(object);
    keys.forEach(key => {
        const value = object[key];
        const element = document.getElementById(key);
        if (element) {
            element.checked = value;
            element.value = value;
        }
    });
}

export {
    getFormData,
    loadDataInsideForm,
}