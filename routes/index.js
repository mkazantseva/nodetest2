module.exports = function (express, app, mongoose, models) {
    var users = require('./users')(express, mongoose, models);
    var posts = require('./posts')(express, mongoose, models);
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });

    app.use('/', router);
    app.use('/users', users);
    app.use('/posts', posts);
};