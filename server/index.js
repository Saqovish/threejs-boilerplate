const express = require('express');
const path = require('path');
const serverless = require('serverless-http');

const PORT = 2121;

const app = express();

const router = express.Router();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

router.get('/', (req, res) => {
	return res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use(express.json());

if (process.env.NODE_ENV !== 'development') {
	app.use('/.netlify/functions/server', router);
	app.use('/', (req, res) =>
		res.sendFile(path.join(__dirname, '../index.html')),
	);
} else {
	app.use('/', router);
	app.listen(PORT, () => console.log(`Local app listening on port ${PORT}!`));
}

module.exports = app;
module.exports.handler = serverless(app);
