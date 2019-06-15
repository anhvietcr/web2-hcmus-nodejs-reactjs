const Sequelize = require('sequelize')

if (process.env.DATABASE_URL) {
	///////////////
	// ON HEROKU //
	///////////////
	db = new Sequelize(process.env.DATABASE_URL, {
		dialect:  'postgres',
	    protocol: 'postgres',
	    logging:  true //false
	})
} else {
	///////////////////
	// Local machine //
	///////////////////
	db = new Sequelize('postgres://postgres:123456@localhost:5432/web2_cuoiky');
}

module.exports = db;