const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const Router = require('express-promise-router');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const uuidv1 = require('uuid/v1');
const moment = require('moment');
let router = new Router();

// "payload": {
//     "user_id": 1,
//     "showtime_id":1,
//     "arraylocation": [{"x": 6,"y":1},{"x":0,"y": 0}]
// }
// }
router.post('/', jsonParser, async (req, res) => {
    //get uuid
    var generateidbooking = uuidv1();
    //get date
    var day = new Date();
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = day.getFullYear();
    const today = dd + '/' + mm + '/' + yyyy;
    //const today = moment().toDate();
    //create booking
    const payload = req.body.payload;
    const uid = generateidbooking;
    const user_id = payload.user_id;
    const showtim_id = payload.showtime_id;
    const bookingtime = today;
    const arraylocation = payload.arraylocation;
    //find ticket price
    const price = await Showtime.findOne({
        where: { id: showtim_id }
    });
    //tatol price
    const totalprice = price.price * arraylocation.length;
    //console.log(arraylocation[0].x);
    //create tickets
    const booking_id = uid;
    //var chair_id  ;
    //var address_x ;
    //var address_y ;
    var i;
    var status = 200;
    var message = '';
    const booking = await Booking.create({
        id: uid,
        user_id: user_id,
        showtime_id: showtim_id,
        bookingtime: bookingtime,
        totalprice: totalprice,
    });
    if (booking) {
        var list = [];
        var success = true;
        for (i = 0; i < arraylocation.length; i++) {
            var tickets = await Ticket.create({
                booking_id: booking_id,
                chair_id: arraylocation[i].x + "" + arraylocation[i].y,
                address_x: arraylocation[i].x,
                address_y: arraylocation[i].y,
                price: price.price
            });
            if (!tickets) {
                success = false;
                break;
                //res.json(response);
            }
            else {
                list.push(tickets);
            }
        }
        if (success) {
            let response = {
                payload: {
                    status: 200,
                    message: "sucess",
                    tickets: list
                }
            }
            res.json(response);
        }
        else {
            let response = {
                payload: {
                    status: 404,
                    message: "fail to create ticket"
                }
            }
            res.json(response);
        }
    }
    else {
        let response = {
            payload: {
                status: 404,
                message: "can't create booking"
            }
        };
        res.json(response);
    }
    //create booking for client

});
router.post('/chairordered', jsonParser, async (req, res) => {
    const payload = req.body.payload;
    const theater_id = payload.theater_id;
    const showtime_id = payload.showtime_id;
    const chairordered = await Ticket.findAll({
        raw: true,
        include: [{
            model: Booking,
            where: {
                showtime_id: showtime_id
            },
            raw: true,
            as: 'booking',
            include: [{
                model: Showtime,
                raw: true,
                as: 'showtime',
                where: {
                    theater_id: theater_id,
                    id: showtime_id
                }
            }]
        }]
    });
    if (chairordered) {
        var arraylocation = [];
        for (var i = 0; i < chairordered.length; i++) {
            arraylocation.push({ "x": chairordered[i].address_x, "y": chairordered[i].address_y });
        }
        let response = {
            payload: {
                status: 200,
                message: "sucess",
                arraylocation: arraylocation
            }
        };
        res.json(response);
    }
    else {
        let response = {
            payload: {
                status: 404,
                message: "not found"
            }
        };
        res.json(response);
    }
});

module.exports = router;
