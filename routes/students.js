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
        let questionPapers = await QuestionPaper.find({lastDate: {$gt: Date.now()}, assignedTo: {$in: [req.user.email, '']}, responsedBy: {$nin: [req.user.email]} }, {'questions.answers': 0});
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
        if(req.user.profileType !== 'student') throw Error('you are not allowed to submit it')
        let {responses, questionPaperId} = req.body; 
        let questionPaper = await QuestionPaper.findOneAndUpdate({_id:questionPaperId}, {$push: {responsedBy: req.user.email}}, {new : true} );
        let score = 0;
        let marksPerQuestion = questionPaper.totalMarks/ questionPaper.totalQuestions;
        for(key in responses){
            let question = questionPaper.questions.find((question)=> question._id == key);
            if(question.answers.every(answer=> responses[key].includes(answer))) {
                score += marksPerQuestion;}
        }
        req.body.submittedBy = {
            id : req.user._id,
            email : req.user.email,
            score
        };
        responses = await Response.create(req.body);
        req.user.submittedAnswers.push({
            answerId: responses._id,
            submittedOn: Date.now(),
            questionPaperId
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
