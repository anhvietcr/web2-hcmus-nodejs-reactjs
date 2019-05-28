const Sequelize = require('sequelize');
const db = require('./db')

const Verify = db.define("Verify", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    code:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});
module.exports = Verify;
