var express = require('express');
var pkgListRequestHandler = require('./src/handler/pkgList');
var pkgInfoRequestHandler = require('./src/handler/pkg');

var app = express();

app.get('/getPackageList', pkgListRequestHandler);
app.get('/getPackageInfo', pkgInfoRequestHandler);

app.listen(3000, function(){
    console.log("App listensing on port 3000!");
});
