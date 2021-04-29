const mongoose = require('mongoose');

const CommentsSchema = require('./comments.schema').CommentsSchema;

const CommentsModel = mongoose.model('comments', CommentsSchema);

function addComment(comment) {
    return CommentsModel.create(comment);
}

function findComments(postId) {
    return CommentsModel.find({postId: postId}).exec();
}

function findCommentByUsername(username){
    return CommentsModel.find({username: username}).exec();
}

function findCommentById(commentId){
    return CommentsModel.find({commentId: commentId}).exec();
}

function deleteAllPostComment(postId) {
    return CommentsModel.deleteMany({postId: postId});
}

function deleteComment(commentId) {
    return CommentsModel.deleteOne({commentId: commentId});
}

function updateComment(commentId,post){
    return CommentsModel.findOneAndUpdate({commentId: commentId},post).exec();
}


exports.addComment = addComment;
exports.findComments = findComments;
exports.findCommentByUsername = findCommentByUsername;
exports.deleteAllPostComment = deleteAllPostComment;
exports.deleteComment = deleteComment;
exports.findCommentById = findCommentById;
exports.updateComment = updateComment;