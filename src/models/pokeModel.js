const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pokemon = sequelize.define("pokemon", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    base_experience: DataTypes.INTEGER,
    image: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false       
});

module.exports = Pokemon;