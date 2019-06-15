const Sequelize = require('sequelize');
const db = require('./db')
const Utils = require("./utils");

const Cinema = db.define("Cinema", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    get: function () {
      return Utils.formatDate(this.getDataValue('createdAt'))
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    get: function () {
      return Utils.formatDate(this.getDataValue('updatedAt'))
    }
  },
});

Cinema.associate = function (models) {
  Cinema.hasMany(models.Theater, {
    foreignKey: 'cinema_id',
    sourceKey: 'id',
    as: 'theaters'
  });
};

module.exports = Cinema;