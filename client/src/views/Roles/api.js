import { server } from '../../config/server';

const url = '/roles';

function getRoles(callback) {
    server.get(
        `${url}`,
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getRole(id, callback) {
    server.get(
        `${url}/${id}`,
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function editRole(role, callback) {
    console.log("Role ", role);
    server.put(
        `${url}/${role.id}`,
        role
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function addRole(role, callback) {
    server.post(
        `${url}`,
        role
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getRoleTypes(callback) {
    server.get(
        `${url}/types`,
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function deleteRole(id, callback) {
    server.delete(
        `${url}/${id}`,
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

export {
    getRoles,
    getRoleTypes,
    getRole,
    editRole,
    addRole,
    deleteRole,
}