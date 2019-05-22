const Sequelize = require('sequelize');
const db = require('./db')
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
    allowNull: true
  },
  minute_time: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  view: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

Movie.associate = function (models) {
  Movie.belongsToMany(models.Theater, {
    through: models.Showtime,
    as: 'theaters',
    foreignKey: 'movie_id',
  });
};


module.exports = Movie;