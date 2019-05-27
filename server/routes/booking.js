const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const Router = require('express-promise-router');
let router = new Router();

// {
// 	"booking": {
// 		"user_id": 222222222,
// 		"showtime_id":1,
// 		"bookingtime": "2018-11-07 15:03:16.532+00",
// 		"totalprice": 200000
// 	}
// }

router.get('/history', async (req, res) => {
    // const history = await Cinema.findAll({
    //
    //     attributes: ['id','name'],
    //     include: [{
    //         model: Theater,
    //         as: 'theaters',
    //         required: false,
    //         attributes: ['id', 'name', 'cinema_id'],
    //         include: [{
    //             model: Showtime,
    //             as: 'showtimes',
    //             required: false,
    //             attributes: ['id','movie_id','theater_id','start_time','end_time'],
    //             include: [{
    //                 model: Movie,
    //                 as: 'movies',
    //                 required: false,
    //                 attributes: ['id', 'name'],
    //             }],
    //             include: [{
    //                 model: Booking,
    //                 as: 'bookings',
    //                 required: false,
    //                 attributes: ['id', 'user_id', 'showtime_id'],
    //                // where:{user_id :1}
    //             }]
    //         }]
    //     }]
    // });
    const history = await Booking.findAll({
        attributes: ['id', 'user_id', 'showtime_id'],
        where: {
            //id: req.body.payload.userId
            user_id: 1
        },
        include: [
            {
                model: Showtime,
                as: 'showtime',
                required: false,
                attributes: ['id', 'movie_id', 'theater_id', 'start_time', 'end_time'],
                include: [
                    {
                        model: Theater,
                        as: 'theater',
                        // required: false,
                        attributes: ['id', 'name', 'cinema_id'],
                        include: [{
                            model: Cinema,
                            as: 'cinema',
                            // required: false,
                            attributes: ['id', 'name'],
                        }],
                    },
                    {
                        model: Movie,
                        as: 'movie',
                        //required: false,
                        attributes: ['id', 'name'],
                    }
                ]
            },
            {
                model: Ticket,
                as: 'tickets',
                //required: false,
                attributes: ['booking_id', 'chair_id'],
            }
        ]
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
