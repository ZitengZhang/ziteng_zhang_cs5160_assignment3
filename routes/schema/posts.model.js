const mongoose = require('mongoose');

const PostsSchema = require('./posts.schema').PostsSchema;
//const CommentsSchema = require('./comments.schema').CommentsSchema;

const PostsModel = mongoose.model('posts', PostsSchema);
//const CommentsModel = mongoose.model('comments', CommentsSchema);

function addPost(post) {
    return PostsModel.create(post);
}

function findAllPosts() {
    return PostsModel.find().exec();
}

function findPost(postId) {
    return PostsModel.find({postId: postId}).exec();
}

function findPostByUsername(username){
    return PostsModel.find({username: username}).exec();
}

function deletePost(postId){
    // CommentsModel.deleteMany({postId: postId});
    return PostsModel.deleteOne({postId: postId});
}

function updatePost(postId,post){
    return PostsModel.findOneAndUpdate({postId: postId},post).exec();
}


exports.addPost = addPost;
exports.findAllPosts = findAllPosts;
exports.findPost = findPost;
exports.findPostByUsername = findPostByUsername;
exports.deletePost = deletePost;
exports.updatePost =updatePost;