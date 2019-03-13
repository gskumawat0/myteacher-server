const mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
    standard: String,
    subject: String,
    totalMarks: Number,
    totalQuestions: Number,
    questions: [{
        question: String,
        answerType: String,
        options: [String],
        answers: [String]
    }]
})


module.exports = mongoose.model("QuestionPaper", questionSchema);
