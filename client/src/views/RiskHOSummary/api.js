import { server } from '../../config/server';

const url = '/risk-estimation-ho';
const riskCategorizationUrl = '/risk-categorization';
const riskEscalationUrl = '/risk-escalation';

function editRiskEstimationHO(riskEstimationHO, callback) {
    server.put(
        `${url}`,
        riskEstimationHO
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getRiskEstimationHO(callback) {
    server.get(
        `${url}`
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function editRiskCategories(riskCategories, callback) {
    server.put(
        `${riskCategorizationUrl}`,
        riskCategories
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getRiskCategories(callback) {
    server.get(
        `${riskCategorizationUrl}`
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function editRiskEscalation(riskEscalation, callback) {
    server.put(
        `${riskEscalationUrl}`,
        riskEscalation
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getRiskEscalation(callback) {
    server.get(
        `${riskEscalationUrl}`
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}



export {
    editRiskEstimationHO,
    getRiskEstimationHO,
    editRiskCategories,
    getRiskCategories,
    editRiskEscalation,
    getRiskEscalation,
}