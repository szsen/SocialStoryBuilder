var assert = require("assert");
var request = require('supertest');
var expect = require('expect.js');


var app = require('../app');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('/socialStories');

describe('Story API', function(){
	var testName = 'Test Story';
	it ('POST request should create a test story', function(done){
		request(app)
			.post('/api/add-story')
			.send({ 
				storyTitle: testName, 
				descrip: 'Test Description', 
				url: 'http://placehold.it/320x150' 
			})
			.end(function(err, res){
				// Calling the end function will send the request
				expect(res).to.exist;
				expect(res.status).to.equal(302);	
				expect(res.header['location']).to.equal('/stories');	
				done();
		});
	});
	it ('GET request should return the test story we just created', function(done){
		request(app)
		.get('/api/stories').end(function(err, res){
			// check that response is okay
			expect(res).to.exist;
			expect(res.status).to.equal(200);
			expect(res.body.title).to.equal('Test Story');
			expect(res.body.description).to.equal('Test Description');
			expect(res.body.url).to.equal('http://placehold.it/320x150');
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