const Movie = require('../models/movie')
const Router = require('express-promise-router')
const { Op } = require('sequelize');
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    const movies = await Movie.findAll(
        {
            order: [
                ['id', 'DESC'],
            ],
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

router.get('/:id', async (req, res, next) => {
    const movies = await Movie.findOne({
        where: {
            id: req.params.id
        }
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

router.get('/search/:keyword', async (req, res, next) => {
    const movies = await Movie.findAll({
        where: {
            name: { [Op.like]: '%' + req.params.keyword + '%' }
        }
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
    const movie = await Movie.create({
        name: newMovie.name,
        image: newMovie.image,
        trailer: newMovie.trailer,
        introduce: newMovie.introduce,
        opening_day: newMovie.opening_day,
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
            opening_day: updateMovie.opening_day,
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

module.exports = router