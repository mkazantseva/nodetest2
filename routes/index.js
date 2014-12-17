module.exports = function (router, app, models) {
    require('./users')(router, models);
    require('./posts')(router, models);

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });

    app.use('/', router);
};