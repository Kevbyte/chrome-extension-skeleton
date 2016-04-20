module.exports.formatResult = function(item) {
    if (item.loading) return item.text;

    var markup = '<div class="clearfix">' +
        '<div>' + item.name +
        '<span style="color: #cccccc"> (' + getItemPath(item) + ')</span>' +
        '</div>';

    return markup;
};

module.exports.getItemPath = function(item) {
    var itemPaths = item.relations.parent.expanded;
    var paths = [];
    for (var i = 0; i < itemPaths.length; i++) {
        paths.push(itemPaths[i].name);
    }
    return paths.reverse().join(" > ");
};

module.exports.formatSelection = function(item) {
    return item.name;
};

module.exports.createSelectOptions = function() {
    return {
        minimumInputLength: 1,
        placeholder: "Search shelves...",
        ajax: {
            url: taxonomyUrl(),
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
};


module.exports.createErrorHandler = function(title) {
    return function (xhr, status, error) {
        chrome.extension.sendMessage({
            type: "NOTIFY",
            title: title,
            message: "(" + status + ") " + (xhr.responseText || error)
        });
    }
};

module.exports.toggleItemPagePopover = function() {
    if ($(this).parent().find(".popover.in").length === 0) {
        $(this).popover("show");
    } else {
        $(this).popover("hide");
    }
};

module.exports.onTogglePopover = function() {
    if ($(this).closest(".popover.in").length === 0) {
        $(this).popover("show");
    } else {
        $(this).closest(".popover.in").popover("hide");
        return false;
    }
};


