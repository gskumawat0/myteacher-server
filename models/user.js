const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileType: {
        type: String,
        required: true
    },
    submittedAnswers: [{
        answerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Response"
        },
        questionPaperId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionPaper"
        },
        submittedOn: {type: Date}
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
