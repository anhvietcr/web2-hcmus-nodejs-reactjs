const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const Router = require('express-promise-router');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var sequelize = require('sequelize');
const moment = require('moment');
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

// revenue movie_id for interval time(each days)
router.post('/movie_revenue', jsonParser, async (req, res, next) => {
    //take date json and convert to moment
    var start_date = moment(req.body.payload.start_date, 'DD/MM/YYYY').toDate();
    var end_date = moment(req.body.payload.end_date, 'DD/MM/YYYY').toDate();
    //start_date must be <= end_date
    if (moment(end_date).diff(start_date, 'days') >= 0) {
        //const theater_id = req.body.payload.theater_id;
        const movie_id = req.body.payload.movie_id;
        const result = [];
        //loop each days of interval find revenue
        for (var m = moment(start_date); m.diff(end_date, 'days') <= 0; m.add(1, 'days')) {
            //take string day like booking.bookingtime('DD/MM/YYYYY')
            var stringday = m.format('DD') + '/' + m.format('MM') + '/' + m.format('YYYY');
            //find revenue with movie_id and day
            var revenue_date_movie = await Booking.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('totalprice')), 'total']],
                raw: true,
                group: ['showtime.id'],
                where: {
                    bookingtime: stringday
                },
                include: [{
                    model: Showtime,
                    raw: true,
                    as: "showtime",
                    where: {
                        movie_id: movie_id
                    }
                }]
            });
            //push result 
            if (revenue_date_movie.length <= 0) {
                result.push([stringday, 0]);
            }
            else {
                result.push([stringday, revenue_date_movie[0].total]);
            }
        }

        let response = {
            payload: {
                status: 200,
                message: "success",
                arrayrevenue: result
            }
        };
        res.json(response);
    }
    else
    {
        let response = {
            payload: {
                status: 404,
                message: "start_date must be <= end_date"
            }
        };
        res.json(response);
    }
});
// revenue cinema for interval time(each days)
router.post('/cinema_revenue', jsonParser, async (req, res, next) => {
    //take date json and convert to moment
    var start_date = moment(req.body.payload.start_date, 'DD/MM/YYYY').toDate();
    var end_date = moment(req.body.payload.end_date, 'DD/MM/YYYY').toDate();
    //start_date must be <= end_date
    if (moment(end_date).diff(start_date, 'days') >= 0) {
        //const theater_id = req.body.payload.theater_id;
        const cinema_id = req.body.payload.cinema_id;
        const result = [];
        //loop each days of interval find revenue
        for (var m = moment(start_date); m.diff(end_date, 'days') <= 0; m.add(1, 'days')) {
            //take string day like booking.bookingtime('DD/MM/YYYYY')
            var stringday = m.format('DD') + '/' + m.format('MM') + '/' + m.format('YYYY');
            //find revenue with cinema_id and day
            var revenue_date_cinema = await Booking.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('totalprice')), 'total']],
                raw: true,
                group: ['showtime.id','showtime->theater.id'],
                where: {
                    bookingtime: stringday
                },
                include: [{
                    model: Showtime,
                    raw: true,
                    as: "showtime",
                    //group: ['showtime->theater.id'],
                    include: [{
                        model: Theater,
                        raw: true,
                        as: "theater",
                        where: {
                            cinema_id: cinema_id
                        }
                    }]
                }]
            });
            //push result 
            if (revenue_date_cinema.length <= 0) {
                result.push([stringday, 0]);
            }
            else {
                result.push([stringday, revenue_date_cinema[0].total]);
            }
        }

        let response = {
            payload: {
                status: 200,
                message: "success",
                arrayrevenue: result
            }
        };
        res.json(response);
    }
    else
    {
        let response = {
            payload: {
                status: 404,
                message: "start_date must be <= end_date"
            }
        };
        res.json(response);
    }
});

module.exports = router;
