const User = require('../models/user');
const Verify = require('../models/verify');
const bodyParser = require('body-parser');
const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const bcrypt = require('bcrypt');
const Router = require('express-promise-router');
let router = new Router();
const sendmail = require('../models/email');
var jsonParser = bodyParser.json();
const dateTime = require('node-datetime');
/*************** Auth API ******************/
router.get('/', async (req, res, next) => {
    next();
});

router.post('/', async (req, res, next) => {
    next();
});

router.put('/', async (req, res, next) => {
    next();
});

router.delete('/', async (req, res, next) => {
    next();
});

// {t
//     "payload": {
//     "fullname": "Loi hai",
//         "email": "aaa@gmail.com",
//         "password": "123",
//         "repassword":"123"
//}
// }


router.post('/register', jsonParser, async function (req, res) {
    const payload = req.body.payload;
    const password = payload.password;
    const email = payload.email;
    const repassword = payload.repassword;
    const fullname = payload.fullname;

    const temp = await User.findOne({
        where: { email },
    });
    if (temp) {
        let response = {
            status: 403,
            payload: {

            }
        };
        res.json(response);
    }
    if (repassword != password) {
        let response = {
            status: 401,
            payload: {

            }
        };
        res.json(response);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
        email: email,
        fullname: fullname,
        password: hashedPassword,
        role: 0 //Cái này quy định sao??
    }).then(function (user) {
        //res.json(user)
        let response = {
            status: 200,
            payload: {
                id:user.id,
                email: email,
                fullname:fullname
            }
        };
        res.json(response);
    });
});

router.post('/login',jsonParser, async function (req, res) {
    const payload = req.body.payload;
    const email = payload.email;
    const password = payload.password;
    //const email = "phanthinhutrang@gmail.com";
    //const password = "123456";
    const user = await User.findOne({
        where: { email },
    });
    if (!user) {

        let response = {
            status: 403,//Khong ton tai email
            payload: {

            }
        };
        res.json(response);
    }
    if (!bcrypt.compareSync(password, user.password)) {

        let response = {
            status: 403,//Sai mat khau
            payload: {

            }
        };
        res.json(response);
    }
    let response = {
        status: 200,
        payload: {
            id:user.id,
            email: email,
            role: user.role,
            fullname: user.fullname,
            phone:user.phone
        }
    };
    res.json(response);
});

router.post('/logout',jsonParser, function (req, res) {
    const payload = req.body.payload;
    if (payload.userId) {
        let response = {
            status: 200,//Tồn tại user đang đăng nhập mới thoát được
            payload: {

            }
        };
        res.json(response);
    }
});

//cập nhật thông tin cá nhân
/******** ****** **** profile ****** ******* ******* *****/
router.get('/profile',jsonParser, async function f(req, res) {
    const payload = req.payload;
    const id = payload.userId;
    //const id = 1;
    const user = await User.findOne({
        where: { id },
    });
    if (!user) {
        let response = {
            status: 403,
            message: "Không tồn tại ID User"
        };
        res.json(response);
    }
    else {
        let response = {
            status: 200,
            payload: {
            }
        };
        res.json(response);
    }
});
router.put('/profile',jsonParser, async function (req, res) {
    const payload = req.payload;
    const email = payload.email;
    //const email = "phannhutrang@gmail.com";
    const temp = await User.findOne({
        where: { email },
    });
    if (!temp) {
        let response = {
            status: 403,
            message: "Không tồn tại email"
        };
        res.json(response);
    }
    const password = req.body.payload.password;
    const repassword = req.body.payload.repassword;
    const phone = req.body.payload.phone;
    const fullname = req.body.payload.fullname;


    // const password = "123456";
    // const repassword = "123456";
    // const fullname = "Nhu Trang";
    // const phone = "09876543";

    if (password !== repassword) {
        let response = {
            status: 403,
            message: "Password không khớp nhau"
        };
        res.json(response);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.update({
        password: hashedPassword,
        phone: phone,
        fullname: fullname
    }, {
            where: {
                email: email
            }
        }).then(function (user) {
            //res.json(user)
            let response = {
                status: 200,
                payload: {

                }
            };
            res.json(response);
        });
});

/******** ****** **** forget-password ****** ******* ******* *****/

/*
*: Show form forget-password => nhập địa chỉ email => post /forget-password => Gửi mail => xác nhận mail trả về json
* =>show form cập nhật password (post /user/verify)
* */

//for verify
// {
//     "payload": {
//     "email":"aaa@gmail.com"
// }
// }
router.post('/forget-password',jsonParser, async function (req, res) {

    let code = Math.random().toString(36).substring(2);

    const payload = req.body.payload;
    const email = payload.email;

    const user = await User.findOne({
        where: { email:email },
    });

    if(!user || user == ""){
        let respone ={
            status:403,
            message:"email không tồn tại!"

        };
        res.json(respone);
    }
    let temp = await Verify.create({
       email:user.email,
       code:code,
        done:false
    });
    if(!temp){
        let respone = {
          status:403,
          message:"Không insert được csdl xuống"
        };
        res.json(respone);
    }
    var contain = `Bấm vào link <a href = \`http://localhost:5000/user/verify?code=${code}\`> này </a> để khôi phục mật khẩu`;
    console.log(contain);
    //const info = await sendmail("phanthinhutranghahl@gmail.com", 'Quên mật khẩu', 'Bạn có quên mật khẩu', '<h1>Bạn có quên mật khẩu</h1>'+contain);
    // res.send(info);
    let respone = {
        status:200,
        message:"Đã gửi mail thành công!",
        payload:{
        }
    };
    res.json(respone);
});

router.get('/verify',async function (req,res) {

    const code = req.query.code;
    console.log(code);
    const verify = Verify.findOne({
        where:{
            code:code
        }
    }).then(function (user) {
        //res.json(user)
        let response = {
            status: 200,
            payload:{

            }
        };
        res.json(response);
    }).catch(function (err) { });

    if(!verify || verify =="")
    {
        let respone = {
            status:403,
            message:"Lỗi tìm kiếm chuỗi mã hóa"
        };
        res.json(respone);
    }
    if(verify){
        const dt = dateTime.create();
        console.log(dt - verify.createdAt);
//Nếu xác nhận được thì trả về email => Hiển thị form user/veryfile để cập nhật mật khẩu mới
        let respone = {
            status:200,
            message:"Xác nhận được mã code",
            payload:{
                email:verify.email,

            }
        };
        res.json(respone);
    }

});


router.put('/verify',jsonParser, async function (req, res) {
    const payload = req.payload;
    const email = payload.email;
    //const email = "phannhutrang@gmail.com";
    const temp = await User.findOne({
        where: { email },
    });
    if (!temp) {
        let response = {
            status: 403,
            message: "Không tồn tại email"
        };
        res.json(response);
    }

    const newpassword = req.body.payload.newpassword;
    const renewpassword = req.body.payload.renewpassword;
    // const newpassword = "123";
    // const renewpassword = "123";
    if (newpassword !== renewpassword) {
        let response = {
            status: 403,
            message: "Mật khẩu không khớp nhau"
        };
        res.json(response);
    }

    const hashedPassword = bcrypt.hashSync(newpassword, 10);
    const user = await User.update({
        password: hashedPassword,

    }, {
        where: {
            email: email
        }
    }).then(function (user) {
        //res.json(user)
        let response = {
            status: 200,
            payload:{

            }
        };
        res.json(response);
    });
});

router.post('/history',jsonParser, async (req, res) => {
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
//Còn set thời gian sống của nó và tại sao lại không thể truy vấn ra code?
