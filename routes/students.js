const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require('passport');

//load models
let QuestionPaper = require("../models/question");
let Response = require("../models/response");

//auth middleware
router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .get(getHandler)
    .post(postHandler);

async function getHandler(req, res) {
    try {
        let questionPapers = await QuestionPaper.find({lastDate: {$gt: Date.now()},assignedTo: {$in: [req.user.email, '']} });
        return res.status(200).json({
            success: true,
            questionPapers
        })
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}


//post handler for adding questions
async function postHandler(req, res) {
    try {
        let responses = await Response.create(req.body);
        responses.submittedBy = {
            id : req.user._id,
            email : req.user.email
        };
        responses.save();
        req.user.submittedAnswers.push({
            answerId: responses._id,
            submittedOn: Date.now()
        })
        req.user.save();
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = router;
