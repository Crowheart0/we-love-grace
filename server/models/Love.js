const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Love = sequelize.define('Love', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'loves',
  timestamps: true
})

module.exports = Love