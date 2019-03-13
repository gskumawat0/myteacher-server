const express = require("express");
const router = express.Router({ mergeParams: true });

//load models
<<<<<<< HEAD
let Question = require("../models/question");
=======
let QuestionPaper = require("../models/question");
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769

router.route('/')
    .get(getHandler)
    .post(postHandler);

<<<<<<< HEAD
router.route('/:questionSetId')
    .get(getQuestionSetHandler);
=======
router.route('/:questionPaperId')
    .get(getQuestionPaperHandler)
    .delete(deleteQuestionPaperHandler)
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769


async function getHandler(req, res) {
    try {
<<<<<<< HEAD
        let questionSets = await Question.find({});
        return res.status(200).json({
            success: true,
            questionSets
        })
    }
    catch (err) {
        console.log(err);
=======
        let questionPapers = await QuestionPaper.find({});
        return res.status(200).json({
            success: true,
            questionPapers
        })
    }
    catch (err) {
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
        return res.json({
            success: false,
            message: err.message
        })
    }
}


//post handler for adding questions
async function postHandler(req, res) {
    try {
<<<<<<< HEAD
        let questionSet = await Question.create(req.body)
        return res.status(200).json({ success: true, questionSet });
    }
    catch (err) {
        console.log(err);
=======
        await QuestionPaper.create(req.body);
        return res.status(200).json({ success: true });
    }
    catch (err) {
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
        return res.json({
            success: false,
            message: err.message
        });
    }
}

//fetch a single question set
<<<<<<< HEAD
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
=======
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
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
        return res.json({
            success: false,
            message: err.message
        });
    }
}

module.exports = router;
