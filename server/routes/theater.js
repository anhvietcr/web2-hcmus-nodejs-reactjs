const Theater = require('../models/theater')
const Router = require('express-promise-router')
let router = new Router();

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    Theater.findAll().then((result) => res.json(result));

    res.json({
        data: {
            id: 1,
            name: 'ROOM_01',
            cinema_id: 1,
            type: '2d',
            number_rows: 20,
            number_columns: 20,
            created_at: new Date()
        }
    });

    next();
});

router.get('/:id', async (req, res, next) => {
    Theater.findById(req.params.id).then((result) => res.json(result));

    res.json({
        data: {
            id: 1,
            name: 'ROOM_01',
            cinema_id: 1,
            type: '2d',
            number_rows: 20,
            number_columns: 20,
            created_at: new Date()
        }
    });

    next();
});


router.post('/', async (req, res, next) => {
    const created_at = new Date();
    const newTheater = req.body.post;
    Theater.create({
        name: newTheater.name,
        cinema_id: newPost.cinema_id,
        type: newTheater.type,
        number_rows: newTheater.number_rows,
        number_columns: newTheater.number_columns,
        created_at: created_at
    })
        .then(post => {
            res.json(post);
        });
    next();
});

router.put('/:id', async (req, res, next) => {
    const updated_at = new Date();
    Theater.update({
        name: newTheater.name,
        cinema_id: newPost.cinema_id,
        type: newTheater.type,
        number_rows: newTheater.number_rows,
        number_columns: newTheater.number_columns,
        updated_at: updated_at
    },
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result));
    next();
});

router.delete('/:id', async (req, res, next) => {
    Theater.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => res.json(result));
    next();
});

module.exports = router