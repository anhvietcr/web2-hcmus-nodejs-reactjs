const User = require('../models/user');
const Movie = require('../models/movie');
const showtime = require('../models/showtime');

const bcrypt = require('bcrypt');
const Router = require('express-promise-router');
let router = new Router();
const sendmail = require('../models/email');

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


router.post('/register', async function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    const repassword = req.body.repassword;
    const fullname = req.body.fullname;

    // const password = "123456";
    // const email = "phannhutrang@gmail.com";
    // const repassword = "123456";
    // const fullname = "Nhu Trang";

    const temp = await User.findOne({
        where: { email },
    });
    if (temp) {
        let response = {
            payload: {
                status: 403,
                temp: temp
            }
        };
        res.json(response);
    }
    if (repassword != password) {
        let response = {
            payload: {
                status: 401,
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
            payload: {
                status: 200,
                user: user
            }
        };
        res.json(response);
    });
});

router.post('/login', async function (req, res) {
    const { email, password } = req.body;
    //const email = "phanthinhutrang@gmail.com";
    //const password = "123456";
    const user = await User.findOne({
        where: { email },
    });
    if (!user) {

        let response = {
            payload: {
                status: 403,//Khong ton tai email
            }
        };
        res.json(response);
    }
    if (!bcrypt.compareSync(password, user.password)) {

        let response = {
            payload: {
                status: 403,//Sai mat khau
            }
        };
        res.json(response);
    }
    res.json(user);
});

router.post('/logout', function (req, res) {
    if (req.body.payload.userId) {
        let response = {
            payload: {
                status: 200,//Tồn tại user đang đăng nhập mới thoát được
            }
        };
        res.json(response);
    }
});

router.put('/forgot', async function (req, res) {
    const email = req.body.payload.email;
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
                payload: {
                    user: user
                }
            };
            res.json(response);
        });
});

router.get('/profile', async function f(req, res) {
    const id = req.body.payload.userId;
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
                user: user
            }
        }
        res.json(response);
    }
});
router.put('/profile', async function (req, res) {
    const email = req.body.payload.email;
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
                    user: user
                }
            };
            res.json(response);
        });
});


router.get('/forget-password', async function (req, res) {
    const info = await sendmail("phanthinhutranghahl@gmail.com", 'Quên mật khẩu', 'Bạn có quên mật khẩu', '<h1>Bạn có quên mật khẩu</h1>');
    res.send(info);
    //res.send("Hello");
});


module.exports = router;
