const express = require("express");
const router = express.Router({ mergeParams: true });

//load models
let Question = require("../models/question");

router.route('/')
    .get(getHandler)
    .post(postHandler);

router.route('/:questionSetId')
    .get(getQuestionSetHandler);


async function getHandler(req, res) {
    try {
        let questionSets = await Question.find({});
        return res.status(200).json({
            success: true,
            questionSets
        })
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        })
    }
}


//post handler for adding questions
async function postHandler(req, res) {
    try {
        let questionSet = await Question.create(req.body)
        return res.status(200).json({ success: true, questionSet });
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }
}

//fetch a single question set
async function getQuestionSetHandler(req, res) {
    try {
        let questionSet = await Question.findById(req.params.questionSetId);
        return res.status(200).json({
            success: true,
            questionSet
        })
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = router;
