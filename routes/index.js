var users = require('./users');
var posts = require('./posts');

module.exports = function (express) {
    var router = express.Router();
    var app = express();

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });

    app.use('/', router);
    app.use('/users', users);
    app.use('/posts', posts);
    return app;
};