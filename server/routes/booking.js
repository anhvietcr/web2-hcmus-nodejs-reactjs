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

module.exports = router;
