const Showtime = require('../models/showtime')
const Theater = require('../models/theater')
const Movie = require('../models/movie')
const Router = require('express-promise-router')
let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    const showtimes = await Showtime.findAll();
    var status = 200;
    var message = '';

    if (!showtimes) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            showtimes: showtimes
        }
    });
});

router.get('/:id', async (req, res, next) => {
    const showtimes = await Showtime.findOne({
        where: {
            id: req.params.id
        }
    });

    var status = 200;
    var message = '';

    if (!showtimes) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            showtimes: showtimes
        }
    });

});

router.get('/:movie_id/:cinema_id', async (req, res, next) => {
    const theater = await Theater.findAll({
        where: {
            cinema_id: req.params.cinema_id
        },
        include: [{
            model: Movie,
            as: 'movies',
            required: false,
            attributes: ['id', 'name', 'image', 'trailer', 'introduce', 'opening_day', 'view'],
            where: {
                id: req.params.movie_id,
            },
            through: {
                attributes: ['start_time', 'end_time', 'price'],
            }
        }]
    });

    var status = 200;
    var message = '';

    if (!theater) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            theater: theater
        }
    });
});

router.get('/theater/:theater_id', async (req, res, next) => {
    const theater = await Theater.findAll({
        where: {
            id: req.params.theater_id
        },
        include: [{
            model: Movie,
            as: 'movies',
            required: false,
            attributes: ['id', 'name', 'image', 'trailer', 'introduce', 'opening_day', 'view'],
            through: {
                attributes: ['start_time', 'end_time', 'price'],
            }
        }]
    });

    var status = 200;
    var message = '';

    if (!theater) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            theater: theater
        }
    });
});

router.post('/', async (req, res, next) => {
    const created_at = new Date();
    const newShowtime = req.body.Showtime;
    const theater = await Showtime.create({
        movie_id: newShowtime.movie_id,
        theater_id: newShowtime.theater_id,
        start_time: newShowtime.start_time,
        end_time: newShowtime.end_time,
        price: newShowtime.price,
        created_at: created_at
    });

    var status = 200;
    var message = '';

    if (!theater) {
        status = 503;
        message = 'Create showtime failed';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            theater: theater
        }
    });
});

router.put('/:id', async (req, res, next) => {
    const updated_at = new Date();
    const updateShowtime = req.body.Showtime;

    const numAffectedRows = await Showtime.update({
        start_time: updateShowtime.start_time,
        end_time: updateShowtime.end_time,
        price: updateShowtime.price,
        updated_at: updated_at
    },
        {
            where: {
                id: req.params.id,
                movie_id: updateShowtime.movie_id,
                theater_id: updateShowtime.theater_id,
            }
        });
    var status = 200;
    var message = '';

    if (numAffectedRows <= 0) {
        status = 503;
        message = 'Update showtime failed';
    }

    return res.json({
        status: status,
        message: message,
    });
});

router.delete('/:id', async (req, res, next) => {
    const numAffectedRows = await Showtime.destroy({
        where: {
            id: req.params.id
        }
    });
    
    var status = 200;
    var message = '';

    if (numAffectedRows <= 0) {
        status = 503;
        message = 'Delete showtime failed';
    }

    return res.json({
        status: status,
        message: message,
    });
});

module.exports = router