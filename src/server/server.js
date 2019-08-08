// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://testuser:testuser0@ds027729.mlab.com:27729/iouexpress'); // mlab free db
var Bear       = require('./bear');
var User       = require('./user');
var Loan       = require('./loan');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// --- bear routes start
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// more routes for our API will happen here
// on routes that end in /users
// ----------------------------------------------------

router.route('/bears')
    .post(function(req, res) {
        console.log('post request.');
        var bear = new Bear();      // create a new instance of the User model
        bear.name = req.body.name;  
        console.log('bear save1');
        bear.save(function(err) {
            console.log('bear save2');
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ message: 'Bear created!' });
        });
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

router.route('/users')
    .post(function(req, res) {
        console.log('post users request.');
        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the users name (comes from the request)
        // save the user and check for errors
        console.log('user save1');
        user.save(function(err) {
            console.log('user save2');
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ message: 'User created!' });
        });
    })
    .get(function(req, res) {
        console.log('get users request.');
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

    
router.route('/loans')
    .post(function(req, res) {
        var obj = new Loan();      // create a new instance of the User model
        obj.name = req.body.name;  
        obj.save(function(err) {
            console.log('Loan save2');
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Loan created!' });
        });
    })
    .get(function(req, res) {
        console.log('get loans request.');
        Loan.find(function(err, loans) {
            if (err)
                res.send(err);
            res.json(loans);
        });
    });

router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    })
    .put(function(req, res) {
        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;  // update the users info
            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!' });
            });
        });
    });
 
// --- user routes end

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);