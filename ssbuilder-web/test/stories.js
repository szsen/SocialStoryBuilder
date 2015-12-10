var assert = require("assert");
var request = require('supertest');
var expect = require('expect.js');


var app = require('../app');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('/socialStories');
var cheerio = require('cheerio');

describe('Story API', function(){
	var testName = 'Test Story';
	var testId = '';
	it ('POST request should create a test story', function(done){
		request(app)
			.post('/edit-new-story')
			.send({ 
				storyTitle: testName, 
				descrip: 'Test Description'
			})
			.end(function(err, res){
				// Calling the end function will send the request
				expect(res).to.exist;
				expect(res.status).to.equal(302);	
				//expect(res.header['location']).to.equal('/stories');	
				done();
		});
	});
	it ('GET request should return the test story we just created', function(done){
		request(app)
		.get('/api/stories').end(function(err, res){
			// check that response is okay
			expect(res).to.exist;
			testId = res.body._id;
			expect(res.status).to.equal(200);
			expect(res.body.title).to.equal('Test Story');
			expect(res.body.description).to.equal('Test Description');
			//expect(res.body.url).to.equal('http://placehold.it/320x150');
			done();
		});
	});
	it ('GET request should return the view page of the story we just created', function(done){
		request(app)
		.get('/view/'+testId).end(function(err, res){
			// check that response is okay
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			$ = cheerio.load(res.text);
			expect( $('h1').html() ).to.equal('Test Story');
			expect($('.item').length).to.equal(6);
			done();
		});
	});
	it ('GET request should return editor of the story we just created', function(done){
		request(app)
		.get('/edit-story/'+testId).end(function(err, res){
			// check that response is okay
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			$ = cheerio.load(res.text);
			expect($('img').length).to.equal(6);
			done();
		});
	});
	after(function(done) {
		var collection = db.get('stories');
		collection.remove({ title: testName }, function(err, docs){
			console.log('Test objects removed.');
			done();
		});
	});
});

describe('Student API', function(){
	var testStudentName = "Test Student 1";
	var testStory1 = "Test Story 1";
	var testStory2 = "Test Story 2";
	before(function(done) {
		var test_stories = [
		    { title: testStory1, description : "Description.", url : "http://placehold.it/320x150"},
		    { title: testStory2, description : "Description.", url : "http://placehold.it/320x150"}
		];
		var collection = db.get('stories');
		collection.insert(test_stories, function(err, docs){
			var student = { name: testStudentName, stories: [ docs[0]._id, docs[1]._id ] };
			collection = db.get('students');
			collection.insert(student, function(err, docs){
				console.log('Test objects inserted.');
				done();
			});
		});
	});
	it ('GET request to get the list of students', function(done){
		request(app)
		.get('/api/students').end(function(err, res){
			// check that response is okay
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.body[res.body.length - 1].name).to.equal(testStudentName);
			done();
		});
	});
	it ('GET request to get list of stories for our test student', function(done){
		request(app)
		.get('/api/student-story/'+testStudentName).end(function(err, res){
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.body[0].title).to.equal(testStory1);
			expect(res.body[1].title).to.equal(testStory2);
			done();
		});
	});
	after(function(done) {
		var collection = db.get('students');
		collection.remove({ name: testStudentName }, function(err, docs){
			collection = db.get('stories');
			collection.remove({ title : { $in : [ testStory1, testStory2] } }, function(err, docs){
				console.log('Test objects removed.');
				done();
			});
		});
	});
});