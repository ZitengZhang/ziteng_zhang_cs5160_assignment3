const mongoose = require('mongoose');

exports.UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    post:[],
    
}, { collection: 'users' });