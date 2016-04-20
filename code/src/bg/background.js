/**
 * Default editorial server for tagging and everything.
 *
 * @type {{url: string, env: string}}
 */
const DEFAULT_SERVER = {
    url: "http://editorial.prod.cdqarth.prod.walmart.com",
    env: "PROD"
};

var tabUrl;

function saveServerSettings(settings, callback) {
    chrome.storage.sync.set({server: settings}, callback);
}

function getServerSettings(callback) {
    chrome.storage.sync.get("server", function (items) {
        callback(items.server || DEFAULT_SERVER);
    });
}


chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.type === "SHOW_SHELF_PAGE_ACTION") {
            chrome.pageAction.show(sender.tab.id);

            getServerSettings(function (server) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    sendResponse({server: server, pageAction : tabs[0].url.slice(0,29) === "http://www.walmart.com/browse"});
                });
            });
            return true;
        } else if (request.type === "NOTIFY") {

            chrome.notifications.create("", {
                    type: "basic",
                    title: request.title,
                    message: request.message,
                    iconUrl: "/icons/tag.png"
                },
                function () { /* Error checking goes here */
                });
        } else if (request.type === "SHOW_PRODUCT_PAGE_ACTION") {

            chrome.pageAction.show(sender.tab.id);

            getServerSettings(function (server) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    sendResponse({server: server, pageAction : tabs[0].url.slice(0,25) === "http://www.walmart.com/ip"});
                });
            });
            return true;
        }

    });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.slice(0,29) === "http://www.walmart.com/browse") {
        chrome.pageAction.setIcon({
            path: '../../icons/tag.png',
            tabId: tabId
        });
    } else {
        chrome.pageAction.setIcon({
            path: '../../icons/tag_disabled.png',
            tabId: tabId
        });
    }
});