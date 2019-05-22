const Movie = require('../models/movie')
const Router = require('express-promise-router')
let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    const movies = await Movie.findAll();
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

router.post('/', async (req, res, next) => {
    const created_at = new Date();
    const newMovie = req.body.movie;
    const movie = await Movie.create({
        name: newMovie.name,
        image: newMovie.image,
        trailer: newMovie.trailer,
        introduce: newMovie.introduce,
        opening_day: newMovie.opening_day,
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

router.put('/:id', async (req, res, next) => {
    const updated_at = new Date();
    const updateMovie = req.body.movie;

    const numAffectedRows = await Movie.update({
        name: updateMovie.name,
        image: updateMovie.image,
        trailer: updateMovie.trailer,
        introduce: updateMovie.introduce,
        opening_day: updateMovie.opening_day,
        view: updateMovie.view,
        updated_at: updated_at
    },
        {
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