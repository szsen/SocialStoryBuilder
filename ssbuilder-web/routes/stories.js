var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var secrets = require('../config/secrets');
//var db = monk('/socialStories');
var db = monk(secrets.db);

/* GET story list page. */
router.get('/', function(req, res) {
	res.redirect('/stories');
});

/* GET story list page. */
router.get('/stories', function(req, res) {
	//res.send('respond with a resource');
	var collection = db.get('students');
	collection.find({},{},function(err,docs){
		collection = db.get('stories');
		collection.find({},{sort: {title: 1}},function(e,d){
			//console.log(d);
			res.render('stories', {
				"storylist" : d, 
				"studentlist" : docs
			});
		});
	});
});

/* GET student page */
router.get('/stories/:studentId', function(req, res) {
	var studentId = req.params.studentId;
	var collection = db.get('students');
	collection.find({},{},function(ee,dd){
		collection.find({_id:studentId},{},function(err,docs){
			collection = db.get('stories');
			collection.find({ _id: { $in: docs[0].stories } },{},function(e,d){
				res.render('stories', {
				"storylist" : d, 
				"studentlist" : dd,
				"currentStudent" : docs[0].name
				});
			});
		});
	});
});

/* GET story list page. */
router.get('/community', function(req, res) {
	//res.send('respond with a resource');
	var collection = db.get('community');
	collection.find({},{},function(err,docs){
		res.render('community', {
			"storylist" : docs
		});
	});
});

/* POST edit story page. */
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

/* POST add timing stats */
router.post('/api/add-new-stats', function(req, res) {
	//potentially req.params.stats
	//or console.log
	console.log(req.body); //or stats or name
	console.log("blah");
	var student = req.body.student;
	var story = req.body.story;
	var panel1Time = req.body.panel1Time;
	var panel2Time = req.body.panel2Time;
	var panel3Time = req.body.panel3Time;
	var panel4Time = req.body.panel4Time;
	var panel5Time = req.body.panel5Time;
	var panel6Time = req.body.panel6Time;
	var totalTime = req.body.totalTime;

	var collection = db.get('timeStatistics');
	// Submit to the DB
	collection.insert({ "studentName": student, "story": story, "panel1Time": panel1Time, "panel2Time":panel2Time, "panel3Time": panel3Time, "panel4Time":panel4Time, "panel5Time": panel5Time, "panel6Time": panel6Time, "totalTime": totalTime}, {}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to success page
			//res.redirect(302, "/stories");
		}
	});
});

/* Get add timing stats */
router.get('/stats/:storyId', function(req, res) {
	var storyId = req.params.storyId;
	var collection = db.get('stories');
	// Submit to the DB
	collection.find({ _id:storyId}, {}, function (err, doc) {
		var name = doc[0].title;
		collection = db.get('timeStatistics');
		collection.find({ story:name}, {}, function (e1, d1) {
			var stat = d1[0];
			console.log(stat);
			times = [];
			totTime = 0;
			for (var k in stat) {
				if (k.indexOf('panel') > -1) {
					times.push(stat[k]);
				} else if (k.indexOf('total') > -1) {
					totTime = stat[k];
				}
			}
			stat = { title: name, "times" : times, 'totTime' : totTime };
			res.render('stats', {
				"story" : stat
			});
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

/* GET copy story page. */
router.post('/copy-story/:storyId', function(req, res) {
	var storyId = req.params.storyId;
	var studentId = req.body.studentCopy;

	var collection = db.get('stories');
	collection.find({ _id : storyId },{},function(e,docs){
		var copy = docs[0];
		delete copy._id;
		collection.insert(copy, function(err, d) {
			collection = db.get('students');
			collection.update({ _id : studentId },{$push : { stories : d._id}},function(e,docs){	
				res.redirect('/stories');
			});
		});
	});
});

/* POST upload story page. */
router.post('/upload-story/:storyId', function(req, res) {
	var storyId = req.params.storyId;

	var collection = db.get('stories');
	collection.find({ _id : storyId },{},function(e,docs){
		var copy = docs[0];
		delete copy._id;
		collection = db.get('community');
		collection.insert(copy, function(err, d) {
			res.redirect('/community');
		});
	});
});

router.post('/download-story', function(req, res) {
	var studentId = req.body.studentCopy;
	var storyId = req.body.storyToDownload;

	var collection = db.get('community');
	collection.find({ _id : storyId },{},function(e,docs){
		var copy = docs[0];
		delete copy._id;
		collection = db.get('stories');
		collection.insert(copy, function(err, d) {
			collection = db.get('students');
			collection.update({ _id : studentId },{$push : { stories : d._id}},function(error,doc){	
				res.redirect('/stories');
			});
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
		console.log(panel);
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
		res.json(docs[docs.length - 1]);
	});
});

module.exports = router;
