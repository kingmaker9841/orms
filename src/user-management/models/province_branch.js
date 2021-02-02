module.exports = (sequelize, type) => {
    return sequelize.define('province_to_branch', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        provinceId: {
            type: type.INTEGER,
            required: true
        },
        branchId: {
            type: type.INTEGER,
            required: true
        }
    })
}