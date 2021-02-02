import { server } from '../../config/server';

const url = '/departments';

function getDepartments(callback) {
    server.get(
        `${url}`,
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function getDepartment(id, callback) {
    server.get(
        `${url}/${id}`,
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function editDepartment(department, callback) {
    server.put(
        `${url}/${department.id}`,
        department
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

function addDepartment(department, callback) {
    server.post(
        `${url}`,
        department
    ).then(function (json) {
        callback(null, json.data);
    }).catch(function (err) {
        callback(err);
    });
}

export {
    getDepartments,
    getDepartment,
    editDepartment,
    addDepartment,
}