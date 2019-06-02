require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;

const app = express();
const dbUri = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PW}@ds021884.mlab.com:21884/money_ball_db`;

mongoose.connect(dbUri, {
	useNewUrlParser: true
}).then(
	value => console.log('Connection successful'),
	value => console.log('Connection unsuccessful')
);

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.listen(port, () => console.log(`Listening on port: ${port}`));


