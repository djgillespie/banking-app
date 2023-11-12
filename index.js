var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then(user => {
        res.send(user);
    })
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// all accounts
app.get('/account/all', function (req, res) {
    dal.all().then(docs => {
        console.log(docs);
        res.send(docs);
    });
});

// update deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    let amount = Number(req.params.amount);
    dal.update(req.params.email, amount)
    .then((response) => {
        res.send(response);
    });
})

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);