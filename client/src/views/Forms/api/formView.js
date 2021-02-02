import { server } from "../../../config/server";

const url = "/form-report";

export const addFormReport = (data, callback) => {
  server
    .post(`${url}`, data)
    .then((res) => callback(null, res.data))
    .catch((err) => {
      callback(err);
    });
};

export const getFormReport = (id, callback) => {
  server
    .get(`${url}/${id}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};
export const getFormReports = (callback) => {
  server
    .get(`${url}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};
export const deleteFormReport = (id, callback) => {
  server
    .delete(`${url}/${id}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};
