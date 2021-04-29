const express = require('express')
const router = express.Router();
const UserModel = require('./schema/user.model')
const jwt = require('jsonwebtoken');
const cookie_middleware = require('./middleware/cookie_middleware');


router.post('/register', function(req, res) {
    const username = req.body.username;
    const password = String(req.body.password);
    const email = req.body.email;
    if (!username || !password || !email) {
        res.sendStatus(400);
    }


    const user = {
        username: username,
        password: password, 
        email: email,
    }

    return UserModel.addUser(user)
        .then((response) => {
            const token = jwt.sign(response.username, 'salty_salt')


            res.cookie('webdevtoken', token).status(200).send(response);
        }, (error) => {

            res.status(401).send(error)
        });
})


router.post('/login', function(req, res) {
    const username = req.body.username;
    const password = String(req.body.password);

    if (!username || !password) {
        res.sendStatus(400);
    }

    return UserModel.findUser(username)
        .then((response) => {
            console.log(response);
            console.log(password);

            if (!response) {
                return res.status(402).send("Can not find username" + username);
            }
            if (response.password !== password) {
                return res.status(402).send("Password does not match");
            }

            const token = jwt.sign(response.username, 'salty_salt')


            res.cookie('webdevtoken', token).status(200).send(response);
        }, (error) => {

            res.status(401).send(error)
        });
})

router.get('/loggedIn', cookie_middleware, function(req, res){
    if (req.username) {
        console.log(req.username)
        res.status(200).send(req.username);
    } else {
        res.send(false);
    }
})


// router.get('./test',function(req,res){
//     const wdt = req.cookies.webdevtoken
//     jwt.verify(wdt,'salty_salt',function(error,decode_token){
//         if(error){
//             return res.status(499).send("Invalid token")

//         }
//         res.status(200),send(decode_token)
//     })
// })

router.post('/logOut', (req, res) => {
    res.clearCookie('webdevtoken');
    res.sendStatus(200);
})

router.get('/all', function(req, res) {
    return UserModel.getAllUsers().then(response => res.send(response))
})


module.exports = router;