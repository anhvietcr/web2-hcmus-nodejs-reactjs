const User = require('../models/user');
const Movie = require('../models/movie');
const showtime = require('../models/showtime');

const bcrypt = require('bcrypt');
const Router = require('express-promise-router');
let router = new Router();

/***************Auth API ******************/
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


router.post('/register',async function(req,res) {
    const password = req.body.password;
    const email = req.body.email;
    const repassword = req.body.repassword;
    const fullname = req.body.fullname;

    // const password = "123456";
    // const email = "phannhutrang@gmail.com";
    // const repassword = "123456";
    // const fullname = "Nhu Trang";

    const temp = await User.findOne({
        where:{email},
    });
    if(temp)
    {
        let response = {
            payload: {
                status: 403,
                temp:temp
            }
        };
        res.json(response);
    }
    if(repassword!=password)
    {
        let response = {
            payload: {
                status: 401,
            }
        };
        res.json(response);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
        email:email,
        fullname:fullname,
        password:hashedPassword,
        role:0 //Cái này quy định sao??
    }).then(function(user){
        //res.json(user)
        let response = {
            payload: {
                status: 200,
                user:user
            }
        };
        res.json(response);


    });
});

router.post('/login', async function(req,res) {
    const {email,password}=req.body;
    //const email = "phanthinhutrang@gmail.com";
    //const password = "123456";
    const user = await User.findOne({
        where:{email},
    });
    if(!user)
    {

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

router.post('/logout', function (req,res) {
    if(req.body.userId)
    {
        let response = {
            payload: {
                status: 200,//Tồn tại user đang đăng nhập mới thoát được
            }
        };
        res.json(response);
    }
});

router.put('/forgot',async function(req,res) {
    const email = req.body.email;
    //const email = "phannhutrang@gmail.com";
    const temp = await User.findOne({
        where:{email},
    });
    if(!temp)
    {
        let response = {
            payload: {
                status: 403,
                temp:temp
            }
        };
        res.json(response);
    }

    const newpassword = req.body.newpassword;
    const renewpassword = req.body.renewpassword;
    // const newpassword = "123";
    // const renewpassword = "123";
    if(newpassword!==renewpassword)
    {
        let response = {
            payload: {
                status: 403,
                temp:temp
            }
        };
        res.json(response);
    }

    const hashedPassword = bcrypt.hashSync(newpassword, 10);
    const user = await User.update({
        password:hashedPassword,

    }, {
        where:{
            email:email
         }
    }).then(function(user){
        //res.json(user)
        let response = {
            payload: {
                status: 200,
                user:user
            }
        };
        res.json(response);
    });
});

module.exports = router;
