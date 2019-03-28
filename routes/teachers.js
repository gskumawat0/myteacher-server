const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require('passport');
//load models
let QuestionPaper = require("../models/question");
let Response = require("../models/response");
let User = require("../models/user");

//auth middleware
router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .get(getHandler)
    .post(postHandler);

router.route('/:questionPaperId')
    .get(getQuestionPaperHandler)
    .delete(deleteQuestionPaperHandler)

router.route('/:questionPaperId/scores')
    .get(getQuestionPaperScoreHandler)

async function getHandler(req, res) {
    try {
        let questionPapers = await QuestionPaper.find({'createdBy.id': req.user._id}, {'questions.answers': 0});
        return res.json({
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
        if(req.user.profileType !== 'teacher') throw Error('you are unauthorized to submit a question paper.');
        req.body.assignedTo = req.body.assignedTo.trim().split(',').map(email=>email.trim());
        req.body.createdBy = {
            id: req.user._id,
            email: req.user.email
        }
        await QuestionPaper.create(req.body);
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
}

//fetch a single question set
async function getQuestionPaperHandler(req, res) {
    try {
        let questionPaper = await QuestionPaper.findById(req.params.questionPaperId, {'questions.answers': 0});
        questionPaper.questions.sort((a,b)=>0.5 - Math.random());
        return res.status(200).json({
            success: true,
            questionPaper
        })
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
}

async function deleteQuestionPaperHandler(req, res) {
    try {
        await QuestionPaper.findOneAndDelete({ _id: req.params.questionPaperId });
        Response.deleteMany({questionPaperId: req.params.questionPaperId});
        User.updateMany({'submittedAnswers.questionPaperId': req.params.questionPaperId},{$pull:{'submittedAnswers.questionPaperId': req.params.questionPaperId}});
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
}

async function getQuestionPaperScoreHandler(req, res){
    try{
        let studentScoresPromise = Response.find({questionPaperId: req.params.questionPaperId}, { submittedBy: 1});
        let questionPaperPromise = QuestionPaper.findById(req.params.questionPaperId, {questions: 0, lastDate: 0, assignedTo: 0});
        let [studentScores, questionPaper] = await Promise.all([studentScoresPromise, questionPaperPromise]);
        res.json({
            success: true,
            studentScores,
            questionPaper
        });
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = router;
