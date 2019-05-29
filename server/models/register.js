const Sequelize = require('sequelize');
const db = require('./db')

const Register = db.define("Register", {
    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});

module.exports = Register;
