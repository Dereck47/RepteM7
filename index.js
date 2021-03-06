const express = require('express');
const mongoose = require('mongoose');
const app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB

mongoose
  .connect(
    'mongodb://mongo:27017/dockernodemongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//--------------------------------

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/', jsonParser, (req, res) => {
	console.log(JSON.stringify(req.body.name));

	const newItem = new Item({
		name: req.body.name,
		password: req.body.password,
		webpage: req.body.webpage
	});
	newItem.save().then(item => res.redirect('/'));

	res.send("Data has been saved.");
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
