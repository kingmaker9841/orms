import { server } from "../../config/server";

const url = "/risk-register";
const urlData = "/risk-register-data";

function getRiskAreaData(data, callback) {
  server
    .get(`${urlData}/${data.riskAreaCode}`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function addRiskRegister(riskRegister, callback) {
  server
    .post(`${url}`, riskRegister)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function getRiskRegister(riskRegisterId, callback) {
  server
    .get(`${url}/${riskRegisterId}`)
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}

function getRiskRegisters(data, callback) {
  server
    .get(`${url}/${data.riskAreaCode}`, {
      params: {
        branchId: data.branchId
      }
    })
    .then(function (json) {
      callback(null, json.data);
    })
    .catch(function (err) {
      callback(err);
    });
}
function editRiskRegister(id, data) {
  try {
    server.put(`${url}/${id}`, data)
  }
  catch (ex) {
    // console.log(`Got error editing the data`);
  }

}

function submitRiskRegister(action, data, callback) {
  server.post(`${url}/${action}`, { riskRegisters: data }).then(_ => {
    callback(true);
  }).catch(err => {
    callback(false);
  });
}


export {
  editRiskRegister,
  getRiskAreaData,
  addRiskRegister,
  getRiskRegisters,
  getRiskRegister,
  submitRiskRegister,

};
