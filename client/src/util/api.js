import { server } from "../config/server";

const getAll = (callback) => {
  server
    .get("/all")
    .then((json) => {
      callback(null, json.data);
    })
    .catch((err) => {
      callback(err);
    });
};

export { getAll };
