var express = require('express');
var router = express.Router();
var User = require('../models/user');

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

router.post('/adduser', function (req, res) {
    var user = new User();

    fillUserFromRequest(user, req);

    user.save(function (err) {
        res.send((err === null) ? {msg: ''} : {msg: err});
    });
});

router.delete('/deleteuser/:id', function (req, res) {
    User.remove({
        _id: req.params.id
    }, function (err, bear) {
        res.send((err === null) ? {msg: ''} : {msg: err});
    });
});

router.put('/updateuser/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);

        fillUserFromRequest(user, req);

        user.save(function (err) {
            res.send((err === null) ? {msg: ''} : {msg: err});
        });
    });
});

function fillUserFromRequest(user, req) {
    user.username = req.body.username;
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.age = (!isNaN(req.body.age) ? req.body.age : undefined);
    user.gender = req.body.gender;
    user.location = req.body.location;
}

module.exports = router;
