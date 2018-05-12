var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var http = require('http');
var querystring = require('querystring');
  
var content = querystring.stringify(post_data);

var options = {    
  hostname: 'api-cn.faceplusplus.com',    
  port: 443,    
  path: '/facepp/v3/search',    
  method: 'POST',    
  headers: {    
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'    
  }    
}; 

app.use(bodyParser.json());//use body-parser
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/search', function (req, res) {
  var img1_base64 = req.body.img1;
  // post=api_key+api_secret+image_base64+face_set
  var post_data = {    
    api_key:'	bxry2NsPLpWdl-zL9SZgqBHqslXxbM1p',
    api_secret:'XdJtVVbqEg4EzwOofqWRiWl_YiZSV_QT',
    image_base64=img1_base64,
    faceset_token:"4d05c631255dd4bc378586224ef58864"
  };
  //post!
  var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    //JSON.parse(chunk)  
    });
  });  
  req.on('error', function (e) {    
      console.log('problem with request: ' + e.message);    
  });
  // write data to request body    
  req.write(content);
  req.end();
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});