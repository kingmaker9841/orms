module.exports = (sequelize, type) => {
    return sequelize.define('role_type', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        value: {
            type: type.STRING,
            allowNull: false,
        },
        description: {
            type: type.TEXT,
            allowNull: true,
        }
    })
}