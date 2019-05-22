const Showtime = require('../models/showtime')
const Router = require('express-promise-router')
let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    return await Showtime.findAll().then((result) => res.json(result));
});

router.get('/:id', async (req, res, next) => {
    return await Showtime.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
});

router.post('/', async (req, res, next) => {
    const created_at = new Date();
    const newShowtime = req.body.Showtime;
    return await Showtime.create({
        movie_id: newShowtime.movie_id,
        theater_id: newShowtime.theater_id,
        start_time: newShowtime.start_time,
        end_time: newShowtime.end_time,
        price: newShowtime.price,
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
    const updateShowtime = req.body.Showtime;

    return await Showtime.update({
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
        }).then((result) => res.json(result));
});

router.delete('/:id', async (req, res, next) => {
    return await Showtime.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
});

module.exports = router