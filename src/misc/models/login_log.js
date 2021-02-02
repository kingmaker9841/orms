module.exports = (sequelize, type) => {
    return sequelize.define('login_log', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: type.STRING(40),
            primaryKey: true,
        },
        login: {
            type: type.DATE,
        },
        logout: {
            type: type.DATE,
        }
    })
}
