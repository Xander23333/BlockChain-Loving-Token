var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rq = require('request-promise');
var querystring = require('querystring');

var http = require('http');
var querystring = require('querystring');

const api_key = 'bxry2NsPLpWdl-zL9SZgqBHqslXxbM1p';
const api_secret = 'XdJtVVbqEg4EzwOofqWRiWl_YiZSV_QT';
const faceset_token = "4d05c631255dd4bc378586224ef58864";

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
            api_key: api_key,
            api_secret: api_secret,
            image_base64: img1_base64,
            faceset_token: faceset_token
        }
    };
    rq(options).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    //result
    var ID = result.result[0].user_ID;
    var name1 = ID2Name(ID);
});

function ID2Name(user_ID){
    var name1='';
    for(var i=0;i<user_ID.length;i++){
        name1+=String.fromCharCode( (user_ID.charCodeAt(i) - 97 + 15) % 26 + 97 );
    }
}

app.post('/insert', function (req, res) {
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var name1 = req.body.name1;
    var name2 = req.body.name2;
    var rel = req.body.rel;

    // var content = {
    //     api_key: api_key,
    //     api_secret: api_secret,
    //     image_base64: img1,
    //     faceset_token: faceset_token
    // }
    // var option_search = {
    //     uri: 'https://api-cn.faceplusplus.com/facepp/v3/search',
    //     method: 'POST',
    //     form: content
    // }
    // rq(option_search).then(result => {//faceset里面有人
    //     result = JSON.parse(result);
    //     console.log(result);
    //     if (result.reslts[0] < 70) {
    //         addIntoSet(img1, name1).then(id => {
    //             user1 = id;
    //         });
    //     }
    //     else {
    //         user1 = result.results[0].user_id;
    //     }

    // }).catch(err => {
    //     console.log('face api error: ' + err);
    //     Promise.all([addIntoSet(img1, name1), addIntoSet(img2, name2)]).then(resultList => {//分别获取到两个人user_id且都添加到set内
    //         console.log(resultList);
    //         res.end(resultList[0]);
    //         
    //     });
    // });

    Promise.all([searchInSet(img1), searchInSet(img2)]).then(resultList => {
        console.log(resultList);
        //TODO:所有id都拿到了
    }).catch(err => {
        console.log('face api error: ' + err);
        Promise.all([addIntoSet(img1, name1), addIntoSet(img2, name2)]).then(resultList => {//分别获取到两个人user_id且都添加到set内
            console.log(resultList);
            res.end(resultList[0]);
            //TODO:to chain
        });
    })


});

app.get('/clearSet', function (req, res) {
    // /*------获取set列表------*/
    // var content = {
    //     api_key: api_key,
    //     api_secret: api_secret,
    //     faceset_token: faceset_token
    // }
    // var option_get = {
    //     uri: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/getdetail',
    //     method: 'POST',
    //     form: content
    // }
    // rq(option_get).then(result => {
    //     result = JSON.parse(result);
    //     for (var i = 0; i < result.face_tokens.length; i++) {

    //     }
    // });
    var content = {
        api_key: api_key,
        api_secret: api_secret,
        faceset_token: faceset_token,
        face_tokens: 'RemoveAllFaceTokens'
    }
    var option_del = {
        uri: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/removeface',
        method: 'POST',
        form: content
    }
    rq(option_del).then(result => {
        console.log(result);
    })
});

//在set中查找base64图片，没有则添加
function searchInSet(imgbase64) {
    return new Promise(function (resolve, reject) {
        var content = {
            api_key: api_key,
            api_secret: api_secret,
            image_base64: imgbase64,
            faceset_token: faceset_token
        }
        var option_search = {
            uri: 'https://api-cn.faceplusplus.com/facepp/v3/search',
            method: 'POST',
            form: content
        }
        rq(option_search).then(result => {
            result = JSON.parse(result);
            console.log('search result:' + result.toString());
            if (result.results[0].confidence < 70) {//置信度最高的也不可信
                console.log(name1 + 'conf:' + (result.results[0].confidence));
                addIntoSet(img1, name1).then(id => {
                    resolve(id);
                });
            }
            else {
                resolve(result.results[0].user_id);
            }
        }).catch(err => {
            reject(err);
        });
    })
}

/*没注册在set里面的先添加到set */
function addIntoSet(imgbase64, name) {
    return new Promise(function (resolve, reject) {
        var content = {
            api_key: api_key,
            api_secret: api_secret,
            image_base64: imgbase64,
        }
        var option_detect = {
            uri: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
            method: 'POST',
            form: content
        }
        rq(option_detect).then(result => {//检测人脸
            result = JSON.parse(result);
            var token = result.faces[0].face_token;//只有一个人
            var user_id = getUserID(name);
            console.log(user_id);
            var content = {
                api_key: api_key,
                api_secret: api_secret,
                face_token: token,
                user_id: user_id
            }
            var option_set = {
                uri: 'https://api-cn.faceplusplus.com/facepp/v3/face/setuserid',
                method: 'POST',
                form: content
            }
            rq(option_set).then(result => {//设置了user_id
                result = JSON.parse(result);
                var content = {
                    api_key: api_key,
                    api_secret: api_secret,
                    faceset_token: faceset_token,
                    face_tokens: token
                }
                var option_add = {
                    uri: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/addface',
                    method: 'POST',
                    form: content
                }
                rq(option_add).then(result => {//添加到faceset
                    resolve(user_id);
                });
            });
        });
    })
}

function getUserID(name) {
    for (var i = 0; i < name.length; i++) {
        var at = name.charCodeAt(i);
        at = (at - 97 + 11) % 26;
        name[i] = String.fromCharCode(at + 97);//a~z only
        name.splice(i, 1, String.fromCharCode(at + 97));
    }
    console.log(name);
    return name;
}


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
