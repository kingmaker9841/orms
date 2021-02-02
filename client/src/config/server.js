const axios = require('axios');
const TOKEN = "token";
const header = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
}
const headerAuth = {
    'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const server = axios.create({
    baseURL: SERVER_URL,
    headers: header
});

module.exports.TOKEN = TOKEN;
module.exports.header = header;
module.exports.headerAuth = headerAuth;
module.exports.SERVER_URL = SERVER_URL;
module.exports.server = server;
