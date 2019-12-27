const http = require('http');
const cheerio = require('cheerio');

const myconfig= require('./myconfig');
const npmHost = myconfig.npmHost;
var packageList = {};


/**
 * @param html
 * @return {
 *  name:{
 *      href:'',
 *      description:''
 *  }
 * }
 */
function parsePackageListHtml(html){
    console.log("parsePackageListHtml------");
    var $ = cheerio.load(html);
    // console.log($.html());
    var pkgList = $('.package');

    if(!pkgList){
        return;
    }
    pkgList.map(function(i, el){
        var alist = $(el).find('.package-name');
        var deslist = $(el).find('.package-description');
        if(alist.length > 0){
            var aEle = alist[0];
            var des;
            (deslist.length > 0) && (des = $(deslist[0]).text());
            packageList[$(aEle).text()] = {
                href: $(aEle).attr('href'),
                description: des || '',
            };
        }
    });
    // console.log("-----packageList:",packageList);
}


function getPackagesList(req, response){
    console.log("[getPackagesList]start.");
    const pkgPath = req.query.pkgpath;
    if(!pkgPath){
        response.send('No pkgpath sent!');
        response.end('error');
    }else{
        console.log("[getPackagesList]pkgPath=",pkgPath);
        const options = {
            hostname:npmHost,
            path:pkgPath,
            port:'80',
            method:'get',
            agent:false,
            headers:{
                'content-type':'text/html',
                'Access-Control-Allow-Origin':'*'
            }
        };
        var request = http.request(options, function(res){
            console.log("send get request.");
            var chunks=[];
            res.on('data', function(chunk){
                chunks.push(chunk);
            });
            res.on('end', function(){
                var html = chunks.join("");
                parsePackageListHtml(html);
                response.setHeader('Access-Control-Allow-Origin','*');
                response.send(JSON.stringify(packageList));
    
                response.end('ok');
            });
        });
        request.on('error', function(e){
            console.log("Problem with request:"+e.message);
        });
        request.write('/body');
        request.end();
    }
}

module.exports = getPackagesList;
