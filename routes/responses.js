const express = require("express");
const router = express.Router();
const passport = require("passport")

//load modules
const Response = require("../models/response");

//auth middleware
router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .get(getResponseHandler)
    .post(postResponseHandler)

async function getResponseHandler(req, res) {
    try {
        let responses = await Response.find({});
        res.json({
            success: true,
            responses
        })
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}

async function postResponseHandler(req, res) {
    try {
        console.log(req.body);
        let response = await Response.create(req.body);
        console.log(response);
        return res.json({
            success: true,
            response
        })
    }
    catch (err) {
        return res.json({
            body: req.body,
            success: false,
            message: err.message
        })
    }

}


module.exports = router;
