const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const cors = require('cors');
=======
// const cors = require('cors');
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
const passport = require('passport');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// CORS Middleware
let allowCrossDomain = function(req, res, next) {
<<<<<<< HEAD
    console.log('req received', 2345678);
=======
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
    next();
}
app.use(allowCrossDomain);

// const corsOptions = {
//     "origin": '*',
//     "methods": "GET,PUT,POST,DELETE",
//     "preflightContinue": true,
//     "Access-Control-Allow-Origin": '*'
// }
// app.use(cors(corsOptions));


// Connect To Database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, })
    .then(() => console.log(`Connected to database`))
    .catch((err) => console.log(`Database error: ${err.message}`));
mongoose.set('debug', true);
//load routes
const userRoutes = require('./routes/auth');
<<<<<<< HEAD
const questionRoutes = require("./routes/questions");
=======
const questionPaperRoutes = require("./routes/questions");
const responseRoutes = require("./routes/responses");
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769

//load models
const User = require('./models/user');



//  Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// const config = require('../config/database');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.data._id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


// Index Route
app.get('/', (req, res) => {
<<<<<<< HEAD
    res.json({ message: 'send a post request to /api/auth/signup' });
});

app.use('/api/auth', userRoutes);
app.use('/api/questionset', questionRoutes);

=======
    res.json({ message: 'send a request to /api/questionpapers to get all questionpapers.' });
});

app.use('/api/auth', userRoutes);
app.use('/api/questionpapers', questionPaperRoutes);
app.use('/api/responses', responseRoutes);
>>>>>>> 9b4313935013a9bdf9a3839438202648ae210769

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
