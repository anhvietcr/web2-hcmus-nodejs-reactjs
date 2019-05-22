const Sequelize = require('sequelize');
const db = require('./db')

const Ticket = db.define("Ticket", {
  booking_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  chair_id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  address_x: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address_y: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

});

module.exports = User;