const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
var moment = require('moment');
const Router = require('express-promise-router');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
let router = new Router();


/**
 payload: 

    [
        ['01/01/2019', 1000],
        ['02/01/2019', 500],
        
    ]

 */

// "payload": {
//     "start_date": '01/01/2019',
//     "end_date": '02/02/2019',
//     "theater_id": 1.
//      "movie_id": 1 
// }
// }
router.post('/movie_revenue',jsonParser,(req,res,next)=>{
    var start_date = req.body.payload.start_date;
    const end_date = req.body.payload.end_date;
    const theater_id = req.body.payload.theater_id;
    const movie_id = req.body.payload.movie_id;
    start_date = moment(start_date).add('days', 7);
    let response = {
        payload: {
            status: 404,
            start_date: start_date,
        }
    };
    res.json(response);

});

module.exports = router;
