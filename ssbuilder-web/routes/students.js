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

router.post('/add-student', function(req, res) {
	var studentName = req.body.studentName;
	console.log(req);
	var collection = db.get('students');
	// Submit to the DB
	collection.insert({ "name": studentName, stories: [] }, {}, function (err, doc) {
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

router.post('/edit-student', function(req, res) {
	var oldName = req.body.oldName;
	var studentName = req.body.studentName;
	console.log(req);
	var collection = db.get('students');
	// Submit to the DB
	collection.update({ "name": oldName }, { $set: {"name" : studentName}}, function (err, doc) {
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

router.get('/delete-student/:name', function(req, res) {
	var studentName = req.params.name;
	console.log(req);
	var collection = db.get('students');
	// Submit to the DB
	collection.remove({ "name": studentName }, {}, function (err, doc) {
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

module.exports = router;