const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require('passport');
//load models
let QuestionPaper = require("../models/question");

//auth middleware
router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .get(getHandler)
    .post(postHandler);

router.route('/:questionPaperId')
    .get(getQuestionPaperHandler)
    .delete(deleteQuestionPaperHandler)


router.get('/profile',  (req, res, next) => {
    res.json({ user: req.user });
});

async function getHandler(req, res) {
    try {
        let questionPapers = await QuestionPaper.find({});
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
        await QuestionPaper.create(req.body);
        return res.status(200).json({ success: true });
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
        let questionPaper = await QuestionPaper.findById(req.params.questionPaperId);
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
