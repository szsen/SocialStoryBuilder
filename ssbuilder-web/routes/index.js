var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/index', function(req, res, next) {
	//res.redirect('/stories');
	res.render('index', { title: 'Social Story Builder' });
});

/* GET Userlist page. */
router.get('/login', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('login', {
            "login" : docs
        });
    });
});

router.get('/stories', function(req, res) {
	res.send('success');
});



/* POST to Add User Service */
router.post('/checkuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPassword = req.body.password;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
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
});



module.exports = router;
