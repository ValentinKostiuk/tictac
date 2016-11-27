let express = require('express');
let app = express();
let url = require('url');

//app.use(express.static('..'));
//app.use('/', express.static('..'));

app.get('/app/*', function (req, res, next) {
	let originalUrl = url.parse(req.originalUrl).path;
	console.log(originalUrl);
	if (originalUrl.slice(-3) === '.js') {
		next();
	} else {
		res.send('random.text');
	}
});

app.use('/resources', express.static('../resources'));
app.use('/app', express.static('../app'));

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});