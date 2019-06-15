const Sequelize = require('sequelize');
const db = require('./db')

const User = db.define("User", {
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
User.associate = function (models) {
  User.hasMany(models.Booking, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    as: 'booking'
  });
};
module.exports = User;
