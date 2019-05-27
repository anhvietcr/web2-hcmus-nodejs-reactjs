const router = require('express-promise-router');

const bodyparse  = require('body-parser');
const jsonParser = bodyparse.json();
const Ticket = require('../models/ticket');

router.post('/',jsonParser,async (req,res)=>{
    const payload = req.body.payload;
    const booking_id = payload.booking_id;
    const chair_id = payload.chair_id;
    const address_x = payload.address_x;
    const address_y = payload.address_y;
    const price  =  payload.price;
    const ticket = await Ticket.create({
        booking_id: booking_id,
        chair_id: chair_id,
        address_x: address_x,
        address_y: address_y,
        price:price
    }).then(function (ticket) {
        //res.json(user)
        let response = {
            status: 200,
            payload: {
                ticket: ticket
            }
        };
        res.json(response);
    });
});
