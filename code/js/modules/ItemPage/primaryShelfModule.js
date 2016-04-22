// module for allowing users to view and edit primary shelf on item page

//var $ = require('../libs/jquery');
var productIDScraper = require('../Common/productIDScraper');
var supportUtil = require('../Common/supportUtil');
var confirmationUtil = require('../Common/confirmationUtil');


module.exports.injectPrimaryShelfEditor = function(options) {
    var url = window.location.pathname;
    var itemId = url.substring(url.lastIndexOf('/') + 1);

    // Load in the overridePopupContent template so it can be used in the popover
    var template = Handlebars.templates.overridePopupContent;
    var overridePopupContent = template({
        "text": "Please choose a new primary shelf for item " + itemId + "(" + productIDScraper.getProductId() + "):",
        "note": "We will submit your recommendation to change the primary shelf of this item - this will be reviewed within 2 days."
    });

    if (options && options.noShelf) {
        $(".js-product-page .breadcrumb-list nav").append(
            "<li class='breadcrumb'>" +
            "<span style='color:grey'><i>Suggest a Primary Shelf</i></span>" +
            "</li>"
        ).append(
            "<div class='js-edit-shelf-button bootstrap btn-toolbar' role='toolbar' style='display:inline-block;margin-left:10px'>" +
            "<a tabindex='1' class='js-edit-btn btn btn-xs btn-warning btn-center_' role='button' data-toggle='popover'><span class='glyphicon glyphicon-pencil' style='font-size: 10px'/> Primary shelf</a>" +
            "</div>");
    } else {
        $(".js-full-paths-primary").append(
            "<div class='js-edit-shelf-button bootstrap btn-toolbar' role='toolbar' style='position:absolute;right:15px;display:inline-block;margin-left:10px'>" +
            "<a tabindex='1' class='js-edit-btn btn btn-xs btn-warning btn-center_' role='button' data-toggle='popover'><span class='glyphicon glyphicon-pencil' style='font-size: 10px'/> Primary shelf</a>" +
            "</div>" +
            "<hr style='margin-top:0;margin-bottom:20px'>");
    }

    var selector = $(".js-edit-shelf-button");

    $('.js-edit-btn').popover({
        content: overridePopupContent,
        html: true,
        placement: "right",
        trigger: "manual",
        title: "Recommend New Primary Shelf for Item"
    }).on("shown.bs.popover", function (e) {

        $(selector).find(".js-select-tag_").select2(supportUtil.createSelectOptions()).on("change", function (e) {
            $(selector).find(".js-tag-path_").text("(" + supportUtil.getItemPath(e.added) + ")");
            $(selector).find(".js-confirm-accept-btn").removeClass("disabled");
        });

        $(selector).off("click", ".js-confirm-accept-btn").on("click", ".js-confirm-accept-btn", confirmationUtil.onConfirmEdit);
        $(selector).off("click", ".js-cancel-btn").on("click", ".js-cancel-btn", supportUtil.onTogglePopover);

    }).on("hide.bs.popover", function (e) {
        $(selector).find(".js-select-tag_").select2("destroy");
    });

    $(selector).on("click", ".js-edit-btn", supportUtil.toggleItemPagePopover);
};
