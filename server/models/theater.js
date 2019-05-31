const Sequelize = require('sequelize');
const db = require('./db')
const Utils = require("./utils");

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
    values: ['2d', '3d', '4dx'],
    allowNull: false,
    validate: {
      notNull: { args: true, msg: "type cannot be null" }
    },
  },
  number_row: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: { args: true, msg: "number_row cannot be null" }
    },
  },
  number_column: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: { args: true, msg: "number_column cannot be null" }
    },
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

Theater.associate = function (models) {
  Theater.belongsTo(models.Cinema, {
    foreignKey: 'cinema_id',
    as: 'cinema'
  });
  Theater.hasMany(models.Showtime, {
    foreignKey: 'theater_id',
    sourceKey: 'id',
    as: 'showtimes'
  });
};
module.exports = Theater;
