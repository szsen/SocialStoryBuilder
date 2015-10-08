var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var secrets = require('../config/secrets');
//var db = monk('/socialStories');
var db = monk(secrets.db);

/* GET student list. */
router.get('/api/students', function(req, res) {

	//res.send('respond with a resource');
	var collection = db.get('students');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

/* GET story list of a student */
router.get('/api/student-story/:name', function(req, res) {
	var studentName = req.params.name;
	var collection = db.get('students');
	collection.find({name:studentName},{},function(err,docs){
		collection = db.get('stories');
		collection.find({ _id: { $in: docs[0].stories } },{},function(e,d){
			res.json(d);
		});
	});
});

module.exports = router;