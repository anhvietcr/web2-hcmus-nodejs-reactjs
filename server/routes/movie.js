const Movie = require('../models/movie')
const Router = require('express-promise-router')
let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    return await Movie.findAll().then((result) => res.json(result));
});

router.get('/:id', async (req, res, next) => {
    return await Movie.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
});

router.post('/', async (req, res, next) => {
    const created_at = new Date();
    const newMovie = req.body.movie;
    return await Movie.create({
        name: newMovie.name,
        image: newMovie.image,
        trailer: newMovie.trailer,
        introduce: newMovie.introduce,
        opening_day: newMovie.opening_day,
        view: newMovie.view,
        created_at: created_at
    })
        .then(post => {
            if (!post) {
                return res.render("error", {
                    message: "Page not found.",
                    error: {
                        status: 404,
                    }
                });
            }
            res.json(post);
        });
});

router.put('/:id', async (req, res, next) => {
    const updated_at = new Date();
    const updateMovie = req.body.movie;

    return await Movie.update({
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
        }).then((result) => res.json(result));
});

router.delete('/:id', async (req, res, next) => {
    return await Movie.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
});

module.exports = router