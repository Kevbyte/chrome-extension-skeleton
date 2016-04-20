// module for allowing users to view and edit shelves on item page

//var $ = require('../libs/jquery');

module.exports.getProductId = function() {
    //scrape productId from walmart.com product page
    var text = $(".js-product-page").next("script").text();
    var index = text.indexOf('define("product/data",');
    var text2 = text.substring(index + 'define("product/data",'.length);
    var indexEnd = text2.indexOf("define");
    var text3 = text2.substring(0, indexEnd)
    var newIndexEnd = text3.lastIndexOf("}");

    if (index > -1 && indexEnd > -1) {
        var scriptText = text3.substring(0, newIndexEnd+1);
        var metadata = JSON.parse(scriptText);
        var productId = metadata.productId;
        return productId;
    } else {
        return undefined;
    }
};
