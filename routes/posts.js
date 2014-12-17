module.exports = function (router, models) {
    var Entry = models.Post;

    router.route('/posts/addpost')
        .post(function (req, res) {
            var entry = new Entry();

            fillEntryFromRequest(entry, req);

            entry.save(function (err) {
                res.send((err === null) ? {msg: ''} : {msg: err});
            });

        });

    router.route('/posts/postlist')
        .get(function (req, res) {
            Entry.find().populate('author').exec(function (err, entries) {
                res.json(entries);
            });

        });

    router.route('/posts/:entry_id')
        .get(function (req, res) {
            Entry.findById(req.params.entry_id, function (err, entry) {
                res.send((err === null) ? {msg: ''} : {msg: err});
            });
        })
        .put(function (req, res) {
            Entry.findById(req.params.entry_id, function (err, entry) {
                res.send((err === null) ? {msg: ''} : {msg: err});

                fillEntryFromRequest(entry, req);

                entry.save(function (err) {
                    res.send((err === null) ? {msg: ''} : {msg: err});
                });
            });
        })
        .delete(function (req, res) {
            Entry.remove({
                _id: req.params.entry_id
            }, function (err, entry) {
                res.send((err === null) ? {msg: ''} : {msg: err});
            });
        });
}

function fillEntryFromRequest(entry, req) {
    entry.title = req.body.title;
    entry.text = req.body.text;
    entry.author = req.body.author;
    entry.comments = req.body.comments;
}
