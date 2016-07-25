var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var fs = require('fs');
var algorithmia = require("algorithmia");
var request = require('request');
var zlib = require("zlib");

app.set('port', (process.env.PORT || 5000));
app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

app.get('/download', function (req, res) {
    var query = req.query.file;
    var referer = req.header('Referer');
    if (referer.indexOf("http://ouo.io") > -1) {

    }
    else {
        res.send("OK");
    }
});

app.post('/colorize', function (req, res) {
    getColorizePhotos(req.body.url, function (err, data) {
        res.send(data);
    });
});

function getColorizePhotos(imgUrl, callback) {
    //var url = req.query.url;
    console.log("URL Xử Lý: ", imgUrl);
    request({
        method: "POST",
        uri: "",
        har: {
            "method": "POST",
            "url": "https://api-region-6.algorithmia.com/v1/web/algo/algorithmiahq/ColorizationDemo/0.1.9",
            "httpVersion": "HTTP/1.1",
            "headers": [
                {
                    "name": "Origin",
                    "value": "http://demos.algorithmia.com"
                },
                {
                    "name": "Host",
                    "value": "api-region-6.algorithmia.com"
                },
                {
                    "name": "Accept-Language",
                    "value": "vi,en;q=0.8"
                },
                {
                    "name": "Authorization",
                    "value": "Simple sim6fN4dbIEi+ORCaElcoOteGB51"
                },
                {
                    "name": "Content-Type",
                    "value": "application/json"
                },
                {
                    "name": "Accept",
                    "value": "application/json, text/javascript"
                },
                {
                    "name": "Referer",
                    "value": "http://demos.algorithmia.com/colorize-photos/"
                },
                {
                    "name": "User-Agent",
                    "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
                },
                {
                    "name": "Connection",
                    "value": "keep-alive"
                },
                {
                    "name": "DNT",
                    "value": "1"
                }],
            "queryString": [],
            "cookies": [],
            "postData": {
                "mimeType": "application/json",
                "text": "\"" + imgUrl + "\""
            }
        },
    }, function (err, status, data) {
        if (data) {
            callback(null, data);
            console.log("SUCCESS: ", imgUrl);
        }
        if (err) {
            callback(err, null);
            console.error("FAIL: ", err);
        }
    });

}
app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});
