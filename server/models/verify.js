const Sequelize = require('sequelize');
const db = require('./db')

const Verify = db.define("Verify", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    code:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    done:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    }
});
module.exports = Verify;
