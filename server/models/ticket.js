const Sequelize = require('sequelize');
const db = require('./db')

const Ticket = db.define("Ticket", {
  booking_id: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  chair_id: {
    type: Sequelize.STRING,
    allowNull: true,
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

Ticket.associate = function (models) {
  Ticket.belongsTo(models.Booking, {
    foreignKey: 'booking_id',
    as: 'booking'
  });
};

module.exports = Ticket;
