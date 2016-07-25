var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var fs = require('fs');
var algorithmia = require("algorithmia");
var request = require('request');
var zlib = require("zlib");

var url = ["http://ouo.io/I1Mzz", "http://ouo.io/CsuQIS"];

app.set('port', (process.env.PORT || 5000));
app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

app.get('/download', function (req, res) {
    var query = req.query.file;
    var referer = req.header('Referer');

    if (referer.indexOf("ouo.io") > -1) {
        
        if (query === "POKEMON_GO_MOD.APK" || query === "HUONG_DAN.RAR") {

            var file = __dirname + '/upload/' + query;
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        }
    }
    else {

        if (query === "POKEMON_GO_MOD.APK") {
            res.writeHead(302, {
                'Location': url[0]
            });
            res.end();
        }
        if (query === "HUONG_DAN.RAR") {
            res.writeHead(302, {
                'Location': url[1]
            });
            res.end();
        }
    }
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});
