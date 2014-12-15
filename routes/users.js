var express = require('express');
var router = express.Router();
var User = require('../models/user');

/*
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});

router.get('/users/:user_id', function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        res.json(user);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function (req, res) {

    var user = new User(); 		// create a new instance of the model
    user.username = req.body.username;
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.age = (!isNaN(parseInt(req.body.age)) ? req.body.age : undefined);
    user.gender = req.body.gender;
    user.location = req.body.location;

    // save the user and check for errors
    user.save(function (err) {
        res.send((err === null) ? {msg: ''} : {msg: err});
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
    User.remove({
        _id: req.params.id
    }, function (err, bear) {
        res.send((err === null) ? {msg: ''} : {msg: err});
    });
});

/*
 * UPDATE to updateuser.
 */
router.put('/updateuser/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {

        if (err)
            res.send(err);

        user.username = req.body.username;
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.age = (!isNaN(req.body.age) ? req.body.age : undefined);
        user.gender = req.body.gender;
        user.location = req.body.location;

        user.save(function (err) {
            res.send((err === null) ? {msg: ''} : {msg: err});
        });
    });
});

module.exports = router;
