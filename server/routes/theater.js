const Theater = require('../models/theater')
const Router = require('express-promise-router')
let router = new Router();
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    const theaters = await Theater.findAll();
    var status = 200;
    var message = '';

    if (!theaters) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            theaters: theaters
        }
    });
});

router.get('/:id', async (req, res, next) => {
    const theaters = await Theater.findOne({
        where: {
            id: req.params.id
        }
    });
    var status = 200;
    var message = '';

    if (!theaters) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            theaters: theaters
        }
    });
});

router.post('/', jsonParser, async (req, res, next) => {
    const created_at = new Date();
    const newTheater = req.body.theater;
    const theater = await Theater.create({
        name: newTheater.name,
        cinema_id: newTheater.cinema_id,
        type: newTheater.type,
        number_rows: newTheater.number_rows,
        number_columns: newTheater.number_columns,
        created_at: created_at
    });
    var status = 200;
    var message = '';

    if (!theater) {
        status = 503;
        message = 'Create theater failed';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            theater: theater
        }
    });
});

router.put('/:id', async (req, res, next) => {
    const updated_at = new Date();
    const updateTheater = req.body.theater;

    const numAffectedRows = await Theater.update({
        name: updateTheater.name,
        cinema_id: updateTheater.cinema_id,
        type: updateTheater.type,
        number_rows: updateTheater.number_rows,
        number_columns: updateTheater.number_columns,
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
        message = 'Update theater failed';
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