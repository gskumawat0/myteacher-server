const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Connect To Database
mongoose.connect(process.env.DATABASE_URL, { useMongoClient: true, useNewUrlParser: true  })
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.log(`Database error: ${err.message}`));

//load routes
const userRoutes = require('./routes/auth');

//load models
const User = require('./models/user');

// CORS Middleware
app.use(cors());

//  Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// const config = require('../config/database');

  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.data._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



app.use('/api/auth', userRoutes);

// Index Route
app.get('/', (req, res) => {
  res.send('send a post request to /api/auth/signup');
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});