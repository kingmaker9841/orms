import { server } from "../../../config/server";
const url = "/forms";

export const getForms = (callback) => {
  server
    .get(`${url}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

export const addForm = (data, callback) => {
  server
    .post(`${url}`, {...data})
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

export const deleteForm = (id, callback) => {
  server
    .delete(`${url}/${id}`)
    .then((res) => callback(null, res.data))
    .catch((err) => {
      callback(err);
    });
};

export const getForm = (id) => {
  return server.get(`${url}/${id}`).then((res) => res.data);
};

export const editForm = (data, callback) => {
  server
    .put(`${url}`, data)
    .then((res) => callback(null, res.data))
    .catch((err) => {
      callback(err);
    });
};
