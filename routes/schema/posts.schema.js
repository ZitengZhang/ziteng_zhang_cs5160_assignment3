
const mongoose = require('mongoose');
PostsSchema = new mongoose.Schema({

    postId: String,
    title:{
        type:String,
        required: true
    },
    context: String,
    link: {
        type: String
    },
    time:{
        type:Date,
        default:Date.now,
    },
    username: String,
    comments: [{ context: String, username:String, date: Date }],
}, { collection: 'posts' })

exports.PostsSchema = PostsSchema;