const Sequelize = require('sequelize');
const db = require('./db')

const Booking = db.define("Booking", {
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  showtime_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bookingtime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalprice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Booking;
