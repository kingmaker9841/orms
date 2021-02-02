import { server } from "../../config/server";

const url = "/risk-areas";
const lossDataUrl = "/loss-database-category";

function getLikelihoodAndImpacts(callback) {
  server
    .get(`/likelihood-impact`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function getRiskAreas(options, callback) {
  server
    .get(`${url}`, {
      params: options,
    })
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function getRiskAreaCodes(callback) {
  server
    .get(`${url}/code`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function getRiskArea(id, callback) {
  server
    .get(`${url}/${id}`)
    .then(function (json) {
      console.log("getRiskArea", json.data);
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function editRiskArea(riskArea, callback) {
  server
    .put(`${url}/${riskArea.id}`, riskArea)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function editRiskAreaCodes(riskAreaCodes, callback) {
  server
    .put(`${url}/code`, riskAreaCodes)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function addRiskArea(riskArea, callback) {
  server
    .post(`${url}`, riskArea)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function deleteRiskArea(id, callback) {
  server
    .delete(`${url}/${id}`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

// const getLossDataCatName = async (id, callback) => {
//   server
//   .get(`${lossDataUrl}`, {
//     params: {
//       id : id
//     }
//   })
//   .then(result => {
//     callback(null, result.data);
//   }).catch(err => {
//     callback(true, null);
//   })
// }

export {
  getLikelihoodAndImpacts,
  getRiskArea,
  getRiskAreas,
  getRiskAreaCodes,
  editRiskAreaCodes,
  editRiskArea,
  addRiskArea,
  deleteRiskArea,
  // getLossDataCatName
};
