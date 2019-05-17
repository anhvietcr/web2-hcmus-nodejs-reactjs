const Sequelize = require('sequelize');
const db = require('./db')

const Showtime = db.define("Showtime", {
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    theater_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    start_time: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    end_time: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Showtime;