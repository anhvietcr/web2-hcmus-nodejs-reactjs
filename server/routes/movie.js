const Movie = require('../models/movie')
const Theater = require('../models/theater')
const Cinema = require('../models/cinema')
const Showtime = require('../models/showtime')
const Utils = require('../models/utils')
const Router = require('express-promise-router')
const { Op } = require('sequelize');
const bodyParser = require('body-parser')
var Sequelize = require('sequelize');

var jsonParser = bodyParser.json()

let router = new Router();

router.get('/', async (req, res) => {
    var movies = null
    var payload = null
    var status = 200;
    var message = '';

    if (typeof req.query.id === 'undefined') {
        movies = await Movie.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
                include: [
                    {
                        model: Showtime,
                        as: 'showtimes',
                        include: [{
                            required: false,
                            model: Theater,
                            as: 'theater',
                            include: [{
                                required: false,
                                model: Cinema,
                                as: 'cinema',
                            }]
                        },],
                    },
                ]
            }
        );

        if (!movies || movies.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                movies: movies
            }
        }
    } else {
        movies = await Movie.findOne({
            where: {
                id: req.query.id
            },
            include: [
                {
                    model: Showtime,
                    as: 'showtimes',
                    include: [{
                        model: Theater,
                        as: 'theater',
                        required: false,
                        include: [{
                            required: false,
                            model: Cinema,
                            as: 'cinema',
                        }]
                    },],
                },
            ]
        });

        if (!movies || movies.length <= 0) {
            status = 404;
            message = 'Not found';
        } else {
            payload = {
                movie: movies
            }
        }
    }


    return res.json({
        status: status,
        message: message,
        payload: payload
    });
});

// Get all showtime for movie
// ../cienemas?movie_id=[your_id]
router.get('/cinemas', async (req, res, next) => {
    var payload = null
    const movies = await Movie.findOne(
        {
            where: {
                id: req.query.movie_id
            },
        }
    );
    var status = 200;
    var message = '';

    if (!movies || movies.length <= 0) {
        status = 404;
        message = 'Not found';
    } else {
        const cinemas = await Cinema.findAll({
            include: [{
                model: Theater,
                as: 'theaters',
                required: true,
                include: [{
                    required: true,
                    model: Showtime,
                    as: 'showtimes',
                    where: {
                        movie_id: req.query.movie_id
                    }
                }]
            },],
        });
        payload = {
            movie: movies,
            cinemas: cinemas
        }
    }

    return res.json({
        status: status,
        message: message,
        payload: payload
    });
});



router.get('/trending', async (req, res, next) => {
    const movies = await Movie.findAll(
        {
            order: [
                ['view', 'DESC'],
            ],
            where: {
                view: {
                    [Op.gt]: [0]
                }
            }
        }
    );
    var status = 200;
    var message = '';

    if (!movies) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            movies: movies
        }
    });
});


router.get('/new', async (req, res) => {
    const movies = await Movie.findAll(
        {
            order: [
                ['opening_day', 'DESC'],
            ],
            where: {
                opening_day: {
                    [Op.gte]: new Date()
                }
            },
            include: [
                {
                    model: Showtime,
                    as: 'showtimes',
                    required: false,
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
                    ],
                },
            ]
        }
    );

    var status = 200;
    var message = '';

    if (!movies) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            movies: movies
        }
    });
});

router.get('/search/:keyword', async (req, res, next) => {

    var keyword = decodeURI(req.params.keyword).toLowerCase();

    const movies = await Movie.findAll({
        where: {
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Movie.name')), 'LIKE', '%' + keyword + '%')
        },
        include: [
            {
                model: Showtime,
                as: 'showtimes',
                include: [{
                    required: false,
                    model: Theater,
                    as: 'theater',
                    include: [{
                        required: false,
                        model: Cinema,
                        as: 'cinema',
                    }]
                },],
            },
        ]
    });

    var status = 200;
    var message = '';

    if (!movies || movies.length <= 0) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            movies: movies
        }
    });
});

// {
// 	"movie": {
// 		"name": "Sieu nhan",
// 		"image": "",
// 		"trailer": "",
// 		"introduce": "",
// 		"opening_day": "2019-05-24T06:40:14.671Z",
// 		"minute_time": 90,
// 		"view": 0
// 	}
// }

router.post('/', jsonParser, async (req, res, next) => {
    const created_at = new Date();
    const newMovie = req.body.movie;
    const opening_day = Utils.dateParse(req.body.movie.opening_day);

    const movie = await Movie.create({
        name: newMovie.name,
        image: newMovie.image,
        trailer: newMovie.trailer,
        introduce: newMovie.introduce,
        opening_day: opening_day,
        minute_time: newMovie.minute_time,
        view: newMovie.view,
        created_at: created_at
    });

    var status = 200;
    var message = '';

    if (!movie) {
        status = 503;
        message = 'Create movie failed';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            movie: movie
        }
    });
});

router.put('/', jsonParser, async (req, res, next) => {
    const updated_at = new Date();
    const updateMovie = req.body.movie;
    const opening_day = Utils.dateParse(req.body.movie.opening_day);
    const movies = await Movie.findOne({
        where: {
            id: updateMovie.id
        }
    });

    var status = 200;
    var message = '';

    if (!movies || movies.length <= 0) {
        status = 404;
        message = 'Not found movie';
    } else {
        const numAffectedRows = await Movie.update({
            name: updateMovie.name,
            image: updateMovie.image,
            trailer: updateMovie.trailer,
            introduce: updateMovie.introduce,
            opening_day: opening_day,
            minute_time: updateMovie.minute_time,
            view: updateMovie.view,
            updated_at: updated_at
        },
            {
                where: {
                    id: updateMovie.id
                }
            });

        if (numAffectedRows <= 0) {
            status = 503;
            message = 'Update movie failed';
        }
    }

    return res.json({
        status: status,
        message: message,
    });
});


router.put('/view', jsonParser, async (req, res, next) => {
    const updated_at = new Date();
    const movieId = req.query.id;

    const movies = await Movie.findAll({
        where: {
            id: movieId
        }
    });

    var status = 200;
    var message = '';

    if (!movies || movies.length <= 0) {
        status = 404;
        message = 'Not found movie';
    } else {
        var movie = movies[0];
        const numAffectedRows = await Movie.update({
            view: movie.view + 1,
            updated_at: updated_at
        },
            {
                where: {
                    id: movie.id
                }
            });

        if (numAffectedRows <= 0) {
            status = 503;
            message = 'Update movie failed';
        }
    }

    return res.json({
        status: status,
        message: message,
    });
});

router.delete('/:id', async (req, res, next) => {
    const numAffectedRows = await Movie.destroy({
        where: {
            id: req.params.id
        }
    });

    var status = 200;
    var message = '';

    if (numAffectedRows <= 0) {
        status = 503;
        message = 'Update movie failed';
    }

    return res.json({
        status: status,
        message: message,
    });
});

module.exports = router;
