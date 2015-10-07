var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var secrets = require('../config/secrets');
//var db = monk('/socialStories');
var db = monk(secrets.db);

/* GET story list page. */
router.get('/stories', function(req, res) {

	//res.send('respond with a resource');
	var collection = db.get('stories');
	collection.find({},{},function(e,docs){
		res.render('stories', {
			"storylist" : docs
		});
	});
});

/* GET New story page. */
router.get('/new-story', function(req, res) {
	res.render('new-story', { title: 'Add New Story' });
});

/* POST to Add User Service */
router.post('/api/add-story', function(req, res) {
	
	// Get our form values from name attributes
	var title = req.body.storyTitle;
	var url = req.body.url;
	var description = req.body.descrip;
	// Set our collection
	var collection = db.get('stories');
	// Submit to the DB
	collection.insert({
		"title" : title,
		"description" : description,
		"url" : url
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to success page
			res.redirect(302, "/stories");
		}
	});
});

/* GET story list. */
router.get('/api/stories', function(req, res) {

	//res.send('respond with a resource');
	var collection = db.get('stories');
	collection.find({},{},function(e,docs){
		res.json(docs[docs.length - 1]);
	});
});

module.exports = router;
