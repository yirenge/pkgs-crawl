const cheerio = require('cheerio');
const myconfig= require('../myconfig');
const npmHost = myconfig.npmHost;

function pkgParser(html){
    console.log("[pkgParser]------");
    var $ = cheerio.load(html);
    var pkgInfo = {};

    //pack-ver:package的version(img),返回数据pkg_version = {title:'', src:''}
    var versionEle = $('.pack-ver'), pkg_version = {};
    if(versionEle.length > 0){
        var imgEle = $(versionEle[0]).find('img');
        if(imgEle.length > 0){
            pkg_version.title = $(imgEle[0]).attr('title');
            pkg_version.src = $(imgEle[0]).attr('src');
        }
    }
    pkgInfo.version = pkg_version;

    //pack-repo:package的仓库,返回数据格式pkg_repo={lastup:'', alist:[{href:'', target:'', text:''}]}
    var repoEle = $('.pack-repo'), pkg_repo = {alist:[]};
    if(repoEle.length > 0){
        var lastupEle = $(repoEle[0]).find('.pack-lastup');
        if(lastupEle.length > 0){
            pkg_repo.lastup = $(lastupEle[0]).html().replace(/\/~deploy/g, 'http://'+npmHost+'/~deploy');
        }
        var aEles = $(repoEle[0]).find('a');
        for(var i = 0; i < aEles.length; i++){
            pkg_repo.alist.push({
                href: $(aEles[i]).attr('href'),
                target: $(aEles[i]).attr('target'),
                text: $(aEles[i]).text()
            });
        }
    }
    pkgInfo.repo = pkg_repo;


    //pack-install:package的安装命令, 返回数据pkg_install={sh:'', packSync:''}
    var installEle = $('.pack-install'), pkg_install={};
    if(installEle.length > 0){
        var shEle = $(installEle[0]).find('pre');
        if(shEle.length > 0){
            pkg_install.sh = $(shEle[0]).text();
        }
        var packSyncEle = $(installEle[0]).find('.pack-sync');
        if(packSyncEle.length > 0){
            pkg_install.packSync = $(packSyncEle[0]).html();
        }
    }
    pkgInfo.install = pkg_install;

    //readme
    var readmeEle = $('#readme');
    pkgInfo.readme = readmeEle.html();


    return pkgInfo;

}

module.exports =pkgParser;