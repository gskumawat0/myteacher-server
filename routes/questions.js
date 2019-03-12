const express = require("express");
const router = express.Router({ mergeParams: true });

//load models
let Question = require("../models/question");

router.route('/')
    .get(getHandler)
    .post(postHandler);

router.route('/:questionPaperId')
    .get(getQuestionSetHandler);


async function getHandler(req, res) {
    try {
        let questionPapers = await Question.find({});
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
        await Question.create(req.body);
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
async function getQuestionSetHandler(req, res) {
    try {
        let questionPaper = await Question.findById(req.params.questionPaperId);
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

module.exports = router;
