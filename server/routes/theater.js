const Theater = require('../models/theater')
const Cinema = require('../models/cinema')
const Router = require('express-promise-router')
const bodyParser = require('body-parser')
const Movie = require('../models/movie')
const Showtime = require('../models/showtime')

let router = new Router();

var jsonParser = bodyParser.json()

router.get('/', async (req, res, next) => {
    var theaters = null
    var status = 200;
    var message = '';
    var payload = null;

    if (typeof req.query.id !== 'undefined') {
        theaters = await Theater.findOne({
            where: {
                id: req.query.id
            },
            include: [{
                model: Cinema,
                as: 'cinema',
                required: false,
            }]
        });

        if (!theaters || theaters.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                theater: theaters
            }
        }

    } else {
        theaters = await Theater.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: Cinema,
                    as: 'cinema',
                    required: false,
                }]
            },
        );
        if (!theaters || theaters.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                theaters: theaters
            }
        }
    }

    return res.json({
        status: status,
        message: message,
        payload: payload
    });
});

router.get('/showtime', async (req, res, next) => {

    var status = 200;
    var message = '';
    var payload = null
    const theaterQuery = await Theater.findOne({
        where: {
            id: req.query.theater_id
        },
    });

    if (!theaterQuery || theaterQuery.length <= 0) {
        status = 404;
        message = "Not found theater";

    } else {
        const movies = await Movie.findAll({
            include: [{
                model: Showtime,
                as: 'showtimes',
                required: true,
                where: {
                    theater_id: theaterQuery.id
                }
            }]
        });
        if (!movies && movies.length <= 0) {
            status = 404;
            message = "Not found theater";
        } else {
            const theater = {
                name: theaterQuery.name,
                cinema_id: theaterQuery.cinema_id,
                type: theaterQuery.type,
                number_row: theaterQuery.number_row,
                number_column: theaterQuery.number_column,
                id: theaterQuery.id,
                createdAt: theaterQuery.createdAt,
                updatedAt: theaterQuery.updatedAt,
                movies: movies
            };
            payload = {
                theater: theater
            }
        }
    }

    return res.json({
        status: status,
        message: message,
        payload: payload
    });
});

// {
// 	"theater": {
// 		"cinema_id": 2,
// 		"name": "KHTN2",
// 		"type": "2d",
// 		"number_row": 10,
// 		"number_column": 10
// 	}
// }

router.post('/', jsonParser, async (req, res) => {
    const newTheater = req.body.theater;

    const cinemas = await Cinema.findAll({
        where: {
            id: newTheater.cinema_id
        }
    });
    var status = 200;
    var message = '';
    var theater = null
    if (!cinemas || cinemas.length <= 0) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const created_at = new Date();
        theater = await Theater.create({
            name: newTheater.name,
            cinema_id: newTheater.cinema_id,
            type: newTheater.type,
            number_row: newTheater.number_row,
            number_column: newTheater.number_column,
            created_at: created_at
        });

        if (!theater) {
            status = 503;
            message = 'Create theater failed';
        }
    }
    return res.json({
        status: status,
        message: message,
        payload: {
            theater: theater
        }
    });
});

router.put('/', jsonParser, async (req, res) => {
    const updateTheater = req.body.theater;
    const cinemas = await Cinema.findAll({
        where: {
            id: updateTheater.cinema_id
        }
    });
    var status = 200;
    var message = '';

    if (!cinemas || cinemas.length <= 0) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const updated_at = new Date();
        const numAffectedRows = await Theater.update({
            name: updateTheater.name,
            type: updateTheater.type,
            cinema_id: updateTheater.cinema_id,
            number_row: updateTheater.number_row,
            number_column: updateTheater.number_column,
            updated_at: updated_at
        },
            {
                where: {
                    id: updateTheater.id
                }
            });

        if (numAffectedRows <= 0) {
            status = 503;
            message = 'Update theater failed';
        }
    }

    return res.json({
        status: status,
        message: message,
    });
});

router.delete('/:id', async (req, res, next) => {
    const numAffectedRows = await Theater.destroy({
        where: {
            id: req.params.id
        }
    });

    var status = 200;
    var message = '';

    if (numAffectedRows <= 0) {
        status = 503;
        message = 'Delete theater failed';
    }

    return res.json({
        status: status,
        message: message,
    });
});

module.exports = router
