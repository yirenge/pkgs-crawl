var express = require('express');
var pkgListRequestHandler = require('./src/pkgList');
var pkgInfoRequestHandler = require('./src/pkg');

var app = express();

app.get('/getPackageList', pkgListRequestHandler);
app.get('/getPackageInfo', pkgInfoRequestHandler);

app.listen(3000, function(){
    console.log("App listensing on port 3000!");
});
