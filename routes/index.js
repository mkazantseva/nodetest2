module.exports = function (express, app, mongoose, models) {
    var router = express.Router();
    require('./users')(router, mongoose, models);
    require('./posts')(router, mongoose, models);

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });

    app.use('/', router);
};