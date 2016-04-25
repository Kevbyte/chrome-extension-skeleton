//module for dealing with user tagging confirmations

import * as content from '../../content';
import * as productIDScraper from '../Common/productIDScraper';
import * as urlGenerator from '../Common/urlGenerator';
import * as supportUtil from '../Common/supportUtil';

var SPIN_OPTIONS = {lines: 6, length: 10, width: 8, radius: 10, rotate: 90, color: "#FFB94E", className: "spinner_"};

export function onConfirmReject(e) {
    var $this = $(this);
    var $tile = $(this).closest(".tile-grid-unit");
    var itemId = $tile.data("item-id");
    //for testing
    itemId = "16609782"
    var productId = $(this).data("productId");
    productId = '72XR8X38E3TZ'
    var valueIds = [content.exposeShelf().id];
    var shelfName = content.exposeShelf().name;
    var $popover = $tile.find(".popover.in");
    var target = $popover.find(".popover-content").get(0);


    if (content.exposePAGE() === "Product page") {
        valueIds = [$(this).data("shelf-id")];
        productId = productIDScraper.getProductId();
        //use this for development testing and then delete it for deployment
        productId = '72XR8X38E3TZ'

        $popover = $(this).closest(".js-full-paths").find(".popover.in");
        target = $popover.find(".popover-content").get(0);
    }

    var spinner = new Spinner(SPIN_OPTIONS).spin(target);

    return $.ajax({
        url: urlGenerator.tagUrl() + "/" + productId,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        type: "PUT",
        data: {
            decision: "is_not",
            mode: "append",
            productId: productId,
            itemId: itemId,
            attrId: "shelf",
            valueIds: valueIds
        }
    }).done(function (result) {

        chrome.extension.sendMessage({
            type: "NOTIFY",
            title: "Recommend Item for Removal",
            message: "SUCCESS! Item " + itemId + " (" + productId + ") submitted for removal from shelf " + valueIds[0] + " (" + shelfName + ")."
        });

        if (content.exposePAGE() === "Product page") {
            $($this).closest(".js-remove-shelf-button").find(".js-remove-btn").replaceWith("<i>Removed</i>");
        }

    }).fail(supportUtil.createErrorHandler("Remove Shelf Tag")).always(function () {
        spinner.stop();
        $popover.popover("hide");
    });

    return false;
}

export function onConfirmAdd(e) {
    var url = window.location.pathname;
    var itemId = url.substring(url.lastIndexOf('/') + 1);
    var productId = productIDScraper.getProductId();
    //use this for development testing and then delete it for deployment
    var productId = '72XR8X38E3TZ'
    var data = $(".js-add-shelf-btn").parent().find(".js-select-tag_").select2("data");
    var newValueIds = [data.category_id];
    var newShelfName = data.name;
    var $popover = $(".js-add-shelf-btn").parent().find(".popover.in");
    var target = $(".js-add-shelf-section").get(0);
    var spinner = new Spinner(SPIN_OPTIONS).spin(target);

    $.ajax({
        url: urlGenerator.tagUrl() + "/" + productId,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        type: "PUT",
        data: {
            decision: "is",
            mode: "append",
            productId: productId,
            itemId: itemId,
            attrId: "shelf",
            valueIds: newValueIds
        }
    }).done(function (result) {
        productId = result.productId;
        chrome.extension.sendMessage({
            type: "NOTIFY",
            title: "Add a New Shelf for Item",
            message: "SUCCESS! Shelf " + newValueIds[0] + " (" + newShelfName + ") is now a shelf for " + itemId + " (" + productId + ")."
        });
    }).fail(supportUtil.createErrorHandler("Add New Shelf for Item")).always(function () {
        spinner.stop();
        $popover.popover("hide");
    });

    return false;
}

export function onConfirmAccept(e) {
    var $tile = $(this).closest(".tile-grid-unit");
    var itemId = $tile.data("item-id");
    //for testing:
    itemId = "16609782"

    var productId;
    //use this for development testing and then delete it for deployment
    var productId = '72XR8X38E3TZ'
    var oldValueIds = [content.exposeShelf().id];
    var data = $tile.find(".js-select-tag_").select2("data");
    var newValueIds = [data.category_id];
    var newShelfName = data.name;
    var $popover = $tile.find(".popover.in");
    var target = $popover.find(".popover-content").get(0);
    var spinner = new Spinner(SPIN_OPTIONS).spin(target);

    var dfd1 = $.ajax({
        url: urlGenerator.tagUrl() + "/" + productId,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        type: "PUT",
        data: {
            decision: "is_not",
            mode: "append",
            itemId: itemId,
            attrId: "shelf",
            valueIds: oldValueIds
        }
    });

    var dfd2 = $.ajax({
        url: urlGenerator.tagUrl() + "/" + productId,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        type: "PUT",
        data: {
            decision: "is",
            mode: "append",
            itemId: itemId,
            attrId: "shelf",
            valueIds: newValueIds
        }
    }).done(function (result) {
        productId = result.productId;
    });

    $.when(dfd1, dfd2)
        .done(function () {
            chrome.extension.sendMessage({
                type: "NOTIFY",
                title: "Recommend New Shelf for Item",
                message: "SUCCESS! Item " + itemId + " (" + productId + ") moved to shelf " + newValueIds[0] + " (" + newShelfName + ")."
            });

        }).fail(supportUtil.createErrorHandler("Recommend New Shelf for Item")).always(function () {
        spinner.stop();
        $popover.popover("hide");
    });

    return false;
}

export function onConfirmEdit(e) {
    var url = window.location.pathname;
    var itemId = url.substring(url.lastIndexOf('/') + 1);
    var productId = productIDScraper.getProductId();
    //use this productId for development testing and then delete it for deployment
    var productId = '72XR8X38E3TZ'
    var data = $(".js-edit-shelf-button").find(".js-select-tag_").select2("data");
    var newValueIds = [data.category_id];
    var newShelfName = data.name;
    var $popover = $(".js-edit-shelf-button").find(".popover.in");
    var target = $popover.find(".popover-content").get(0);
    var spinner = new Spinner(SPIN_OPTIONS).spin(target);

    $.ajax({
        url: urlGenerator.tagUrl() + "/" + productId,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        type: "PUT",
        data: {
            decision: "is",
            mode: "append",
            productId: productId,
            itemId: itemId,
            attrId: "shelf",
            valueIds: newValueIds,
            primary: true
        }
    }).done(function (result) {
        productId = result.productId;
        chrome.extension.sendMessage({
            type: "NOTIFY",
            title: "Recommend New Primary Shelf for Item",
            message: "SUCCESS! Shelf " + newValueIds[0] + " (" + newShelfName + ") is now the primary shelf for " + itemId + " (" + productId + ")."
        });
        var paths = [];
        $(".js-full-path span").each(function() {
            var path = $(this).text().split(">");
            if (path[path.length-1].slice(2) === data.name) {
                $(this).closest(".js-full-paths").find(".js-remove-btn").replaceWith("<i>Selected as primary</i>")
            }
        });
        if (data.name) {

        }
    }).fail(supportUtil.createErrorHandler("Recommend New Primary Shelf for Item")).always(function () {
        spinner.stop();
        $popover.popover("hide");
    });

    return false;
}
