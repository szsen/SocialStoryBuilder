var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var secrets = require('../config/secrets');
//var db = monk('/socialStories');
var db = monk(secrets.db);


/* GET View page. */
router.get('/view/:storyId', function(req, res, next) {
	//res.redirect('/stories');
	var storyId = req.params.storyId;
		var collection = db.get('stories');
	collection.find({ _id : storyId },{},function(e,docs){
		res.render('view', { story: docs[0] });
	});
	
});


/* GET View page. */
router.get('/community/view/:storyId', function(req, res, next) {
	//res.redirect('/stories');
	var storyId = req.params.storyId;
		var collection = db.get('community');
	collection.find({ _id : storyId },{},function(e,docs){
		res.render('view', { story: docs[0] });
	});
	
});


/* GET story list. 
TODO get story using id from url */
router.get('/api/stories', function(req, res) {
	//res.send('respond with a resource');
	var collection = db.get('stories');
	collection.find({},{},function(e,docs){
		res.json(docs[docs.length - 1]);
	});
});

module.exports = router;
