var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    name : String,
    password: String,
    friend_list: Array
    
});

module.exports = mongoose.model('user', userSchema);