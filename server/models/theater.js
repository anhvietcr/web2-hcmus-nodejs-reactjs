const Sequelize = require('sequelize');
const db = require('./db')

const Theater = db.define("Theater", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cinema_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type:   Sequelize.ENUM,
    values: ['2d', '3d', '4dx']
  },
  number_rows: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  number_column: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

Theater.associate = function(models) {
  Role.belongsToMany(models.Movie, {
    through: 'Showtime',
    as: 'showtimes',
    foreignKey: 'theater_id'
  });
  Theater.belongsTo(models.Cinema, {
    foreignKey : 'id',
    targetKey: 'cinema_id'
  });
};

module.exports = Theater;