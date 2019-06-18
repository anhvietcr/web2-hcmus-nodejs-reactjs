const Movie = require('../models/movie')
const Theater = require('../models/theater')
const Cinema = require('../models/cinema')
const Showtime = require('../models/showtime')
const Utils = require('../models/utils')
const Router = require('express-promise-router')
const { Op } = require('sequelize');
const bodyParser = require('body-parser')
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

let router = new Router();

var Sequelize = require('sequelize');

var jsonParser = bodyParser.json()

const URLS = [
    'https://moveek.com/phim-viet-nam',
    'https://moveek.com/dang-chieu/',
    'https://moveek.com/phim-thang-01-2019/',
    'https://moveek.com/phim-thang-02-2019/',
]

router.post('/movie', jsonParser, async (req, res, next) => {
    var map = new Map();
    for (var ii = 0; ii < URLS.length; ii++) {
        var entry = URLS[ii];
        await request(entry, async function (err, res, body) {
            if (err) {
                console.log(err);

                return res.json({
                    error: err,
                });
            }
            else {
                const arr = [];
                let $ = await cheerio.load(body);

                await $('div.main-content div.container.mt-3 div.row div.col-md-10 div.row.grid div').each(async function (index) {

                    const data = await $(this).find('div.mb-4.position-relative>a').attr('href');
                    var image = await $(this).find('div img').attr('src');
                    const name = await $(this).find('div.mb-4.position-relative>a').attr('title');
                    var obj = {
                        trailer: '',
                        introduce: '',
                        image: image,
                        name: name,
                        openday: Date(),
                        time: 0
                    };
                    if (!(obj.name.trim() in map)) {
                        await request('https://moveek.com' + data, async function (err1, res1, body1) {
                            let $1 = await cheerio.load(body1);
                            obj.introduce = await $1('div.main-content div div div.row.row-sm div.col-12.col-sm-10 div.row div.col-12.col-lg-7 p.mb-3.text-justify').text();
                            var trailer = await $1('div.main-content div div div.row.row-sm div.col-12.col-sm-10 div.row div.col-12.col-lg-7 div.btn-block.text-sm-left.text-center.mb-3 > a.btn.btn-outline-light.btn-sm').attr('href');
                            image = await $1('div.main-content div div div.row.row-sm div.d-none.d-sm-block.col-2 a img').attr('data-src');
                            if (image != null) {
                                obj.image = image;
                                //console.log(image)
                            }

                            await $1('div.main-content div div div.row.row-sm div.col-12.col-sm-10 div.row div.col-12.col-lg-7 div.row.mb-3 div.col.text-center.text-sm-left').each(async function (index1) {
                                if (await $1(this).find('span').eq(0).text() == 'Khởi chiếu') {
                                    obj.openday = $1(this).find('span').eq(1).text()
                                } else if (await $1(this).find('span').eq(0).text() == 'Thời lượng') {
                                    obj.time = $1(this).find('span').eq(1).text().split(' ')[0]
                                    //console.log(obj.time)
                                }
                            });


                            await request('https://moveek.com' + trailer, async function (err3, res3, body3) {
                                let $2 = await cheerio.load(body3);
                                var video = await $2('div.main-content div.container.mt-3 div.row div.col-md-8 div.card.card-article div.card-body div.post-content.mb-4 div.js-video.youtube.widescreen iframe').attr('src');

                                if (typeof video !== 'undefined') {
                                    video = video.replace('//', 'https://')
                                    obj.trailer = video
                                }

                                const created_at = new Date();
                                var opening_day = Utils.dateParse(obj.openday);
                                opening_day = new Date(opening_day);

                                const movie = await Movie.create({
                                    name: obj.name,
                                    image: obj.image,
                                    trailer: obj.trailer,
                                    introduce: obj.introduce,
                                    opening_day: opening_day,
                                    minute_time: obj.time,
                                    view: 0,
                                    created_at: created_at
                                });
                                map[obj.name.trim()] = obj;

                            })
                        });

                    }

                });

            }
        });
    };

    return res.json({
        status: 200,
        message: 'OK',
    });
});



router.post('/cinema', jsonParser, async (req, res, next) => {

    request('https://moveek.com/', function (err, res, body) {
        if (err) {
            console.log(err);

            return res.json({
                error: err,
            });
        }
        else {
            const arr = [];
            let $ = cheerio.load(body);

            $('div.modal.fade div.modal-dialog.modal-lg div.modal-content div.modal-body.pt-0.pb-0.pl-0.pr-0 div.card.lists.mb-0 div.pt-3.list div.border-bottom').each(async function (index) {
                const address = $(this).find('div.row.align-items-center.pl-4.pr-4.pb-3.pt-3 p.card-text.small.text-muted.address.mb-0').text()
                const name = $(this).find('div.row.align-items-center.pl-4.pr-4.pb-3.pt-3 a.name').text()
                const image = $(this).find('div.row.align-items-center.pl-4.pr-4.pb-3.pt-3 div.col-auto a.avatar.avatar-sm img.avatar-img.rounded-circle').attr('src')
                // console.log(address.trim())
                // console.log(name.trim())
                // console.log(image.trim())

                var created_at = new Date();
                const cinema = await Cinema.create({
                    name: name.trim(),
                    address: address.trim(),
                    image: image.trim(),
                    created_at: created_at
                });
                var types = ['2d', '3d', '4dx']
                for (var i = 0; i < randomIntFromInterval(5, 7); i++) {
                    created_at = new Date();
                    var type = types[randomIntFromInterval(0, 2)];

                    await Theater.create({
                        name: cinema.name + ' - 0' + i.toString(),
                        cinema_id: cinema.id,
                        type: type,
                        number_row: 15,
                        number_column: 15,
                        created_at: created_at
                    });
                }

            });
        }
    });

    return res.json({
        status: 200,
        message: 'OK',
    });
});


router.post('/generate-showtime', jsonParser, async (req, res, next) => {


    var cinemas = await Cinema.findAll(
        {
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: Theater,
                as: 'theaters',
                required: false
            }]
        },
    );

    var movies = await Movie.findAll();

    var checkMovies = new Array(movies.length).fill(0)
    var max = cinemas.length * 2;


    var prices = [90000, 100000, 110000, 120000];
    var now = new Date()
    now = moment(now).format('MM/DD/YYYY')
    now = moment(now).add(6, 'hours').format('MM/DD/YYYY hh:mm:ss');
    var start_time = now;
    var end_time = moment(start_time).add(1, 'hours').format('MM/DD/YYYY hh:mm:ss');
    for (var i = 0; i < cinemas.length; i++) {
        for (var j = 0; j < cinemas[i].theaters.length; j++) {
            for (var k = 0; k < 18; k++) {
                start_time = moment(start_time).add(65, 'minutes').format('MM/DD/YYYY hh:mm:ss');
                end_time = moment(start_time).add(1, 'hours').format('MM/DD/YYYY hh:mm:ss');
                while (true) {
                    var num = randomIntFromInterval(0, checkMovies.length - 1);
                    if (checkMovies[num] < max) {
                        checkMovies[num]++;
                        const showtime = await Showtime.create({
                            movie_id: movies[num].id,
                            theater_id: cinemas[i].theaters[j].id,
                            start_time: start_time,
                            end_time: end_time,
                            price: prices[randomIntFromInterval(0, 3)],
                        });
                        break;
                    }
                }
            }
        }
    }

    return res.json({
        status: 200,
        message: 'OK',
    });
});

function randomIntFromInterval(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;
