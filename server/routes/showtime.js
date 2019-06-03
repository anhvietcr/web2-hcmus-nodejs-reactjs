const Showtime = require('../models/showtime');
const Theater = require('../models/theater');
const Cinema = require('../models/cinema');
const Utils = require('../models/utils');
const Router = require('express-promise-router');
const bodyParser = require('body-parser');
const Movie = require('../models/movie');
let router = new Router();
var jsonParser = bodyParser.json();

router.get('/', async (req, res, next) => {
    var showtimes = null;
    var status = 200;
    var message = '';
    var payload = null

    if (typeof req.query.id !== 'undefined') {
        showtimes = await Showtime.findOne({
            where: {
                id: req.query.id
            },
            include: [{
                model: Theater,
                as: 'theater',
                required: false,
                include: [{
                    required: false,
                    model: Cinema,
                    as: 'cinema',
                }]
            },
            {
                required: false,
                model: Movie,
                as: 'movie',
            }],
        });

        if (!showtimes || showtimes.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                showtime: showtimes
            }
        }

    } else {
        showtimes = await Showtime.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: Theater,
                    required: false,
                    as: 'theater',
                    include: [{
                        required: false,
                        model: Cinema,
                        as: 'cinema',
                    }]
                },
                {
                    required: false,
                    model: Movie,
                    as: 'movie',
                }],
            }
        );

        if (!showtimes || showtimes.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                showtimes: showtimes
            }
        }
    }

    return res.json({
        status: status,
        message: message,
        payload: payload
    });
});

router.post('/', jsonParser, async (req, res, next) => {
    const created_at = new Date();
    const newShowtime = req.body.showtime;
    const theaters = await Theater.findAll({
        where: {
            id: newShowtime.theater_id
        },
    });

    if (!theaters || theaters.length <= 0) {
        return res.json({
            status: 404,
            message: "Not found theater",
        });
    }

    const movies = await Movie.findAll({
        where: {
            id: newShowtime.movie_id
        }
    });

    if (!movies || movies.length <= 0) {
        return res.json({
            status: 404,
            message: "Not found movie",
        });
    }
    const start_time = Utils.dateParse(newShowtime.start_time);
    const end_time = Utils.dateParse(newShowtime.end_time);

    const showtime = await Showtime.create({
        movie_id: newShowtime.movie_id,
        theater_id: newShowtime.theater_id,
        start_time: start_time,
        end_time: end_time,
        price: newShowtime.price,
        created_at: created_at
    });

    var status = 200;
    var message = '';

    if (!showtime) {
        status = 503;
        message = 'Create showtime failed';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            showtime: showtime
        }
    });
});

// {
// 	"showtime": {
// 		"movie_id": 1,
// 		"theater_id": 1,
// 		"start_time": "2018-11-07 15:03:16.532+00",
// 		"end_time": "2018-11-07 15:03:16.532+00",
// 		"price": 90000
// 	}
// }

router.put('/', jsonParser, async (req, res, next) => {
    const updated_at = new Date();
    const updateShowtime = req.body.showtime;

    const theaters = await Theater.findAll({
        where: {
            id: updateShowtime.theater_id
        },
    });

    if (!theaters || theaters.length <= 0) {
        return res.json({
            status: 404,
            message: 'Not found theater',
        });
    }

    const movies = await Movie.findAll({
        where: {
            id: updateShowtime.movie_id
        },
    });

    if (!movies || movies.length <= 0) {
        return res.json({
            status: 404,
            message: 'Not found movie',
        });
    }

    const showtimes = await Showtime.findAll({
        where: {
            id: updateShowtime.id
        }
    });

    const start_time = Utils.dateParse(updateShowtime.start_time);
    const end_time = Utils.dateParse(updateShowtime.end_time);


    var status = 200;
    var message = '';

    if (!showtimes || showtimes.length <= 0) {
        status = 404;
        message = 'Not found';
    } else {
        const numAffectedRows = await Showtime.update({
            movie_id: updateShowtime.movie_id,
            theater_id: updateShowtime.theater_id,
            start_time: start_time,
            end_time: end_time,
            price: updateShowtime.price,
            updated_at: updated_at
        },
            {
                where: {
                    id: updateShowtime.id
                }
            });
        var status = 200;
        var message = '';

        if (numAffectedRows <= 0) {
            status = 503;
            message = 'Update showtime failed';
        }
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

module.exports = router;
