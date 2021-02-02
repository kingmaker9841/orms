/**
 * Stores the unit of the fields to make the units dynamic and help in reporting
 * @alias BaseUnit
 */
module.exports = (sequelize, type) => {
    return sequelize.define('base_unit', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: type.STRING(30),
            allowNull: false,
        },
        // 'min' | 'hour' | 'day' | 'rupees' 
        unit: {
            type: type.STRING(20),
        },
        // Conversion to the base value
        // 'hour' has value 60 whereas 'min' has 1 ---> So, 60 min = 1 hour 
        unitConversion: {
            type: type.INTEGER,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        }
    });
}