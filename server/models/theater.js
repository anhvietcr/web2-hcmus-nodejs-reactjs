const Sequelize = require('sequelize');
const db = require('./db')

const Theater = db.define("Theater", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cinema_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  release_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  minute_time: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Theater;