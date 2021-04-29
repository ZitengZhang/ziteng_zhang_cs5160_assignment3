const mongoose = require('mongoose');

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model('User', UserSchema);

function addUser(person) {
    return UserModel.create(person);
}

function findUser(username) {
    return UserModel.findOne({username: username}).exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}

exports.addUser = addUser;
exports.findUser = findUser;
exports.getAllUsers = getAllUsers;
