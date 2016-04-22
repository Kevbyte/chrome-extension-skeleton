// module for allowing users to click on PCF button to link to item's PCF page

var productIDScraper = require('../Common/productIDScraper');
var urlGenerator = require('../Common/urlGenerator');
var supportUtil = require('../Common/supportUtil');
var confirmationUtil = require('../Common/confirmationUtil');
var content = require('../../content');

module.exports.injectPCFLink = function() {
    var productId = productIDScraper.getProductId();
    $(".js-product-page .js-product-primary .product-subhead").append(
        "<div class='btn-toolbar bootstrap' role='toolbar'>" +
        "<button role='button' class='js-PCF-button btn btn-xs btn-success cell-btn'>Product Details (PCF)</button>" +
        "</div>"
    );
    //dynamically adjust the link's server.url into the PCF button
    $('.js-PCF-button').off().on('click', function () {
        window.open(content.exposeSERVER().url + "/pcf_product_details/product/canonical?product_id=" + productId, "_blank");
    })
};
