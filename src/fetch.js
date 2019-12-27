const http = require('http');

function fetch(options) {

    var buPromise = new Promise(function (resolve, reject) {
        var req = http.request(options, function (res) {
            console.log("[fetch].res on.");

            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                console.log("[fetch].res end.");
                var html = chunks.join("");
                resolve(html);
            });

        });
        req.on('error', function (e) {
            console.log("[fetch]Problem with request:" + e.message);
            reject(e);
        });
        req.end();
    });

    var timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(reject, options.timeout || 3000, {message:'[fetch] timeout!'});
    });

    return Promise.race([buPromise, timeoutPromise]).then(function (value) {
        return value;
    });
}

module.exports = fetch;