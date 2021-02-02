module.exports = (sequelize, type) => {
    return sequelize.define('province', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(50),
            required: true
        }
    })
}