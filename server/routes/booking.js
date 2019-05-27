const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const Router = require('express-promise-router');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
let router = new Router();

// {
//     "payload": {
//     "user_id": 1,
//         "showtime_id":1,
//         "bookingtime": "2018-11-07 15:03:16.532+00",
//         "totalprice": 200000
// }
// }

router.post('/',jsonParser,async (req,res)=>{
    const payload = req.body.payload;
    const user_id = payload.user_id;
    const showtim_id = payload.showtime_id;
    const bookingtime = payload.bookingtime;
    const totalprice = payload.totalprice;
    const booking = await Booking.create({
        user_id: user_id,
        showtime_id: showtim_id,
        bookingtime: bookingtime,
        totalprice: totalprice
    }).then(function (booking) {
        //res.json(user)
        let response = {
            payload: {
                status: 200,
                booking: booking
            }
        };
        res.json(response);
    });
});

router.get('/history',jsonParser, async (req, res) => {
    const payload = req.body.payload;
    const userId = payload.userId;
    const history = await Booking.findAll({
        attributes: ['id', 'user_id', 'showtime_id'],
        where: {
            //id: req.body.payload.userId
            user_id: userId
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
            history:history
        }
    });
});

module.exports = router;
