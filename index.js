var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rq = require('request-promise');
var querystring = require('querystring');

app.use(bodyParser.json());//use body-parser
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/search', function (req, res) {
    var img1_base64 = req.body.img1;
    var img2_base64 = req.body.img2;
    var rel = req.body.relation;
})

app.post('/insert', function (req, res) {
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var rel = req.body.rel;

    var content = querystring.stringify({
        api_key: 'bxry2NsPLpWdl-zL9SZgqBHqslXxbM1p',
        api_secret: 'XdJtVVbqEg4EzwOofqWRiWl_YiZSV_QT',
        image_base64: img1,
        faceset_token: '4d05c631255dd4bc378586224ef58864'
    });
    var option = {
        uri: 'https://api-cn.faceplusplus.com/facepp/v3/search',
        method: 'POST',
        body: content,
        json: true
    }
    rq(option).then(result => {

    }).catch(err => {
        console.log('face api error: ' + err);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});