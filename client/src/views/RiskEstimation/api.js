import { server } from '../../config/server';

const url = '/risk-estimation';

function editRiskEstimation(riskEstimation, branchId, callback) {
    server.put(
        `${url}/${branchId}`,
        riskEstimation
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getRiskEstimation(branchId, callback) {
    server.get(
        `${url}/${branchId}`
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

export {
    editRiskEstimation,
    getRiskEstimation,
}