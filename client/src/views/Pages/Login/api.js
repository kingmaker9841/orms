import { server, TOKEN } from '../../../config/server';

function login(body, callback) {
    server.post(
        `/login`,
        body
    ).then(json => {
        const data = json.data;
        if (data.token) {
            localStorage.setItem(TOKEN, data.token);
        }
        window.location.reload();
    }).catch(err => {
        window.alert("You cannot login to this system!");
    });
}

export {
    login
}