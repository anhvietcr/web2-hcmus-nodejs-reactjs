const User = require('../models/user');
const Verify = require('../models/verify');
const bodyParser = require('body-parser');
const Movie = require('../models/movie');
const Showtime = require('../models/showtime');
const Booking = require('../models/booking');
const Theater = require('../models/theater');
const Ticket = require('../models/ticket');
const Cinema = require('../models/cinema');
const Register = require('../models/register');
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
//
// {
//     "payload": {
//     "fullname": "Loi hai",
//         "email": "aaa@gmail.com",
//         "password": "123",
//         "repassword":"123"
// }
// }


router.post('/register', jsonParser, async function (req, res) {
    const payload = req.body.payload;
    const password = payload.password;
    const email = payload.email.toLowerCase();
    const repassword = payload.repassword;
    const fullname = payload.fullname;

    const temp = await User.findOne({
        where: { email:email },
    });
    if (temp) {
        let response = {
            status: 403,
            payload: {

            }
        };
        res.json(response);
        return;
    }
    if (repassword != password) {
        let response = {
            status: 401,
            payload: {

            }
        };
        res.json(response);
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    let code = Math.random().toString(36).substring(2);
    Register.create({
        email: email,
        fullname: fullname,
        password: hashedPassword,
        code:code,
        done:false
    }).then(function (register) {
        //res.json(user)
        if(!register)
        {
            let response = {
                status: 409,
                message:"Không thể insert xuống CSDL"
            };
            res.json(response);
            return;
        }
    });
    var contain = `Bấm vào link <a href = \`https://web2ck.herokuapp.com/auth/verify/${code}\`> này </a> để xác nhận đăng ký`;
    console.log(contain);
    const info = await sendmail(email, 'Xác nhận đăng ký', '', '<h1>Đăng ký tài khoản</h1>'+contain);
    // res.send(info);
    let respone = {
        status:200,
        message:"Đã gửi mail thành công!",
        payload:{
        }
    };
    res.json(respone);
});

router.get('/register', jsonParser, async function (req, res) {

    const code = req.query.code;
    console.log(code);
    const register =  await Register.findOne({
        where:{
            code:code
        }
    });


    if(!register || register =="")
    {
        let respone = {
            status:403,
            message:"Lỗi tìm kiếm chuỗi mã hóa vui lòng đăng ký lại"
        };
        res.json(respone);
    }
    else {
        const createTime = register.createdAt;
        var now = new Date();
        var dt = Math.abs(now - createTime);

        //set time in 10 minute
        if (dt <= 600000 && register.done == false) {
            //Nếu xác nhận được thì trả về email => Hiển thị form user/veryfile để cập nhật mật khẩu mới
            var user = await  User.create({
                email: register.email,
                fullname: register.fullname,
                password: register.password,
                role:0
            });
            const v = await Register.update({
                done: true
            }, {
                where: {
                    code: code
                }
            });
            //res.json(user)
            if(!user || !v)
            {
                let response = {
                    status: 409,
                    message:"Không thể insert xuống CSDL vui lòng đăng ký lại"
                };
                res.json(response);
            }
            else{
                let response = {
                    status: 200,
                    payload:{
                        userId:user.id,
                        email:user.email,
                        fullname:user.fullname,
                        role:user.role
                    }
                };
                res.json(response);
            }
        }
        else {
            let respone = {
                status: 408,
                message: "Chuỗi mã đã hết hạn vui lòng đăng ký lại!"
            };
            res.json(respone);
        }
    }
});
/** ===========   LOGIN =============*/

// {
//     "payload": {
//     "email":"aaa@gmail.com",
//         "password":"11"
// }
// }

router.post('/login',jsonParser, async function (req, res) {
    const payload = req.body.payload;
    const email = payload.email.toLowerCase();
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

            },
            message:"Không tồn tại email vui lòng kiểm tra lại"
        };
        res.json(response);
        return;
    }
    if (!bcrypt.compareSync(password, user.password)) {

        let response = {
            status: 403,//Sai mat khau
            payload: {

            },
            message:"Sai password vui lòng kiểm tra lại"
        };
        res.json(response);
        return;
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
/******** ****** **** ======= PROFILE ========= ****** ******* ******* *****/



router.get('/profile',jsonParser, async function f(req, res) {
    const payload = req.body.payload;
    const id = payload.userId;
    //const id = 1;
    const user = await User.findOne({
        where: { id },
    });
    if (!user) {
        let response = {
            status: 403,
            message: "Không tồn tại tài khoản người dùng, vui lòng đăng nhập lại"
        };
        res.json(response);
        return;
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
    const payload = req.body.payload;
    const email =  payload.email.toLowerCase();
    //const email = "phannhutrang@gmail.com";
    const temp = await User.findOne({
        where: { email },
    });
    if (!temp) {
        let response = {
            status: 403,
            message: "Không tồn tại email vui lòng đăng nhập lại"
        };
        res.json(response);
        return;
    }
    const password = payload.password;
    const repassword = payload.repassword;
    const phone = payload.phone;
    const fullname = payload.fullname;


    // const password = "123456";
    // const repassword = "123456";
    // const fullname = "Nhu Trang";
    // const phone = "09876543";

    if (password !== repassword) {
        let response = {
            status: 403,
            message: "Password không khớp nhau vui lòng kiểm tra lại"
        };
        res.json(response);
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user =await User.update({
        password: hashedPassword,
        phone: phone,
        fullname: fullname
    }, {
            where: {
                email: email
            }
        });

    if(user)
    {
        //res.json(user)
        let response = {
            status: 200,
            payload: {

            }
        };
        res.json(response);
    }
    else{
        let response = {
            status: 408,
            message:"Lỗi không cập nhật được!"
        };
        res.json(response);
    }

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
    const email = payload.email.toLowerCase();

    const user = await User.findOne({
        where: {email: email}
    });
    if (!user || user == "") {
        let respone = {
            status: 403,
            message: "email không tồn tại vui lòng kiểm tra lại!"

        };
        res.json(respone);
        return;
    }
    let verify = await Verify.create({
       email:user.email,
       code:code,
        done:false
    });
    if(!verify){
        let respone = {
            status:403,
            message:"Lỗi không insert được"
        };
        res.json(respone);
        return;
    }
    var contain = `Bấm vào link <a href = \`https://web2ck.herokuapp.com/auth/forgot-password/${code}\`> này </a> để khôi phục mật khẩu`;
    //console.log(contain);
    const info = await sendmail(email, 'Quên mật khẩu', 'Bạn có quên mật khẩu', '<h1>Bạn có quên mật khẩu</h1>'+contain);
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
    });
    verify.then(function (v) {
        if(!v || v =="")
        {
            let respone = {
                status:403,
                message:"Lỗi tìm kiếm chuỗi mã hóa"
            };
            res.json(respone);
            return;
        }
        else {


            const createTime = v.createdAt;
            var now = new Date();
            var dt = Math.abs(now - createTime);

            //set time in 10 minute
            if (dt <= 600000 && v.done == false) {
                //Nếu xác nhận được thì trả về email => Hiển thị form user/veryfile để cập nhật mật khẩu mới
                let respone = {
                    status: 200,
                    message: "Xác nhận được mã code",
                    payload: {
                        email: v.email,
                        code:code
                    }
                };
                res.json(respone);
                return;

            } else {
                let respone = {
                    status: 408,
                    message: "Chuỗi mã đã hết hạn vui lòng nhập lại email!"
                };
                res.json(respone);
            }
        }
    });

});

//
// {
//     "payload": {
//     "email":"aaa@gmail.com",
//         "code":"scbgnbm",
//         "newpassword":"131",
//         "renewpassword":"131"
// }
// }



router.put('/verify',jsonParser, async function (req, res) {

    const payload = req.body.payload;
    const email = payload.email.toLowerCase();
    const code = payload.code;
    const newpassword = payload.newpassword;
    const renewpassword = payload.renewpassword;


    const verify = await Verify.findOne({
        where:{
            code:code,
            email:email
        }
    });
    if(!verify || verify =="")
    {
        let respone = {
            status:403,
            message:"Lỗi tìm kiếm chuỗi mã hóa"
        };
        res.json(respone);
        return verify;
    }

    if (verify.done == true) {
        console.log("Chuỗi hết hạn");
        let respone = {
            status: 408,
            message: "Chuỗi mã đã hết hạn!"
        };
        res.json(respone);
        return verify;
    }
    console.log("jgfsf");
    const user = await User.findOne({
        where: {
            email:email
        }
    });
    if (!user) {
        let response = {
            status: 403,
            message: "Không tồn tại email"
        };
        res.json(response);
        return;
    }
    if (newpassword !== renewpassword) {
        let response = {
            status: 403,
            message: "Mật khẩu không khớp nhau"
        };
        res.json(response);
        return;
    }

    console.log("Update password");
    const hashedPassword = bcrypt.hashSync(newpassword, 10);
    const u = await User.update({
        password: hashedPassword,

    }, {
        where: {
            email:email
        }
    });
    const v = await Verify.update({
        done: true
    }, {
        where: {
            code: code
        }
    });
    if(v && u)
    {
        let respone = {
            message:"Cập nhật thành công!",
            status: 200
        };
        res.json(respone);
    }
    else{
        let respone = {
            message:"Cập nhật không thành công!",
            status: 409
        };
        res.json(respone);
    }

});


/** ====== HISTORY ========= */

// {
//     "payload": {
//     "userId":"1"
// }
// }


router.post('/history',jsonParser, async (req, res) => {
    const payload = req.body.payload;
    const userId = payload.userId;
    const history = await Booking.findAll({
        attributes: ['id', 'user_id', 'showtime_id','createdAt'],
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
