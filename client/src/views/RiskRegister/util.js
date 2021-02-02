import { splitText } from "../RiskAreas/util";

function modifyRiskParticular(riskParticulars) {
    const particulars = [];
    riskParticulars.forEach(particular => {
        particular.name.split(splitText).forEach(p => {
            particulars.push({
                code: particular.code,
                name: p,
                baseUnitId: particular.baseUnitId,
            });
        });
    });
    return particulars;
}

function getData(id, list) {
    const item = list.filter(l => l.id === Number(id) ? 1 : 0)[0];
    return item ? item : "";
}

export {
    modifyRiskParticular,
    getData,
}