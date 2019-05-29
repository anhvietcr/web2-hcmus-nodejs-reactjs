const Sequelize = require('sequelize');
const db = require('./db');
const Utils = require("./utils");
const Movie = db.define("Movie", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  trailer: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  introduce: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  opening_day: {
    type: Sequelize.DATE,
    allowNull: true,
    get: function () {
      return Utils.formatDate(this.getDataValue('opening_day'))
    }
  },
  minute_time: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  view: {
    type: Sequelize.INTEGER,
    allowNull: true,
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

Movie.associate = function (models) {
  Movie.belongsToMany(models.Theater, {
    through: models.Showtime,
    as: 'theaters',
    foreignKey: 'movie_id',
  });

  Movie.hasMany(models.Showtime, {
    foreignKey: 'movie_id',
    as: 'showtimes'
  });
};


module.exports = Movie;
