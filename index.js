var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());//use body-parser
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/search', function (req, res) {
    console.log(res.body.img1);
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});