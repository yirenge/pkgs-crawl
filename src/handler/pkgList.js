
const myconfig= require('../myconfig');
const fetch= require('../fetch');
const pkgListParser= require('../parser/pkgListParser');
const npmHost = myconfig.npmHost;

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

        fetch(options).then((html)=>{
            var packageList=pkgListParser(html);
            response.setHeader('Access-Control-Allow-Origin','*');
            response.send(packageList);

            response.end('ok');
        }).catch((e)=>{
            console.log("Problem with request:"+e.message);
        });
    }
}

module.exports = getPackagesList;
