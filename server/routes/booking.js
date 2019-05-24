const User = require('../models/user');
const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const Router = require('express-promise-router');

let router = new Router();

/***************Auth API ******************/

router.get('/history', async (req, res) => {
    const history = await Booking.findAll({
        attributes: ['id','user_id','showtime_id'],
        where: {
            //id: req.body.payload.userId
            id:1
        },
        include: [{
            model: Showtime,
            as: 'showtime',
            required: false,
            attributes: ['id','movie_id','theater_id','start_time','end_time'],
           include: [{
                    model: Theater,
                    as: 'theater',
                    required: false,
                    attributes: ['id','name','cinema_id'],
                   include: [{
                       model: Cinema,
                       as: 'cinema',
                       required: false,
                       attributes: ['id','name'],
                       include: [{
                           model: Movie,
                           as: 'movie',
                           required: false,
                           attributes: ['id','name'],
                           include: [{
                               model: Ticket,
                               as: 'ticket',
                               required: false,
                               attributes: ['booking_id','chair_id'],
                                    }]
                                  }]
                             }]
                    }]
                 }]
    });

    var status = 200;
    var message = '';

    if (!history || history.length <= 0) {
        status = 404;
        message = 'Not found';
    }

    return res.json({
        status: status,
        message: message,
        payload: {
            history: history
        }
    });
});
module.exports = router;
