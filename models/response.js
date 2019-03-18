const mongoose = require("mongoose");

let responseSchema = new mongoose.Schema({
    submittedBy:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        email: String
    },
    questionPaperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper"
    },
    responses: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model("Response", responseSchema);
