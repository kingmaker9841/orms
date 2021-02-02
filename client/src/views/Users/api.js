import { server } from "../../config/server";

const url = "/users";


/**
 *
 * @param {Function} callback
 */
function getUsers(callback) {
  server
    .get(`${url}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function getLdapUsers(callback) {
  server
    .get(`${url}/ldap`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function getUser(id, callback) {
  server
    .get(`${url}/${id}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function addUser(user, callback) {
  server
    .post(`${url}`, JSON.stringify(user))
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function editUser(user, callback) {
  server
    .put(`${url}/${user.id}`, JSON.stringify(user))
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

function deleteUser(id, callback) {
  server
    .delete(`${url}/${id}`)
    .then(function(json) {
      callback(null, json.data);
    })
    .catch(function(err) {
      callback(err);
    });
}

export {
  getUsers,
  getLdapUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,

};
