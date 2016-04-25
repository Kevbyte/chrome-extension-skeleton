//module for helper functions

import * as urlGenerator from '../Common/urlGenerator';

function exposeItemPath(item) {
    var itemPaths = item.relations.parent.expanded;
    var paths = [];
    for (var i = 0; i < itemPaths.length; i++) {
        paths.push(itemPaths[i].name);
    }
    return paths.reverse().join(" > ");
}

function formatResult(item) {
    if (item.loading) return item.text;

    var markup = '<div class="clearfix">' +
        '<div>' + item.name +
        '<span style="color: #cccccc"> (' + exposeItemPath(item) + ')</span>' +
        '</div>';

    return markup;
}

export function getItemPath(item) {
    return exposeItemPath(item);
}

function formatSelection (item) {
    return item.name;
}

export function createSelectOptions() {
    return {
        minimumInputLength: 1,
        placeholder: "Search shelves...",
        ajax: {
            url: urlGenerator.taxonomyUrl(),
            type: "GET",
            headers: {"X-Requested-With": "XMLHttpRequest"},
            dataType: 'json',
            quietMillis: 400,
            data: function (term, page) {
                return {
                    page: page,
                    searchTerm: "(name:" + term + "^4 OR name:" + term + "* OR singular:" + term + "*^3 OR plural:" + term + "*^2)",
                    searchTypes: ["node"]
                };
            },
            results: function (data, page) {
                var more = (page * 25) < data._meta.total;

                return {results: data._items, more: more};
            },
            cache: true
        },
        id: function (item) {
            return item._id;
        },
        dropdownCssClass: "bootstrap",
        formatResult: formatResult,
        formatSelection: formatSelection
    }
}


export function createErrorHandler(title) {
    return function (xhr, status, error) {
        chrome.extension.sendMessage({
            type: "NOTIFY",
            title: title,
            message: "(" + status + ") " + (xhr.responseText || error)
        });
    }
}

export function toggleItemPagePopover() {
    if ($(this).parent().find(".popover.in").length === 0) {
        $(this).popover("show");
    } else {
        $(this).popover("hide");
    }
}

export function onTogglePopover() {
    if ($(this).closest(".popover.in").length === 0) {
        $(this).popover("show");
    } else {
        $(this).closest(".popover.in").popover("hide");
        return false;
    }
}


