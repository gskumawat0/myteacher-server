const mongoose = require("mongoose");

let responseSchema = new mongoose.Schema({
    studentName: String,
    section: String,
    enrollmentNo: String,
    contact: Number,
    answers: [{}]
})

module.exports = mongoose.model("Response", responseSchema);
