
var content = require('../../content');

var SERVER = content.getSERVER();

module.exports.tagUrl = function() {
    if (SERVER) {
        return SERVER.url + "/tagging/producttags";
    }
};

module.exports.taxonomyUrl = function() {
    if (SERVER) {
        return SERVER.url + "/tagging/taxonomy/nodes";
    }
};

module.exports.catalogUrl = function() {
    return SERVER.url + "/tagging/shelfCount";
};

module.exports.allShelvesUrl = function() {
    return SERVER.url + "/qarth/catalog/products";
};

