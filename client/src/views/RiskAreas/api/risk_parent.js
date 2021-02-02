import { server } from "../../../config/server";

const url = "/risk-area-parent";

function getRiskAreaParents(callback) {
  server
    .get(`${url}`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function getRiskAreaParent(id, callback) {
  server
    .get(`${url}/${id}`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function editRiskAreaParent(riskArea, callback) {
  server
    .put(`${url}/${riskArea.id}`, riskArea)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function addRiskAreaParent(riskArea, callback) {
  server
    .post(`${url}`, riskArea)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function deleteRiskAreaParent(id, callback) {
  server
    .delete(`${url}/${id}`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

export {
  getRiskAreaParent,
  getRiskAreaParents,
  editRiskAreaParent,
  addRiskAreaParent,
  deleteRiskAreaParent,
};
