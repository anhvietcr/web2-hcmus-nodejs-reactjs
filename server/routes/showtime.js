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
        movie_id: newShowtime.name,
        theater_id: newShowtime.image,
        start_time: newShowtime.trailer,
        end_time: newShowtime.introduce,
        price: newShowtime.opening_day,
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
        movie_id: updateShowtime.name,
        theater_id: updateShowtime.image,
        start_time: updateShowtime.trailer,
        end_time: updateShowtime.introduce,
        price: updateShowtime.opening_day,
        updated_at: updated_at
    },
        {
            where: {
                id: req.params.id
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