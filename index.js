const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const corsOptions = {
    "origin": '*',
    "methods": "GET,PUT,POST,DELETE",
    "preflightContinue": false,
    "Access-Control-Allow-Origin": '*'
}
app.use(cors());
app.options('*', cors());


// Connect To Database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true, })
    .then(() => console.log(`Connected to database`))
    .catch((err) => console.log(`Database error: ${err.message}`));

process.env.NODE_ENV === 'development'&& mongoose.set('debug', true);

//load routes
const userRoutes = require('./routes/auth');
const teacherRoutes = require("./routes/teachers");
const responseRoutes = require("./routes/students");


//load models
const User = require('./models/user');


//  Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ email: jwt_payload.data.email },{password: 0}, function(err, user) {
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
    res.json({ message: 'send a request to /api/questionpapers to get all questionpapers.' });
});

app.use('/api/auth', userRoutes);
app.use('/api/questionpapers', teacherRoutes);
app.use('/api/responses', responseRoutes);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
