const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const WordCount = require('./word-count');
const wordCount = WordCount();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res) {
	res.render('index', {
		wordCount: wordCount.wordCount()
	});
});

app.post('/check', function(req, res){
	wordCount.check(req.body.word);
	res.render('index', {
		message : wordCount.message(),
		style: wordCount.style(),
		wordCount: wordCount.wordCount()
	});
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
	console.log(`App started on port ${PORT}`);
});