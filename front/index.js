var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rq = require('request-promise');
var querystring = require('querystring');

var http = require('http');
var querystring = require('querystring');




app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/search', function (req, res) {
    var img1_base64 = req.body.img1;
    // post=api_key+api_secret+image_base64+face_set
    var post_data = {

    };
    // var content = querystring.stringify(post_data);
    // //post!
    // var req = http.request(options, function (res) {
    //     console.log('STATUS: ' + res.statusCode);
    //     console.log('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     res.on('data', function (chunk) {
    //         console.log('BODY: ' + chunk);
    //         //JSON.parse(chunk)  
    //     });
    // });
    // req.on('error', function (e) {
    //     console.log('problem with request: ' + e.message);
    // });
    // // write data to request body    
    // req.write(content);
    // req.end();


    var options = {
        uri: 'https://api-cn.faceplusplus.com/facepp/v3/search',
        method: 'POST',
        form: {
            api_key: 'bxry2NsPLpWdl-zL9SZgqBHqslXxbM1p',
            api_secret: 'XdJtVVbqEg4EzwOofqWRiWl_YiZSV_QT',
            image_base64: img1_base64,
            faceset_token: "4d05c631255dd4bc378586224ef58864"
        }
    };
    rq(options).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(result);
    })

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
        form: content
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