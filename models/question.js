const mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
    standard: String,
    subject: String,
    totalMarks: Number,
    totalQuestions: Number,
    questions: [{
        question: String,
        questionType: String,
        options: [String],
        answer: [String]
    }]
})


module.exports = mongoose.model("Question", questionSchema);
