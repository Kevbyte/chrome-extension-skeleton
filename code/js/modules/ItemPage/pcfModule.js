// module for allowing users to click on PCF button to link to item's PCF page

import * as content from '../../content';
import * as productIDScraper from '../Common/productIDScraper';
import * as supportUtil from '../Common/supportUtil';
import * as confirmationUtil from '../Common/confirmationUtil';



export function injectPCFLink() {
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
}
