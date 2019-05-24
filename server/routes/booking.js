const User = require('../models/user');
const Movie = require('../models/movie');
const showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Router = require('express-promise-router');

let router = new Router();

/***************Auth API ******************/

router.get('/history', async function f(req,res) {

    Booking.sequelize.query("SELECT * FROM Users", { type: Booking.sequelize.QueryTypes.SELECT})
        .then(users => {
            res.json(users);
        });

    // const user = await User.findAll().then(user=>{
    //    res.json(user);
    // });
});
module.exports = router;

