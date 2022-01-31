const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Ship = sequelize.define('ship', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 25]
        }
    },
    displacement: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            min:50
        }
    }
});

module.exports = Ship;
