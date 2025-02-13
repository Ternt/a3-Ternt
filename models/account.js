const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = Schema({
    username: String,
    firstname: String,
    lastname: String,
    dateofbirth: String,
    password: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('account', Account);
