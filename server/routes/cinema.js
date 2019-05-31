const Cinema = require('../models/cinema')
const Theater = require('../models/theater')
const Movie = require('../models/movie')
const Showtime = require('../models/showtime')
const Router = require('express-promise-router')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
let router = new Router();

router.get('/', async (req, res, next) => {
    var status = 200;
    var message = '';
    var payload = null;
    var cinemas = null
    if (typeof req.query.id !== 'undefined') {
        cinemas = await Cinema.findOne({
            where: {
                id: req.query.id
            }
        });
        if (!cinemas || cinemas.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                cinema: cinemas
            }
        }
    } else {
        cinemas = await Cinema.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
            }
        );
        if (!cinemas || cinemas.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                cinemas: cinemas
            }
        }
    }

    return res.json({
        status: status,
        message: message,
        payload: payload
    });
});


router.get('/theater', async (req, res) => {
    const cinema = await Cinema.findOne({
        where: {
            id: req.query.cinema_id
        },
        include: [{
            model: Theater,
            as: 'theaters',
            required: false,
            include: [{
                model: Showtime,
                as: 'showtimes',
                required: false,
                include: [{
                    model: Movie,
                    as: 'movie',
                    required: false,
                }]
            }]
        }]
    });

    var status = 200;
    var message = '';

    if (!cinema) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            cinema: cinema
        }
    });
});

router.get('/movie/showtime', async (req, res, next) => {
    const cinema = await Cinema.findOne({
        where: {
            id: req.query.cinema_id
        },
        include: [{
            model: Theater,
            as: 'theaters',
            required: false,
            include: [{
                model: Showtime,
                as: 'showtimes',
                required: false,
                include: [{
                    model: Movie,
                    as: 'movie',
                    required: false,
                    where: {
                        id: req.query.movie_id,
                    },
                }]
            }]
        }]
    });

    var status = 200;
    var message = '';

    if (!cinema) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            cinema: cinema
        }
    });
});


// {
//     "cinema": {
//         "name": "KHTN2",
//             "address": "2d",
//                 "image": ""
//     }
// }

router.post('/', jsonParser, async (req, res) => {
    const created_at = new Date();
    const newCinema = req.body.cinema;
    const cinema = await Cinema.create({
        name: newCinema.name,
        address: newCinema.address,
        image: newCinema.image,
        created_at: created_at
    });

    var status = 200;
    var message = '';

    if (!cinema) {
        status = 503;
        message = 'Create cinema failed';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            cinema: cinema
        }
    });
});

router.put('/', jsonParser, async (req, res, next) => {
    const updated_at = new Date();
    const cinema = req.body.cinema;

    const cinemas = await Cinema.findAll({
        where: {
            id: cinema.id
        }
    });

    var status = 200;
    var message = '';

    if (!cinemas || cinemas.length <= 0) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const numAffectedRows = await Cinema.update({
            name: cinema.name,
            address: cinema.address,
            image: cinema.image,
            updated_at: updated_at
        },
            {
                where: {
                    id: cinema.id
                }
            });

        if (numAffectedRows <= 0) {
            status = 503;
            message = 'Update cinema failed';
        }

    }


    return res.json({
        status: status,
        message: message,
    });
});

router.delete('/:id', async (req, res, next) => {
    const numAffectedRows = await Cinema.destroy({
        where: {
            id: req.params.id
        }
    });

    var status = 200;
    var message = '';

    if (numAffectedRows <= 0) {
        status = 503;
        message = 'Service Unavailable';
    }

    return res.json({
        status: status,
        message: message,
    });
});

module.exports = router
