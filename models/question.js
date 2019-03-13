const mongoose = require("mongoose");

let questionSchema = new mongoose.Schema({
    standard: String,
    subject: String,
    totalMarks: Number,
    totalQuestions: Number,
    questions: [{
        question: String,
<<<<<<< HEAD
        questionType: String,
=======
        answerType: String,
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
        options: [String],
        answers: [String]
    }]
})


<<<<<<< HEAD
module.exports = mongoose.model("Question", questionSchema);
=======
module.exports = mongoose.model("QuestionPaper", questionSchema);
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
