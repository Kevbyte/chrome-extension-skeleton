var toolBarModule = require('./modules/ShelfPage/toolBarModule');
var itemShelvesModule = require('./modules/ItemPage/allShelvesModule');
var pcfModule = require('./modules/ItemPage/pcfModule');
var shelfScraper = require('../js/modules/Common/shelfScraper');

var shelf;
var SERVER;
var PAGE;

module.exports.exposeSERVER = function() {
    return SERVER
};

module.exports.exposePAGE = function() {
    return PAGE;
};

module.exports.exposeShelf = function() {
   return shelf;
};


function observeSearchContainer() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function (mutations, observer) {
        shelf = null;
        shelfScraper.getShelf().done(function (result) {
            shelf = result;
            toolBarModule.injectToolbar();
        });
    });

    observer.observe(document.querySelector("#search-container"), {
        subtree: false,
        childList: true
    });
}

chrome.extension.sendMessage({type: "SHOW_PRODUCT_PAGE_ACTION"}, function (response) {
    if (!response.pageAction) {
        return;
    } else {
        SERVER = response.server;
        PAGE = "Product page";

        shelfScraper.getShelf().done(function (result) {
            shelf = result;
            pcfModule.injectPCFLink();
            itemShelvesModule.injectAllShelves();
        });

    }
});


chrome.extension.sendMessage({type: "SHOW_SHELF_PAGE_ACTION"}, function (response) {
    if (!response.pageAction) {
        return;
    } else {
        SERVER = response.server;

        shelfScraper.getShelf().done(function (result) {
            shelf = result;
            toolBarModule.injectToolbar();
        });

        observeSearchContainer();
    }
});

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === "UPDATE_SHELF") {
            SERVER = request.server;

            if (!shelf) {
                shelfScraper.getShelf().done(function (result) {
                    shelf = result;
                    //injectToolbar();
                });
            }
        }
    });

