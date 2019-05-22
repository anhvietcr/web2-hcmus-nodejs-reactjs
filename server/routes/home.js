const User = require('../models/user')
const Router = require('express-promise-router')
const Movie = require('../models/movie')
const Showtime = require('../models/showtime')
const Theater = require('../models/theater')
const Cinema = require('../models/cinema')


var models = {
    Router,
    Movie,
    Showtime,
    Theater,
    Cinema
}

Theater.associate(models);
Movie.associate(models);
Cinema.associate(models);

let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    res.json({
        data: {
            id: 1,
            email: "demo@admin.com"
        }
    });

    next();
});

router.post('/', async (req, res, next) => {
    next();
});

router.put('/', async (req, res, next) => {
    next();
});

router.delete('/', async (req, res, next) => {
    next();
});

module.exports = router