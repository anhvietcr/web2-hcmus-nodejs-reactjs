const Sequelize = require('sequelize');
const db = require('./db')

const Theater = db.define("Theater", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cinema_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Cinemas',
      key: 'id'
    }
  },
  type: {
    type: Sequelize.ENUM,
    values: ['2d', '3d', '4dx']
  },
  number_rows: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  number_column: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Theater.associate = function (models) {
  Theater.belongsTo(models.Cinema, {
    foreignKey: 'cinema_id',
    as: 'cinema'
  });
  Theater.belongsToMany(models.Movie, {
    through: models.Showtime,
    as: 'movies',
    foreignKey: 'theater_id'
  });
};

module.exports = Theater;