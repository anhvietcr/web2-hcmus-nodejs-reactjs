const User = require('../models/user')
const Cinema = require('../models/cinema')
const Movie = require('../models/movie')
const theater = require('../models/theater')

const Router = require('express-promise-router')
let router = new Router();

/***************Auth API ******************/
router.get('/', async (req, res, next) => {
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