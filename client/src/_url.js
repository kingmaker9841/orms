const Hashids = require('hashids').default;

const hashids = new Hashids(new Date().toString().slice(0, 18), 10, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');

const getHash = (id) => {
    return hashids.encode(id);
}

const getId = (hash) => {
    return hashids.decode(hash);
}

const getStringHash = (url) => {
    return url;
}

const getStringId = (hash) => {
    return hash;
}

export {
    getHash, getId,
    getStringHash, getStringId,
}