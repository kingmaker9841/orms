import { server } from "../../config/server";

const url = "/policies-update";

/**
 *
 * @param {Function} callback
 */
function getPolicies(callback) {
  server
    .get(`${url}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}
function editPolicies(data) {
    try {
        server.put(`${url}`, data)
      }
      catch (ex) {
        // console.log(`Got error editing the data`);
      }
    
  }

export { getPolicies,editPolicies };
