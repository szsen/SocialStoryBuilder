var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/index', function(req, res, next) {
	//res.redirect('/stories');
	res.render('index', { title: 'Social Story Builder' });
});

module.exports = router;
