module.exports = function(mongoose) {
    return {
        User: require('./user')(mongoose),
        Post: require('./post')(mongoose)
    };
};