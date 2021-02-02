import { server } from "../../config/server";
const apiEndpoint = "/mailing-date";

function editMailingDays(days, callback) {
  server
    .put(`${apiEndpoint}`, days)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}
function getMailingDays(callback) {
  server
    .get(`${apiEndpoint}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}
export { editMailingDays, getMailingDays };
