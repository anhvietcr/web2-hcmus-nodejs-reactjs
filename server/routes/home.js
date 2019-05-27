const Router = require('express-promise-router');
const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Theater = require('../models/theater');
const Cinema = require('../models/cinema');
const User = require('../models/user');
const Booking = require('../models/booking');
const Ticket = require('../models/ticket');
var models = {
    Movie,
    Showtime,
    Theater,
    Cinema,
    Booking,
    User,
    Ticket
}

Theater.associate(models);
Movie.associate(models);
Cinema.associate(models);
Booking.associate(models);
User.associate(models);
Ticket.associate(models);
Showtime.associate(models);
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

module.exports = router;
