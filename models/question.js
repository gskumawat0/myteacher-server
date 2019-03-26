const mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
    standard: String,
    subject: String,
    totalMarks: Number,
    totalQuestions: Number,
    assignedTo: [String],
    lastDate: Date,
    responsedBy: [String],
    questions: [{
        question: String,
        answerType: String,
        options: [String],
        answers: [String]
    }],
})


module.exports = mongoose.model("QuestionPaper", questionSchema);
