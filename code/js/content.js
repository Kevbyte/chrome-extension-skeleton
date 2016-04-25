//var toolBarModule = require('./modules/ShelfPage/toolBarModule');
//var itemShelvesModule = require('./modules/ItemPage/allShelvesModule');
//var pcfModule = require('./modules/ItemPage/pcfModule');
//var shelfScraper = require('../js/modules/Common/shelfScraper');

import { getShelf } from '../js/modules/Common/shelfScraper';
import * as toolBarModule from './modules/ShelfPage/toolBarModule';
import * as itemShelvesModule from './modules/ItemPage/allShelvesModule';
import * as pcfModule from './modules/ItemPage/pcfModule';


var shelf;
var SERVER;
var PAGE;

export function exposeSERVER() {
    return SERVER
};

export function exposePAGE() {
    return PAGE;
};

export function exposeShelf() {
   return shelf;
};


function observeSearchContainer() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function (mutations, observer) {
        shelf = null;
        getShelf().done(function (result) {
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

        getShelf().done(function (result) {
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

        getShelf().done(function (result) {
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
                getShelf().done(function (result) {
                    shelf = result;
                    //injectToolbar();
                });
            }
        }
    });

