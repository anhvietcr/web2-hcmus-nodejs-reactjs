const Sequelize = require('sequelize');
const db = require('./db')

const Booking = db.define("Booking", {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
    unique: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  showtime_id: {
    type: Sequelize.INTEGER,
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
Booking.associate = function (models) {
  Booking.belongsTo(models.Showtime, {
    foreignKey: 'showtime_id',
    as: 'showtime'
  });

  Booking.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  Booking.hasMany(models.Ticket, {
    foreignKey: 'booking_id',
    sourceKey: 'id',
    as: 'tickets'
  });
};
module.exports = Booking;
