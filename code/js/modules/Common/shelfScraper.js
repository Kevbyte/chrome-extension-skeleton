//var urlGenerator = require('../Common/urlGenerator');

import * as urlGenerator from '../Common/urlGenerator';


function getShelfByMidas () {
    var metadata;

    var text = $("#search-container").find("script").last().text();

    var index = text.indexOf("window._WML.MIDAS_CONTEXT =");
    if (index > -1) {
        var scriptText = text.substring(index + "window._WML.MIDAS_CONTEXT = ".length, 1 + text.lastIndexOf("}"));
        var metadata = JSON.parse(scriptText);
    }

    if (!metadata) return null;

    var idPath = metadata.categoryPathId;
    var namePath = metadata.categoryPathName;

    return {
        id: idPath.substr(1 + idPath.lastIndexOf(":")),
        name: namePath.substr(1 + namePath.lastIndexOf("/"))
    };
}

export function getShelf() {
    var shelf = getShelfByMidas();

    if (!shelf) {
        var metadata = JSON.parse($("#tb-djs-wml-base").text());
        var categoryPathId = metadata.adContextJSON.categoryPathId;
        var categoryPathName = metadata.adContextJSON.categoryPathName;

        shelf = {
            id: categoryPathId.substr(1 + categoryPathId.lastIndexOf(":")),
            name: categoryPathName.substr(1 + categoryPathName.lastIndexOf("/"))
        };
    }

    var deferred = $.Deferred();
    var filter = {
        category_id: shelf.id
    };

    $.ajax({
        url: urlGenerator.taxonomyUrl(),
        type: "GET",
        headers: {"X-Requested-With": "XMLHttpRequest"},
        data: {all: true, filter: JSON.stringify(filter)}
    }).done(function (result) {
        var node = result._items[0];

        if (node && node.properties.tango.nodeType === "BROWSE_SHELF") {
            deferred.resolve(shelf);
        } else {
            deferred.reject();
        }
    }).fail(function () {
        deferred.reject();
    });

    return deferred;
}
