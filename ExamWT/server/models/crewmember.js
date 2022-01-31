const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const CrewMember = sequelize.define('crewmember', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 50]
        }
    },
    role: {
        type: DataTypes.ENUM('CAPTAIN', 'BOATSWAIN', 'DECKHAND'),
        allowNull:false,
        validate: {
        }
    }
});

module.exports = CrewMember;
