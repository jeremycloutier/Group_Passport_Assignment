var express = require('express');
var path = require('path');
var pg = require('pg');
var router = express.Router();
var passport = require('passport');

var connectionString = 'postgres://localhost:5432/bank_corp_database';

router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/fail', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/fail.html'));
});

router.get('/success', function(request, response){
    console.log('Request user on success route', request.user);
    response.sendFile(path.join(__dirname, '../public/views/success.html'));
});

router.get('/getUser', function(request, response){
    console.log('Huzzah, a user!', request.user);
    console.log('Authorized:', request.isAuthenticated());
    response.send(request.user);
});

router.post('/payLoan/:id/:loanType/:payment', function(request, response){
    console.log("In the route!");
    var results = [];

    pg.connect(connectionString, function(error, client){
        if (error) console.log(error);
        console.log(request.params.id);
        console.log(request.params.loanType);
        console.log(request.params.payment);

        var query = client.query('SELECT $1 FROM user_data WHERE id = $2', [request.params.loanType, request.params.id]);

        //client.query('UPDATE user_data SET ($1) = ($1 - $2) WHERE id=($3)', [request.params.loanType, request.params.payment, request.params.id]);
        //var query = client.query('SELECT * FROM user_data WHERE id=($1)', [request.params.id]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            console.log(response.json(results));
            return response.json(results);
        });
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fail'
}));

module.exports = router;