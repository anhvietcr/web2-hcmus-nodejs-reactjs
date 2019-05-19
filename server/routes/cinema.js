const Cinema = require('../models/cinema')
const Router = require('express-promise-router')
let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    return await Cinema.findAll().then((result) => res.json(result));
});

router.get('/:id', async (req, res, next) => {
    return await Cinema.findAll({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
});

router.post('/', async (req, res, next) => {
    const created_at = new Date();
    const newCinema = req.body.cinema;
    return await Cinema.create({
        name: newCinema.name,
        image: newPost.image,
        trailer: newCinema.trailer,
        introduce: newCinema.introduce,
        opening_day: newCinema.opening_day,
        minute_time: newCinema.minute_time,
        view: newCinema.view,
        created_at: created_at
    })
        .then(post => {
            res.json(post);
        });
});

router.put('/:id', async (req, res, next) => {
    const updated_at = new Date();
    const updateCinema = req.body.cinema;
    return await Cinema.update({
        name: updateCinema.name,
        image: updateCinema.image,
        trailer: updateCinema.trailer,
        introduce: updateCinema.introduce,
        opening_day: updateCinema.opening_day,
        minute_time: updateCinema.minute_time,
        view: updateCinema.view,
        updated_at: updated_at
    },
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result));
});

router.delete('/:id', async (req, res, next) => {
    return await Cinema.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
});

module.exports = router