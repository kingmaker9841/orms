module.exports = (sequelize, type) => {
    return sequelize.define('role_control', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: type.INTEGER,
            allowNull: false,
        },
        roleTypeId: {
            type: type.INTEGER,
            allowNull: false,
        },
        value: {
            type: type.STRING,
            allowNull: false,
        },
    })
}