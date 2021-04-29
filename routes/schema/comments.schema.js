const mongoose = require('mongoose');

CommentsSchema = new mongoose.Schema({

    postId: String,
    commentId: String,
    context: String,
    time:{
        type:Date,
        default:Date.now,
    },
    username: String,
    
}, { collection: 'comments' })

exports.CommentsSchema = CommentsSchema;