const Router = require('express-promise-router');

const bodyparse  = require('body-parser');
const jsonParser = bodyparse.json();
const Ticket = require('../models/ticket');
const router = new Router();
router.post('/',jsonParser,async (req,res)=>{

    //.. Xử lý dữ liệu trên đây
    // {
    //     "payload": {
    //     "booking_id": 1,
    //         "chair_id":"B2",
    //         "address_x": "Hang thu 2",
    //         "address_y": "Cot thu 2",
    //         "price":20000
    // }
    // }

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
    });
    let response = {
        status: 200,
        payload: {
            ticket: ticket
        }
    };
    res.json(response);
});

module.exports = router;
