const cheerio = require('cheerio');


/**
 * @param html
 * @return {
    *  name:{
    *      href:'',
    *      description:''
    *  }
    * }
 */
function pkgListParser(html) {
    var packageList = {};
    console.log("[pkgListParser]------");
    var $ = cheerio.load(html);
    // console.log($.html());
    var pkgList = $('.package');

    if (!pkgList) {
        return;
    }
    pkgList.map(function (i, el) {
        var alist = $(el).find('.package-name');
        var deslist = $(el).find('.package-description');
        if (alist.length > 0) {
            var aEle = alist[0];
            var des;
            (deslist.length > 0) && (des = $(deslist[0]).text());
            packageList[$(aEle).text()] = {
                href: $(aEle).attr('href'),
                description: des || '',
            };
        }
    });
    return packageList;
}

module.exports = pkgListParser;