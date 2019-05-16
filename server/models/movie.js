const Sequelize = require('sequelize');
const db = require('./db')

const Movie = db.define("Movie", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  trailer: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  introduce: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  release_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  minute_time: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  view: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Movie;