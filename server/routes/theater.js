const Theater = require('../models/theater')
const Cinema = require('../models/cinema')
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

// required
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
    var theater = new Theater()
    if (cinemas.length <= 0) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const created_at = new Date();
        const theater = await Theater.create({
            name: newTheater.name,
            cinema_id: newTheater.cinema_id,
            type: newTheater.type,
            number_row: newTheater.number_row,
            number_column: newTheater.number_column,
            created_at: created_at
        });
        var status = 200;
        var message = '';

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
    const cinemas = await Cinema.findAll({
        where: {
            id: req.params.id
        }
    });
    var status = 200;
    var message = '';

    if (!cinemas) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const updated_at = new Date();
        const updateTheater = req.body.theater;
        const numAffectedRows = await Theater.update({
            name: updateTheater.name,
            cinema_id: updateTheater.cinema_id,
            type: updateTheater.type,
            number_row: updateTheater.number_row,
            number_column: updateTheater.number_column,
            updated_at: updated_at
        },
            {
                where: {
                    id: updateTheater.id
                }
            });
        var status = 200;
        var message = '';

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