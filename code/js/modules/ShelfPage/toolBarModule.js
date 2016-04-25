//module for injecting toolbar onto shelving page for Move-to and Reject functionality

import * as content from '../../content';
import * as urlGenerator from '../Common/urlGenerator';
import * as supportUtil from '../Common/supportUtil';
import * as confirmationUtil from '../Common/confirmationUtil';

export function injectToolbar() {
    function createRejectPopupContent() {
        var $tile = $(this).closest(".tile-grid-unit");
        var itemId = $tile.data("item-id");
        //for testing
        var itemId = "16609782"

        $.ajax({
            url: urlGenerator.catalogUrl() + "/" + itemId,
            headers: {"X-Requested-With": "XMLHttpRequest"},
            type: "GET",
            data: {
                itemId: itemId
            }
        }).done(function (result) {
            if (result.shelfCount < 2) {
                $('#rejectPopup').prepend("<span class='warning' style='color:red'>WARNING: This item belongs to only one shelf and would be moved to UNNAV if you continue. We would recommend moving the item to a different shelf.</span><br><br>")
            }
            $('#rejectPopup').find('.js-confirm-reject-btn').removeClass('disabled');
            $('#rejectPopup').find('.js-confirm-reject-btn').data('productId', result.productId)
        });

        var shelf = content.exposeShelf();

        // Load in the rejectPopupContent template so it can be used in the popover
        var template = Handlebars.templates.rejectPopupContent;
        var rejectPopupContent = template({
            "itemId" : itemId,
            "shelfName": shelf.name,
            "shelfId": shelf.id
        });

        return rejectPopupContent;
    }

    function createOverridePopupContent() {
        var $tile = $(this).closest(".tile-grid-unit");
        var itemId = $tile.data("item-id");
        var itemId = "16609782"
        var shelf = content.exposeShelf();

        // Load in the overridePopupContent template so it can be used in the popover
        var template = Handlebars.templates.overridePopupContent;
        var overridePopupContent = template({
            "text": "Please choose a new shelf for item " + itemId + ":",
            "note": "We will submit your recommendation to move this item from this shelf - this will be reviewed within 2 days."
        });

        return overridePopupContent;
    }

    $("#tile-container").addClass("bootstrap");

    $("#search-container .tile-grid-unit").append(
        "<div class='js-tag-toolbar_ tag-toolbar btn-toolbar' role='toolbar'>" +
        "<a tabindex='0' class='js-accept-btn accept-btn btn btn-xs btn-success btn-center_' role='button' data-toggle='popover'><i class='fa fa-share'></i> Move to...</button>" +
        "<a tabindex='1' class='js-reject-btn btn btn-xs btn-danger btn-center_' role='button' data-toggle='popover'><span class='glyphicon glyphicon-thumbs-down'/> Remove</button>" +
        "</div>");

    $('#search-container .js-accept-btn').popover({
        content: createOverridePopupContent,
        html: true,
        placement: "top",
        trigger: "manual",
        title: "Recommend New Shelf for Item"
    }).on("shown.bs.popover", function (e) {
        var $toolbar = $(this).closest(".js-tag-toolbar_");

        $toolbar.find(".js-select-tag_").select2(supportUtil.createSelectOptions()).on("change", function (e) {
            $toolbar.find(".js-tag-path_").text("(" + supportUtil.getItemPath(e.added) + ")");
            $toolbar.find(".js-confirm-accept-btn").removeClass("disabled");
        });
    }).on("hide.bs.popover", function (e) {
        $(this).closest(".js-tag-toolbar_").find(".js-select-tag_").select2("destroy");
    });

    $('#search-container .js-reject-btn').popover({
        content: createRejectPopupContent,
        html: true,
        placement: "top",
        trigger: "manual",
        title: "Recommend Item for Removal"
    });

    var $tiles = $("#search-container .tile-grid-unit");
    var $tileContainer = $("#tile-container");

    $tiles
        .mouseenter(function () {
            if ($tileContainer.find(".popover.in").length === 0) {
                $tiles.removeClass("outline");
                $(this).addClass("outline");
            }
        })
        .mouseleave(function () {
            if ($(this).find(".popover.in").length === 0) {
                $(this).removeClass("outline");
            }
        });

    $("#search-container").on("click", ".js-accept-btn,.js-reject-btn", supportUtil.onTogglePopover);
    $("#search-container").on("click", ".js-confirm-reject-btn", confirmationUtil.onConfirmReject);
    $("#search-container").on("click", ".js-confirm-accept-btn", confirmationUtil.onConfirmAccept);
    $("#search-container").on("click", ".js-cancel-btn", supportUtil.onTogglePopover);
}
