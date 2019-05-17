const Sequelize = require('sequelize');
const db = require('./db')

const Cinema = db.define("Cinema", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
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

Cinema.associate = function (models) {
  Cinema.hasMany(models.Theater, {
    foreignKey: 'theater_id',
    sourceKey: 'id'
  });
};

module.exports = Cinema;