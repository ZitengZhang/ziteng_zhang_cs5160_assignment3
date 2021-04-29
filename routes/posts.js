const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');
const postsModel = require('./schema/posts.model')
const commentsModel = require('./schema/comments.model')
const cookie_middleware = require('./middleware/cookie_middleware');

// router.get('/', cookie_middleware, function(req, res) {
//     const postId = req.postId;
//     console.log(postId);
//     return postsModel.findPost(postId)
//         .then((response) => {
//             res.status(200).send(response)
//         }, (error) => {
//             res.status(500)
//         })
    

// })



router.get('/all', function(req, res) {
    //const username = req.username;
    //console.log(username);
    return postsModel.findAllPosts()
        .then((postsResponse) => {
            res.status(200).send(postsResponse)
        }, (error) => {
            res.status(500)
        })
    

})


router.get('/:postId/allComments', function(req, res) {
    const postId = req.params.postId;
    console.log("all comment test")
    console.log(postId);
    return commentsModel.findComments(postId)
        .then((postsResponse) => {
            res.status(200).send(postsResponse)
        }, (error) => {
            res.status(500)
        })
    

})


router.get('/:postId', function(req, res) {
    const postId = req.params.postId;
    console.log(postId);
    return postsModel.findPost(postId)
        .then((response) => {
            res.status(200).send(response)
        }, (error) => {
            res.status(500)
        })
    

})


router.get('/findPost/:username', function(req, res) {
    const username = req.params.username;
    console.log("find post by user");
    console.log(username);
    return postsModel.findPostByUsername(username)
        .then((response) => {
            res.status(200).send(response)
        }, (error) => {
            res.status(500)
        })
    

})


router.get('/findComment/:username', function(req, res) {
    const username = req.params.username;
    console.log("find comment by user");
    console.log(username);
    return commentsModel.findCommentByUsername(username)
        .then((response) => {
            res.status(200).send(response)
        }, (error) => {
            res.status(500)
        })
    

})


router.get('/findCommentById/:commentId', function(req, res) {
    const commentId = req.params.commentId;
    console.log("find comment by id");
    console.log(commentId);
    return commentsModel.findCommentById(commentId)
        .then((response) => {
            res.status(200).send(response)
        }, (error) => {
            res.status(500)
        })
    

})


router.post('/', cookie_middleware, function(req, res) {
    const post = req.body;
    const username = req.username;
    
    post.username = username;
    post.postId = uuid();
    console.log(post)
    // if((!post.context && !post.link) || (post.context && post.link)){
    //     res.status(402).send("Choose context or link to fill in.")
    // }
    return postsModel.addPost(post)
        .then((newPostResponse) => {

            console.log(newPostResponse);
            res.status(200).send(newPostResponse)

        }, (error) => {
            res.status(400).send(error)
        })



})

router.post('/:postId/comment', cookie_middleware, function(req, res) {

    const comment = req.body;
    console.log("comment test")
    console.log(comment)
    const postId = req.params.postId;
    console.log(postId);
    const username = req.username;
    
    comment.username = username;
    comment.postId = postId;
    comment.commentId = uuid();
    
    return commentsModel.addComment(comment)
        .then((newCommentResponse) => {

            console.log(newCommentResponse);
            res.status(200).send(newCommentResponse)

        }, (error) => {
            res.status(400).send(error)
        }) 

})


router.delete('/delete/:postId', function(req, res) {

    //const post = req.body;
    console.log("delete test")
    const postId = req.params.postId;
    //post.postId = postId;
    return postsModel.deletePost(postId)
        .then((deleteResponse) => {

            console.log(deleteResponse);
            res.status(200).send(deleteResponse)
        }, (error) => {
            res.status(400).send(error)
        }) 

})


router.delete('/delete/allPostcomment/:postId', function(req, res) {

    //const post = req.body;
    console.log("delete comment test")
    const postId = req.params.postId;
    //post.postId = postId;
    return commentsModel.deleteAllPostComment(postId)
        .then((deleteResponse) => {

            console.log(deleteResponse);
            res.status(200).send(deleteResponse)
        }, (error) => {
            res.status(400).send(error)
        }) 

})

router.delete('/delete/comment/:commentId', function(req, res) {

    //const post = req.body;
    console.log("delete one comment test")
    const commentId = req.params.commentId;
    //post.postId = postId;
    return commentsModel.deleteComment(commentId)
        .then((deleteResponse) => {

            console.log(deleteResponse);
            res.status(200).send(deleteResponse)
        }, (error) => {
            res.status(400).send(error)
        }) 

})


router.put('/update/:postId',cookie_middleware,function(req, res) {

    const post = req.body;
    //const username = req.username;
    const postId = req.params.postId;
    console.log(post)
    console.log("update post test")

    //post.postId = postId;
    return postsModel.updatePost(postId,post)
        .then((response) => {

            console.log(response);
            res.status(200).send(response);
        }, (error) => {
            res.status(400).send(error)
        }) 
})



router.put('/updateComment/:commentId',cookie_middleware,function(req, res) {

    const post = req.body;
    //const username = req.username;
    const commentId = req.params.commentId;
    console.log(post)
    console.log("update comment test")

    //post.postId = postId;
    return commentsModel.updateComment(commentId,post)
        .then((response) => {

            console.log(response);
            res.status(200).send(response);
        }, (error) => {
            res.status(400).send(error)
        }) 
})





module.exports = router;
