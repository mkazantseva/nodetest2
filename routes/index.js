module.exports = function (express, app, mongoose) {
    var users = require('./users')(express, mongoose);
    var posts = require('./posts')(express, mongoose);
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });

    app.use('/', router);
    app.use('/users', users);
    app.use('/posts', posts);
};