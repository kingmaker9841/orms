import { server } from "../../config/server";

const urlBranch = "/branches";
const urlProvince = "/provinces";

function getBranches(callback) {
  server
    .get(`${urlBranch}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function getProvinces(callback) {
  server
    .get(`${urlProvince}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function editProvinceBranch(data, callback) {
  server
    .put(`${urlBranch}`, data)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

export { getBranches, getProvinces, editProvinceBranch };
