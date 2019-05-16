const Sequelize = require('sequelize');
const db = require('./db')

const Cinema = db.define("Cinema", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
});

module.exports = Cinema;