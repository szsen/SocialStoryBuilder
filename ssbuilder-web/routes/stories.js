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
	var collection = db.get('students');
	collection.find({},{},function(err,docs){
		collection = db.get('stories');
		collection.find({},{sort: {title: 1}},function(e,d){
			console.log(docs);
			res.render('stories', {
				"storylist" : d, 
				"studentlist" : docs
			});
		});
	});
});

/* GET create new story page. */
router.post('/edit-new-story', function(req, res) {
	var panels = [];
	var title = req.body.storyTitle;
	var description = req.body.descrip;
	var studentId = req.body.selectStudent;
	for (var i = 0; i < 6; i++) {
		panels.push({caption: 'Blank caption', url: "http://placehold.it/320x150"});
	}
	var newStory = {
		"title": title,
		"description" : description,
		"panels" : panels
	};
	var collection = db.get('stories');
	collection.insert(newStory, function (err, doc) {
		var collection = db.get('students');
		collection.update({ _id : studentId },{$push : { stories : doc._id}},function(e,docs){		
			if (err) {
				// If it failed, return error
				res.send("There was a problem adding the information to the database.");
			}
			else {
				// And forward to success page
				res.redirect("/edit-story/"+doc._id);
			}
		});
	});
});

/* GET edit story page. */
router.get('/edit-story/:storyId', function(req, res) {
	var storyId = req.params.storyId;
	var collection = db.get('stories');
	collection.find({ _id : storyId },{},function(e,docs){
		var panels = docs[0].panels;
		if (docs[0].panels.length < 6) {
			for (var i = docs[0].panels.length; i < 6; i++) {
				panels.push({caption: 'Blank caption', url: "http://placehold.it/320x150"});
			}
		}
		docs[0].panels = panels;
		res.render('edit-story', {
			"story" : docs[0]
		});
	});
});

/* GET New story page. */
router.get('/edit-panel/:storyId/:ind', function(req, res) {
	var storyId = req.params.storyId;
	var index = req.params.ind;
	var collection = db.get('stories');
	console.log(storyId);
	collection.find({ _id : storyId },{},function(e,docs){
		var panel;
		if (docs[0].panels[index] === undefined) {
			panel = {caption: 'Blank caption', url: "http://placehold.it/320x150"};
		} else {
			panel = docs[0].panels[index];
		}
		panel._id = storyId;
		panel.ind = index;
		res.render('edit-panel', {
			"panel" : JSON.stringify(panel)
		});
	});
});

/* Delete story */
router.get('/delete-story/:storyId', function(req, res) {
	var storyId = req.params.storyId;
	// Set our collection
	var collection = db.get('stories');
	// Submit to the DB
	collection.remove({_id : storyId}, function (err, doc) {
		res.redirect('/stories');
	});
});

/* POST to update story */
router.post('/update-story/:storyId', function(req, res) {
	var storyId = req.params.storyId;
	// Get our form values from name attributes
	var title = req.body.storyTitle;
	var description = req.body.descrip;
	// Set our collection
	var collection = db.get('stories');
	// Submit to the DB
	collection.update({ _id : storyId }, { $set : {
		"title" : title,
		"description" : description,
	} }, function (err, doc) {
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

/* POST to update panel */
router.post('/update-panel/:storyId/:ind', function(req, res) {
	var storyId = req.params.storyId;
	var index = req.params.ind;

	// Get our form values from name attributes
	var url = req.body.url;
	var caption = req.body.descrip;
	// Set our collection
	var collection = db.get('stories');
	// Submit to the DB 

	var panel = { "url" : url, "caption" : caption };
	collection.find({ _id : storyId },{},function(err,docs){
		var panels = docs[0].panels;
		panels[index] = panel;
		console.log(panels);
		collection.update({ _id : storyId }, { $set : {
			"panels" : panels
		} }, function(e, d) {
			if (err) {
				// If it failed, return error
				res.send("There was a problem adding the information to the database.");
			}
			else {
				// And forward to success page
				res.redirect(302, "/edit-story/"+storyId);
			}
		});
	});
});

/* GET story list. */
router.get('/api/stories', function(req, res) {

	//res.send('respond with a resource');
	var collection = db.get('stories');
	collection.find({},{},function(e,docs){
		console.log(docs);
		res.json(docs[docs.length - 1]);
	});
});

module.exports = router;
