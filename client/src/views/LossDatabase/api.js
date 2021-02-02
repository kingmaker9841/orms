import { server } from "../../config/server";
const url = "/loss-database";
const riskCauseURL = "/loss-database-risk-cause";
const riskTriggerURL = "/loss-data-trigger";

export const getLossData = (branchId, generatedLossData, callback) => {
  server
    .get(`${url}`, {
      params: {
        branchId: branchId,
        generatedLossData: generatedLossData,
      },
    })
    .then((result) => {
      callback(null, result.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

export const submitLossData = (data, callback) => {
  server
    .post(`${url}`, { lossData: data })
    .then((_) => {
      callback(true);
    })
    .catch((err) => {
      callback(false);
    });
};

export const getLossDatabaseRiskCause = (data, callback) => {
  server
    .get(`${riskTriggerURL}`, {
      params: {
        branchId: data.branchId,
        generatedLossData: data.generatedLossData,
        riskCause: data.riskCause,
      },
    })
    .then((result) => {
        let sum = 0;
        result.data.map(risks => {
            sum += parseInt(risks.financialImpact)
        })
      callback(null, sum);
    })
    .catch((err) => {
      callback(err, null);
    });
};
