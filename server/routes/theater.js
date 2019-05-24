const Theater = require('../models/theater')
const Cinema = require('../models/cinema')
const Router = require('express-promise-router')
const bodyParser = require('body-parser')

let router = new Router();

var jsonParser = bodyParser.json()

/***************HOME API ******************/
router.get('/', async (req, res, next) => {
    const theaters = await Theater.findAll();
    var status = 200;
    var message = '';

    if (!theaters || theaters.length <= 0) {
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

    if (!theaters || theaters.length <= 0) {
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
    var theater = null
    if (!cinemas || cinemas.length <= 0) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const created_at = new Date();
        theater = await Theater.create({
            name: newTheater.name,
            cinema_id: newTheater.cinema_id,
            type: newTheater.type,
            number_row: newTheater.number_row,
            number_column: newTheater.number_column,
            created_at: created_at
        });

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
    const updateTheater = req.body.theater;
    const cinemas = await Cinema.findAll({
        where: {
            id: updateTheater.cinema_id
        }
    });
    var status = 200;
    var message = '';

    if (!cinemas || cinemas.length <= 0) {
        status = 404;
        message = 'Not found cinema';
    } else {
        const updated_at = new Date();
        const numAffectedRows = await Theater.update({
            name: updateTheater.name,
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