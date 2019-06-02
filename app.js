require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT;

const app = express();
const dbUri = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PW}@ds021884.mlab.com:21884/money_ball_db`;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		console.error('Bad JSON');
	}
});

mongoose.connect(dbUri, {
	useNewUrlParser: true
}).then(
	value => console.log('Connection successful'),
	value => console.log('Connection unsuccessful')
);

var billSchema = new mongoose.Schema({
	companyName: String,
	billNickName: String,
	amountDue:Number,
	dueDate: Number,
	interestRate: Number,
});

const userSchema = new mongoose.Schema({
	user_ID: {type: String, required: true},
	user_name: {type: String, required: true},
	email: {type: String, required: true},
	bills: [billSchema]
});

const Users = mongoose.model('Users', userSchema);

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.post('/newUser', (req, res) => {
	console.log(req.body)
	Users.create(req.body, (result) => res.send({received: result}))
});

app.listen(port, () => console.log(`Listening on port: ${port}`));


