
const myconfig= require('../myconfig');
const npmHost = myconfig.npmHost;
const fetch= require('../fetch');
const pkgParser= require('../parser/pkgParser');

function getPackageInfo(req, res){
    console.log("req:",req.query);
    const pkgPath = req.query.pkgpath;
    if(!pkgPath){
        res.send('No pkgpath sent!');
        res.end('error');
    }
    else{
        var options = {
            hostname:npmHost,
            port:myconfig.npmPort,
            path:pkgPath,
            method:'get',
            agent:false,
            headers:{
                'content-type':'text/html',
                'Access-Control-Allow-Origin':'*'
            }
        };
        fetch(options).then((html)=>{
            var pkgInfo = pkgParser(html);
            res.setHeader('Access-Control-Allow-Origin','*');
            res.send(pkgInfo);
            res.end();
        }).catch((e)=>{
            console.log("Problem with request:"+e.message);
        });
    }

}



module.exports = getPackageInfo;
