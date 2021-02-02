const { User, PageAccess } = require('./database');

const USER = "user";
const USER_STATUS = "userStatus";
const ROLE = "role";
const DEPARTMENT = "department";
const BRANCH = "branch";
const DOCUMENT = "document";
const LETTER = "letter";
const DOCUMENT_CONDITION = "documentCondition";
const DOCUMENT_TYPE = "documentType";
const LOCATION_MAP = "locationMap";
const LOCATION_TYPE = "locationType";
const LANGUAGE = "language";

function getPermissions(userId, callback) {
    User.findOne({
        where: { id: userId },
        raw: true,
    }).then(user => {
        PageAccess.findOne({
            where: { roleId: user.role },
            raw: true,
        }).then(permissions => {
            callback(null, permissions);
        }).catch(err => {
            callback(err);
        });
    }).catch(err => {
        callback(err);
    });
}

function canDelete(item, userId, callback) {
    getPermissions(userId, (err, permissions) => {
        if (!err && permissions[item] === 3) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

function canEditUser(userId, callback) {
    getPermissions(userId, (err, permissions) => {
        if (!err && permissions.user === 2) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

module.exports = {
    canDelete, canEditUser,
    USER, USER_STATUS, ROLE, DEPARTMENT, BRANCH, DOCUMENT, LETTER,
    DOCUMENT_CONDITION, DOCUMENT_TYPE, LOCATION_MAP, LOCATION_TYPE, LANGUAGE,
}