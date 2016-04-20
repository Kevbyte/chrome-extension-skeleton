// module for allowing users to view and edit shelves on item page

//var $ = require('../libs/jquery');
var productIDScraper = require('../Common/productIDScraper');
var primaryShelfModule = require('../ItemPage/primaryShelfModule');
var urlGenerator = require('../Common/urlGenerator');
var supportUtil = require('../Common/supportUtil');


module.exports.injectAllShelves = function() {
  var productId = productIDScraper.getProductId();
    //use this productId for development testing and then delete it for deployment
    //var productId = '72XR8X38E3TZ';
    var url = window.location.pathname;
    var itemId = url.substring(url.lastIndexOf('/') + 1);

    function allShelvesPopupContent() {

        return "<div class='js-all-shelves-popup' style='width: 500px; height: auto;'>" +
            "This item, " + itemId + " (" + productId + "), exists on these shelves:" +
            "<div class='js-all-shelves-container' style='margin-top:30px'></div>" +
            "<div class='js-yes-no-toolbar btn-toolbar' role='toolbar' style='text-align: center; margin-bottom:10px'>" +
            "<button class='js-add-shelf-btn dialog-btn_ btn btn-sm btn-success' type='button'><span class='glyphicon glyphicon-plus-sign'></span> Add shelf</button>" +
            "<button class='js-close-btn dialog-btn_ btn btn-sm btn-default' type='button'>Close</button>" +
            "</div>" +
            "</div>";
    }

    $(".js-product-page .breadcrumb-list nav").append(
            "<div class='js-all-shelves-toolbar bootstrap btn-toolbar' role='toolbar' style='display:inline-block;margin-left:10px'>" +
            "<a tabindex='1' class='js-all-shelves-btn btn btn-xs btn-warning btn-center_ disabled' role='button' data-toggle='popover'><span class='glyphicon glyphicon-th-list' style='font-size: 10px'/> All shelves</a>" +
            "</div>");

    var selector = $('.js-product-page .js-all-shelves-btn');
    var data;

    $.ajax({
        url: urlGenerator.allShelvesUrl(),
        headers: {"X-Requested-With": "XMLHttpRequest"},
        type: "GET",
        data: {
            searchTerm: productId,
            sourceId: null,
            tenantId: "all"
        }
    }).done(function (result) {
        data = result.docs[0];
        $(selector).removeClass("disabled");
    }).fail(supportUtil.createErrorHandler("Retrieve All Shelves for Product")).always(function () {
    });

    $(selector).popover({
        content: allShelvesPopupContent,
        html: true,
        placement: "bottom",
        trigger: "manual",
        title: "All shelves"
    }).on("shown.bs.popover", function (e) {

        if (data) {
            var primaryShelfPathId = data.product_attributes.primary_shelf.values[0].path_id;
            var primaryShelfPath = data.product_attributes.primary_shelf.values[0].path_str;
            var fusedPrimaryShelfPath = JSON.parse(primaryShelfPath)[0] === "Home Page" ? JSON.parse(primaryShelfPath).slice(1).join("  >  ") : JSON.parse(primaryShelfPath).join("  >  ");
            $('.js-all-shelves-container').append(
                "<div class='js-full-paths-primary' data-shelf-id='" + primaryShelfPathId + "' style='margin-top:10px'>" +
                    "<li class='js-full-path-primary breadcrumb' style='line-height: 0.5'><span itemprop='name'>" + fusedPrimaryShelfPath + "</span></li>" +
                "</div>"
            );
            if ($(".js-product-page .breadcrumb-list nav").children().length === 0) {
                primaryShelfModule.injectPrimaryShelfEditor({noShelf: true});
            } else {
               primaryShelfModule.injectPrimaryShelfEditor();
            }
            data.product_attributes.all_shelves.values.forEach(function (path) {
                if (path.path_id !== primaryShelfPathId) {
                    $('.js-all-shelves-container').append(
                        "<div class='js-full-paths' style='margin-top:10px'></div>"
                    );

                    var breadcrumbs = JSON.parse(path.path_str)[0] === "Home Page" ? JSON.parse(path.path_str).slice(1) : JSON.parse(path.path_str);
                    var fusedBreadcrumbs = breadcrumbs.join("  >  ");

                    $(".js-full-paths").last().append(
                        "<li class='js-full-path breadcrumb' style='line-height: 0.5'><span itemprop='name'>" + fusedBreadcrumbs + "</span></li>"
                    );

                    $(".js-full-paths").last().append(
                        "<div class='js-remove-shelf-button bootstrap btn-toolbar' style='display:inline-block;position:absolute;right:15px;'>" +
                        "<a tabindex='1' class='js-remove-btn btn btn-xs btn-danger btn-center_' role='button' data-shelf-id='" + path.id + "' data-toggle='popover'><span class='glyphicon glyphicon-thumbs-down' style='font-size:10px; margin-top: 2px'/> Remove</a>" +
                        "</div>"
                    );

                    function rejectPopupContent() {
                        var shelf = $(this).closest(".js-full-paths").find(".js-full-path").find("span").text();

                        return "<div id='rejectPopup' style='width: 300px; height: 200px;'>" +
                            "Are you sure item " + productId + " does not belong on shelf <strong>" + shelf + "</strong>?" +
                            "<div class='js-yes-no-reject-toolbar yes-no-toolbar_ btn-toolbar' role='toolbar' styl='text-align:center'>" +
                            "<button class='js-confirm-reject-btn dialog-btn_ btn btn-sm btn-primary' type='button' data-shelf-id='" + path.id + "'>OK</button>" +
                            "<button class='js-cancel-btn dialog-btn_ btn btn-sm btn-default' type='button'>Cancel</button>" +
                            "</div>" +
                            "</div>";
                    }

                    var dataSelector = "*[data-shelf-id=" + path.id + "]";

                    $(dataSelector).popover({
                        content: rejectPopupContent,
                        html: true,
                        placement: "right",
                        trigger: "manual",
                        title: "Recommend Item for Removal"
                    }).on("shown.bs.popover", function (e) {

                        (function (ds) {
                            $(ds).parent().find(".js-yes-no-reject-toolbar").off("click", ".js-confirm-reject-btn").on("click", ".js-confirm-reject-btn", onConfirmReject);
                            $(ds).parent().find(".js-yes-no-reject-toolbar").off("click", ".js-cancel-btn").on("click", ".js-cancel-btn", onTogglePopover);
                        })(dataSelector)

                    }).on("hide.bs.popover", function (e) {
                    });

                    (function (ds) {
                        $(ds).on("click", supportUtil.toggleItemPagePopover)
                    })(dataSelector)
                }
            })
        }

        $(".js-all-shelves-popup").find(".js-close-btn").off().on("click", supportUtil.onTogglePopover);

        // Code for Add shelf button:
        function addShelfPopupContent() {

            return "<div class='js-add-shelf-section' style='width: 400px; height: 220px;'>" +
                 "Please choose a new primary shelf for item \"" + itemId + "\"" +
                 "<div style='padding: 6px 0'>" +
                 "<input class='js-select-tag_ select-tag_' style='width:400px'>" +
                 "<div class='js-tag-path_ text-muted' style='padding-top: 10px;'/>" +
                 "<div class='note_ small text-muted'>We will submit your recommendation to change the primary shelf of this item - this will be reviewed within 2 days.</div>" +
                 "<div class='yes-no-toolbar_ btn-toolbar' role='toolbar'>" +
                 "<button class='js-confirm-accept-btn dialog-btn_ btn btn-sm btn-primary disabled' type='button'>OK</button>" +
                 "<button class='js-cancel-btn dialog-btn_ btn btn-sm btn-default' type='button'>Cancel</button>" +
                 "</div>" +
                 "</div>" +
                 "</div>";
            }

        var selector2 = $(".js-add-shelf-btn");

        $(selector2).popover({
            content: addShelfPopupContent,
            html: true,
            placement: "bottom",
            trigger: "manual",
            title: "Add a Shelf for this Item"
        }).on("shown.bs.popover", function (e) {

            $(selector2).parent().find(".js-select-tag_").select2(supportUtil.createSelectOptions()).on("change", function (e) {
                $(selector2).parent().find(".js-tag-path_").text("(" + supportUtil.getItemPath(e.added) + ")");
                $(selector2).parent().find(".js-confirm-accept-btn").removeClass("disabled");
            });

            $(selector2).parent().off("click", ".js-confirm-accept-btn").on("click", ".js-confirm-accept-btn", onConfirmAdd);
            $(selector2).parent().off("click", ".js-cancel-btn").on("click", ".js-cancel-btn", supportUtil.onTogglePopover);

        }).on("hide.bs.popover", function (e) {
            $(selector2).find(".js-select-tag_").select2("destroy");
        });

        $(selector2).on("click", supportUtil.toggleItemPagePopover)

    }).on("hide.bs.popover", function (e) {
        $(".js-all-shelves-popup").find(".js-select-tag_").select2("destroy");
    });

    $(selector).on("click", supportUtil.toggleItemPagePopover);

};
