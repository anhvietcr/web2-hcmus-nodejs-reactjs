const Sequelize = require('sequelize');
const db = require('./db')

const Showtime = db.define("Showtime", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "id cannot be null" }
        }
    },
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Movies',
            key: 'id'
        },
        validate: {
            notNull: { args: true, msg: "theater_id cannot be null" }
        }
    },
    theater_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Theaters',
            key: 'id'
        },
        validate: {
            notNull: { args: true, msg: "theater_id cannot be null" }
        }
    },
    start_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "start_time cannot be null" }
        }
    },
    end_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "end_time cannot be null" }
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "price cannot be null" }
        }
    },
});

module.exports = Showtime;