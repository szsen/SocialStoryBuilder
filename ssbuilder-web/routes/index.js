var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var secrets = require('../config/secrets');
//var db = monk('/socialStories');
var db = monk(secrets.db);


/* GET home page. */
router.get('/index', function(req, res, next) {
	//res.redirect('/stories');
	res.render('index', { title: 'Social Story Builder' });
});

/* GET Userlist page. */
router.get('/login', function(req, res) {
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('login', {
            "login" : docs
        });
    });
});


/* POST to Add User Service */
router.post('/checkuser', function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPassword = req.body.password;

    // Set our collection
    var collection = db.get('usercollection');

    collection.find({username: userName},{},function(e,docs){
    	console.log(docs);
    	if (docs.length > 0) {
    		console.log('old user');
    		res.redirect("/stories");
    	} else {
	    // Submit to the DB
	    	console.log('new user');
		    collection.insert({
		        "username" : userName,
		        "password" : userPassword
		    }, function (err, doc) {
		        if (err) {
		            // If it failed, return error
		            res.send("There was a problem adding the information to the database.");
		        }
		        else {
		            // And forward to success page
		            res.redirect("/stories");
		        }
		    });
    	}
	});
});



module.exports = router;
